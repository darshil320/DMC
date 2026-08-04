"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { DMC } from "@/lib/dmc-config";
import { analytics } from "@/lib/analytics";
import {
  BUDGET_RANGES,
  CALL_WINDOWS,
  PROJECT_TYPES,
  TIER_TO_PROJECT_TYPE,
  type EnquiryInput,
  type EnquiryResponse,
} from "@/lib/enquiry";

/**
 * The one enquiry form on the site.
 *
 * Lives here rather than inside the contact page so a visitor can enquire from
 * wherever they already are — a service page, a guide, a pricing tier — instead
 * of being sent off to `/contact` and asked to restate what they just clicked.
 * `source` records which surface produced the lead.
 *
 * Two tones: `dark` for the emerald panel on /contact, `light` for the page
 * background everywhere else.
 */

export type EnquiryFormTone = "dark" | "light";

type EnquiryFormProps = {
  source: string;
  defaultProjectType?: (typeof PROJECT_TYPES)[number];
  /** Read `?tier=` from the URL and preselect from it. Only /contact needs this. */
  readTierFromUrl?: boolean;
  tone?: EnquiryFormTone;
  /** Marks fields for the GSAP intro on /contact. Ignored elsewhere. */
  fieldAttribute?: boolean;
};

type FormState = Required<Omit<EnquiryInput, "source">>;

const TONES = {
  dark: {
    label: "text-white/62",
    input: "text-white placeholder:text-white/28 focus:text-emerald-100",
    rule: "border-white/28",
    option: "[&>option]:bg-emerald-950",
    toggle: "text-white/62 hover:text-[#f2e4d0]",
    submit:
      "border border-[#f2e4d0] bg-[#f2e4d0] text-[#123f36] hover:bg-white",
    secondary: "border border-white/30 text-white hover:border-[#f2e4d0] hover:text-[#f2e4d0]",
    trust: "text-white/62",
    error: "border-[#ffb4a2]/50 bg-[#ffb4a2]/10 text-[#ffd7cc]",
    fieldError: "text-[#ffb4a2]",
    chip: "border border-white/25 text-white/70 hover:border-[#f2e4d0] hover:text-[#f2e4d0]",
    chipActive: "border border-[#f2e4d0] bg-[#f2e4d0] text-[#123f36]",
    successBox: "border border-[#f2e4d0]/40 bg-white/5",
    successTitle: "text-[#f2e4d0]",
    successBody: "text-white/80",
  },
  light: {
    label: "text-text-muted",
    input: "text-text-primary placeholder:text-text-muted/60 focus:text-text-primary",
    rule: "border-border-harsh/40",
    option: "[&>option]:bg-bg-card",
    toggle: "text-text-muted hover:text-accent",
    submit: "border border-accent bg-accent text-white hover:bg-transparent hover:text-accent",
    secondary: "border border-border-harsh text-text-primary hover:border-accent hover:text-accent",
    trust: "text-text-muted",
    error: "border-accent/50 bg-accent/5 text-text-primary",
    fieldError: "text-accent",
    chip: "border border-border-harsh text-text-secondary hover:border-accent hover:text-accent",
    chipActive: "border border-accent bg-accent text-white",
    successBox: "border border-border-harsh bg-bg-card",
    successTitle: "text-text-primary",
    successBody: "text-text-secondary",
  },
} as const;

function composeWhatsappMessage(form: FormState) {
  return [
    "Hi DMC, I want to start a project.",
    "",
    `Name: ${form.name || "-"}`,
    `Email: ${form.email || "-"}`,
    `Business: ${form.company || "-"}`,
    `Project type: ${form.projectType || "-"}`,
    `Budget range: ${form.budgetRange || "-"}`,
    `Best time to call: ${form.callWindow || "-"}`,
    "",
    "Project details:",
    form.message || "-",
  ].join("\n");
}

export function EnquiryForm({
  source,
  defaultProjectType = "Not sure yet",
  readTierFromUrl = false,
  tone = "light",
  fieldAttribute = false,
}: EnquiryFormProps) {
  const t = TONES[tone];
  const initialState: FormState = {
    name: "",
    email: "",
    company: "",
    projectType: defaultProjectType,
    budgetRange: "Not sure yet",
    callWindow: "Anytime",
    message: "",
    tier: "",
    website: "",
  };

  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showOptional, setShowOptional] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  // Carry the pricing tier the visitor clicked through to the form.
  useEffect(() => {
    if (!readTierFromUrl) return;

    const tier = new URLSearchParams(window.location.search).get("tier");
    if (!tier) return;

    const projectType = TIER_TO_PROJECT_TYPE[tier];
    // Deliberately in an effect rather than lazy initial state: these pages are
    // statically generated, so reading the query string during render would
    // produce a hydration mismatch on every tier-linked visit.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((current) => ({ ...current, tier, ...(projectType ? { projectType } : {}) }));
  }, [readTierFromUrl]);

  const fieldProps = fieldAttribute ? { "data-contact-field": true } : {};
  const whatsappHref = `${DMC.whatsappLink}?text=${encodeURIComponent(composeWhatsappMessage(form))}`;
  const mailtoHref = `mailto:${DMC.email}?subject=${encodeURIComponent(
    `New project enquiry from ${form.name || "DMC website"}`
  )}&body=${encodeURIComponent(composeWhatsappMessage(form))}`;

  const updateField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = event.target;

      if (!hasStartedTyping) {
        setHasStartedTyping(true);
        analytics.enquiryFormStart(source);
      }

      setForm((current) => ({ ...current, [field]: value }));
      setFieldErrors((current) => {
        if (!current[field]) return current;
        const { [field]: _removed, ...rest } = current;
        return rest;
      });
    };

  /**
   * Posts through `/api/enquiry`, never straight to the storage webhook. The
   * server confirms the enquiry was stored before this claims success — a form
   * that always says "sent" cannot tell you when leads stop arriving.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });

      const result: EnquiryResponse = await response.json().catch(() => ({
        success: false,
        error: "We could not read the response from our server.",
      }));

      if (!response.ok || !result.success) {
        setFieldErrors(result.fieldErrors ?? {});
        setFormError(
          result.error ??
            "Something went wrong on our side. Please WhatsApp or email us instead — we'll reply within 24 hours."
        );
        analytics.enquirySubmitFailure(response.status, source);
        return;
      }

      analytics.contactFormSubmit(source);
      setIsSuccess(true);
      setForm(initialState);
    } catch (error) {
      console.error("Enquiry submission failed:", error);
      setFormError(
        "We couldn't reach our server. Check your connection, or WhatsApp us — the button below carries your message across."
      );
      analytics.enquirySubmitFailure(0, source);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div {...fieldProps} className={`${t.successBox} p-6`}>
        <h3 className={`mb-3 text-xl font-bold uppercase tracking-tight ${t.successTitle}`}>
          Got it — your enquiry is with us
        </h3>
        <p className={`mb-5 text-sm leading-relaxed ${t.successBody}`}>
          We read every enquiry ourselves and reply within {DMC.replyWindowHours} hours, usually
          sooner. The reply comes from {DMC.email} — worth checking your spam folder if it
          hasn&apos;t landed by tomorrow.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={DMC.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.whatsappClick()}
            className={`inline-flex h-12 items-center justify-center gap-3 px-5 text-sm font-black uppercase tracking-[0.16em] transition-colors ${t.submit}`}
          >
            <MessageCircle className="size-4" />
            Message us now
          </a>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className={`inline-flex h-12 items-center justify-center px-5 text-sm font-black uppercase tracking-[0.16em] transition-colors ${t.secondary}`}
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-7" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={`website-url-${source}`}>Leave this field empty</label>
        <input
          id={`website-url-${source}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) =>
            setForm((current) => ({ ...current, website: event.target.value }))
          }
        />
      </div>

      <label {...fieldProps} className={`block border-b pb-3 ${t.rule}`}>
        <span className={`text-xs font-bold uppercase tracking-[0.22em] ${t.label}`}>Your name</span>
        <input
          required
          value={form.name}
          onChange={updateField("name")}
          aria-invalid={Boolean(fieldErrors.name)}
          className={`mt-3 w-full bg-transparent text-base outline-none ${t.input}`}
          placeholder="Your full name"
        />
        {fieldErrors.name && (
          <span className={`mt-2 block text-xs font-medium ${t.fieldError}`}>{fieldErrors.name}</span>
        )}
      </label>

      <label {...fieldProps} className={`block border-b pb-3 ${t.rule}`}>
        <span className={`text-xs font-bold uppercase tracking-[0.22em] ${t.label}`}>Email</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={updateField("email")}
          aria-invalid={Boolean(fieldErrors.email)}
          className={`mt-3 w-full bg-transparent text-base outline-none ${t.input}`}
          placeholder="name@example.com"
        />
        {fieldErrors.email && (
          <span className={`mt-2 block text-xs font-medium ${t.fieldError}`}>{fieldErrors.email}</span>
        )}
      </label>

      <label {...fieldProps} className={`block border-b pb-3 ${t.rule}`}>
        <span className={`text-xs font-bold uppercase tracking-[0.22em] ${t.label}`}>
          What do you need?
        </span>
        <select
          value={form.projectType}
          onChange={updateField("projectType")}
          className={`mt-3 w-full bg-transparent text-base outline-none ${t.input} ${t.option}`}
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>

      <label {...fieldProps} className={`block border-b pb-3 ${t.rule}`}>
        <span className={`text-xs font-bold uppercase tracking-[0.22em] ${t.label}`}>
          Tell us more
        </span>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={updateField("message")}
          aria-invalid={Boolean(fieldErrors.message)}
          className={`mt-3 w-full resize-none bg-transparent text-base outline-none ${t.input}`}
          placeholder="What are you trying to launch or fix?"
        />
        {fieldErrors.message && (
          <span className={`mt-2 block text-xs font-medium ${t.fieldError}`}>
            {fieldErrors.message}
          </span>
        )}
      </label>

      {/* One tap, never typed, and already answered by default — so it adds a
          booked-call signal without adding a decision the visitor has to make. */}
      <div {...fieldProps}>
        <span className={`text-xs font-bold uppercase tracking-[0.22em] ${t.label}`}>
          Best time to call
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {CALL_WINDOWS.map((window) => {
            const selected = form.callWindow === window;
            return (
              <button
                key={window}
                type="button"
                aria-pressed={selected}
                onClick={() => setForm((current) => ({ ...current, callWindow: window }))}
                className={`px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                  selected ? t.chipActive : t.chip
                }`}
              >
                {window}
              </button>
            );
          })}
        </div>
      </div>

      {/* Company and budget stay collapsed. Asking about money up front is the
          single biggest drop-off on a first enquiry; the people willing to
          answer still can. */}
      <div {...fieldProps}>
        {!showOptional ? (
          <button
            type="button"
            onClick={() => setShowOptional(true)}
            className={`text-xs font-bold uppercase tracking-[0.18em] underline-offset-4 transition-colors hover:underline ${t.toggle}`}
          >
            › Add budget &amp; company (optional)
          </button>
        ) : (
          <div className="space-y-7">
            <label className={`block border-b pb-3 ${t.rule}`}>
              <span className={`text-xs font-bold uppercase tracking-[0.22em] ${t.label}`}>
                Business name
              </span>
              <input
                value={form.company}
                onChange={updateField("company")}
                className={`mt-3 w-full bg-transparent text-base outline-none ${t.input}`}
                placeholder="Your shop or company"
              />
            </label>

            <label className={`block border-b pb-3 ${t.rule}`}>
              <span className={`text-xs font-bold uppercase tracking-[0.22em] ${t.label}`}>
                Budget range
              </span>
              <select
                value={form.budgetRange}
                onChange={updateField("budgetRange")}
                className={`mt-3 w-full bg-transparent text-base outline-none ${t.input} ${t.option}`}
              >
                {BUDGET_RANGES.map((range) => (
                  <option key={range}>{range}</option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>

      {formError && (
        <div role="alert" className={`border p-4 text-sm leading-relaxed ${t.error}`}>
          {formError}
          <a href={mailtoHref} className="mt-2 block font-bold underline underline-offset-4">
            Send it by email instead →
          </a>
        </div>
      )}

      <div {...fieldProps} className="flex flex-col gap-3 pt-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`group/submit inline-flex h-12 w-full items-center justify-center gap-3 px-5 text-sm font-black uppercase tracking-[0.16em] transition-colors disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${t.submit}`}
        >
          <Send className="size-4 transition-transform group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5" />
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.whatsappClick()}
          className={`group/whatsapp inline-flex h-12 w-full items-center justify-center gap-3 px-5 text-sm font-black uppercase tracking-[0.16em] transition-colors sm:w-auto ${t.secondary}`}
        >
          <MessageCircle className="size-4 transition-transform group-hover/whatsapp:scale-110" />
          WhatsApp
        </a>
      </div>

      {/* Trust line sits with the button, not in the footer — this is where the
          visitor decides whether to press it. */}
      <p {...fieldProps} className={`text-[11px] font-medium leading-relaxed ${t.trust}`}>
        We reply within {DMC.replyWindowHours} hours · Your details are never shared or sold · You
        get scope, price, and timeline in writing before committing a rupee
      </p>
    </form>
  );
}
