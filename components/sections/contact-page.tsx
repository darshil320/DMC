"use client";

import React, { useEffect, useMemo, useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, Mail, MessageCircle, Send, Sparkles } from "lucide-react";
import { CornerTicks } from "@/components/ui/CornerTicks";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DMC } from "@/lib/dmc-config";
import { analytics } from "@/lib/analytics";
import {
  BUDGET_RANGES,
  PROJECT_TYPES,
  TIER_TO_PROJECT_TYPE,
  type EnquiryInput,
  type EnquiryResponse,
} from "@/lib/enquiry";

const CONTACT_ASSET = "/assets/contact-union.webp";

type ContactFormState = Required<Omit<EnquiryInput, "source">>;

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  company: "",
  projectType: "Not sure yet",
  budgetRange: "Not sure yet",
  message: "",
  tier: "",
  website: "",
};

function ContactMarquee() {
  const items = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="relative flex h-[88px] w-full items-center overflow-hidden whitespace-nowrap md:h-[120px]">
      <div className="absolute left-0 top-0 z-20 h-full w-10 bg-gradient-to-r from-bg-page to-transparent" />
      <div className="absolute right-0 top-0 z-20 h-full w-10 bg-gradient-to-l from-bg-page to-transparent" />

      <div className="contact-marquee-track flex w-max shrink-0 items-center">
        {[0, 1].map((set) => (
          <div key={set} className="flex shrink-0 items-center">
            {items.map((item) => (
              <div key={`${set}-${item}`} className="flex shrink-0 items-center">
                <span
                  className="text-[56px] leading-none text-white md:text-[86px] lg:text-[144px] font-display uppercase tracking-tighter"
                >
                  Contact us
                </span>
                <span
                  className="mx-4 text-[56px] leading-none text-white md:mx-7 md:text-[86px] lg:text-[144px] font-display uppercase tracking-tighter"
                >
                  /
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactArtwork() {
  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[672px] overflow-hidden sm:h-[500px] lg:h-[672px]">
      <Image
        src={CONTACT_ASSET}
        alt="DMC contact artwork"
        fill
        priority
        unoptimized
        sizes="(max-width: 1024px) 90vw, 672px"
        className="object-contain object-center"
      />
    </div>
  );
}

function composeMessage(form: ContactFormState) {
  return [
    "Hi DMC, I want to start a project.",
    "",
    `Name: ${form.name || "-"}`,
    `Email: ${form.email || "-"}`,
    `Business: ${form.company || "-"}`,
    `Project type: ${form.projectType || "-"}`,
    `Budget range: ${form.budgetRange || "-"}`,
    "",
    "Project details:",
    form.message || "-",
  ].join("\n");
}

export function ContactPageExperience() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showOptional, setShowOptional] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Carry the pricing tier the visitor clicked through to the form, so nobody
  // has to restate a choice they already made on the pricing section.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tier = params.get("tier");
    if (!tier) return;

    const projectType = TIER_TO_PROJECT_TYPE[tier];
    // Deliberately in an effect rather than lazy initial state: `/contact` is
    // statically generated, so reading the query string during render would
    // produce a hydration mismatch on every tier-linked visit.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((current) => ({
      ...current,
      tier,
      ...(projectType ? { projectType } : {}),
    }));
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let hasStarted = false;
    let introTimeline: gsap.core.Timeline | undefined;
    let fallbackTimer: number | undefined;

    const query = gsap.utils.selector(section);
    
    const marquee = query("[data-contact-marquee]");
    const artwork = query("[data-contact-artwork]");
    const formBox = query("[data-contact-form]");
    const formFields = query("[data-contact-field]");
    const footerLinks = query("[data-contact-footer]");

    const allTargets = [marquee, artwork, formBox, formFields, footerLinks].flat();

    gsap.set(marquee, { autoAlpha: 0, y: 40, filter: "blur(8px)" });
    gsap.set(artwork, { autoAlpha: 0, scale: 0.9, filter: "blur(10px)", transformOrigin: "50% 50%" });
    gsap.set(formBox, { autoAlpha: 0, y: 50 });
    gsap.set(formFields, { autoAlpha: 0, y: 20 });
    gsap.set(footerLinks, { autoAlpha: 0, y: 20 });

    const startIntro = () => {
      if (hasStarted) return;
      hasStarted = true;

      introTimeline = gsap.timeline({
        delay: 0.1,
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.set(allTargets, { clearProps: "all" });
        },
      });

      introTimeline.to(artwork, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "expo.out",
      }, 0);

      introTimeline.to(marquee, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "expo.out",
      }, 0.2);

      introTimeline.to(formBox, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 0.4);

      introTimeline.to(formFields, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
      }, 0.6);

      introTimeline.to(footerLinks, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      }, 0.8);
    };

    const loader = document.querySelector("[data-brutalist-loader]");
    if (loader) {
      window.addEventListener("dmc:loader-complete", startIntro, { once: true });
      fallbackTimer = window.setTimeout(startIntro, 1200);
    } else {
      fallbackTimer = window.setTimeout(startIntro, 100);
    }

    return () => {
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      window.removeEventListener("dmc:loader-complete", startIntro);
      introTimeline?.kill();
      gsap.set(allTargets, { clearProps: "all" });
    };
  }, []);

  const message = useMemo(() => composeMessage(form), [form]);
  const mailtoHref = useMemo(() => {
    const subject = `New project enquiry from ${form.name || "DMC website"}`;
    return `mailto:${DMC.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }, [form.name, message]);
  const whatsappHref = `${DMC.whatsappLink}?text=${encodeURIComponent(message)}`;

  const updateField =
    (field: keyof ContactFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = event.target;

      if (!hasStartedTyping) {
        setHasStartedTyping(true);
        analytics.enquiryFormStart();
      }

      setForm((current) => ({ ...current, [field]: value }));
      setFieldErrors((current) => {
        if (!current[field]) return current;
        const { [field]: _removed, ...rest } = current;
        return rest;
      });
    };

  /**
   * Posts through `/api/enquiry` rather than straight to the Apps Script.
   * The old client-side call used `mode: "no-cors"`, whose opaque response
   * resolves even on a 500 — so a dead endpoint still showed "Sent
   * Successfully" and still fired the conversion event. Success is now claimed
   * only when the server confirms the enquiry was stored.
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
        body: JSON.stringify({ ...form, source: "contact-page" }),
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
        analytics.enquirySubmitFailure(response.status);
        return;
      }

      analytics.contactFormSubmit();
      setIsSuccess(true);
      setForm(initialFormState);
    } catch (error) {
      console.error("Enquiry submission failed:", error);
      setFormError(
        "We couldn't reach our server. Check your connection, or WhatsApp us — the button below carries your message across."
      );
      analytics.enquirySubmitFailure(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative z-10 min-h-screen overflow-hidden bg-bg-page text-text-primary">
      <section ref={sectionRef} className="relative min-h-screen px-6 pb-16 pt-28 md:px-12 lg:px-16 lg:pb-20">
        <div className="pointer-events-none absolute left-0 right-0 top-[184px] hidden h-px bg-border-subtle lg:block" />
        <div className="pointer-events-none absolute bottom-[19%] left-0 right-0 hidden h-px bg-border-subtle lg:block" />

        <div data-contact-marquee className="relative z-40 -mx-6 mb-6 pointer-events-none mix-blend-difference md:-mx-12 lg:absolute lg:left-0 lg:right-0 lg:top-[228px] lg:mx-0 lg:mb-0">
          <ContactMarquee />
        </div>

        <div data-contact-artwork className="relative z-30 -mx-2 pointer-events-none md:mx-0 lg:absolute lg:left-14 lg:top-[238px] lg:mx-0 lg:w-[672px]">
          <ContactArtwork />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100svh-7rem)] w-full max-w-[1440px] grid-cols-1 gap-10 lg:grid-cols-12 lg:pt-24">
          <div className="relative z-30 lg:col-span-5 lg:col-start-7 xl:col-span-5 xl:col-start-8 lg:mt-[260px] lg:pb-12">
            <div data-contact-form className="group relative overflow-hidden bg-emerald-950 px-6 py-8 md:p-8 lg:p-12">
              <CornerTicks tone="white" />
              <div data-contact-field className="mb-10 flex items-start justify-between gap-4">
                <h1
                  className="max-w-[480px] text-[44px] uppercase leading-[0.95] text-white md:text-[56px] lg:text-[56px] font-display tracking-tighter"
                >
                  Leave us a message
                </h1>
                <Sparkles className="mt-2 size-9 shrink-0 text-white/80 md:size-11" aria-hidden="true" strokeWidth={1} />
              </div>

              {isSuccess ? (
                /* Persistent confirmation. The old version was a five-second
                   label swap that left the visitor staring at an empty form
                   with no idea what happens next. */
                <div data-contact-field className="border border-[#f2e4d0]/40 bg-white/5 p-6">
                  <h2 className="mb-3 text-xl font-bold uppercase tracking-tight text-[#f2e4d0]">
                    Got it — your enquiry is with us
                  </h2>
                  <p className="mb-5 text-sm leading-relaxed text-white/80">
                    We read every enquiry ourselves and reply within {DMC.replyWindowHours} hours,
                    usually sooner. The reply comes from {DMC.email} — worth checking your spam
                    folder if it hasn&apos;t landed by tomorrow.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href={DMC.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.whatsappClick()}
                      className="inline-flex h-12 items-center justify-center gap-3 border border-[#f2e4d0] bg-[#f2e4d0] px-5 text-sm font-black uppercase tracking-[0.16em] text-[#123f36] transition-colors hover:bg-white"
                    >
                      <MessageCircle className="size-4" />
                      Message us now
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="inline-flex h-12 items-center justify-center border border-white/30 px-5 text-sm font-black uppercase tracking-[0.16em] text-white transition-colors hover:border-[#f2e4d0] hover:text-[#f2e4d0]"
                    >
                      Send another
                    </button>
                  </div>
                </div>
              ) : (
              <form className="space-y-7" onSubmit={handleSubmit} noValidate>
                {/* Honeypot — hidden from people, irresistible to bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                  <label htmlFor="website-url">Leave this field empty</label>
                  <input
                    id="website-url"
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

                <label data-contact-field className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Your name</span>
                  <input
                    required
                    value={form.name}
                    onChange={updateField("name")}
                    aria-invalid={Boolean(fieldErrors.name)}
                    className="mt-3 w-full bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-emerald-100"
                    placeholder="Your full name"
                  />
                  {fieldErrors.name && (
                    <span className="mt-2 block text-xs font-medium text-[#ffb4a2]">{fieldErrors.name}</span>
                  )}
                </label>

                <label data-contact-field className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={updateField("email")}
                    aria-invalid={Boolean(fieldErrors.email)}
                    className="mt-3 w-full bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-emerald-100"
                    placeholder="name@example.com"
                  />
                  {fieldErrors.email && (
                    <span className="mt-2 block text-xs font-medium text-[#ffb4a2]">{fieldErrors.email}</span>
                  )}
                </label>

                <label data-contact-field className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">What do you need?</span>
                  <select
                    value={form.projectType}
                    onChange={updateField("projectType")}
                    className="mt-3 w-full bg-transparent text-base text-white outline-none focus:text-emerald-100 [&>option]:bg-emerald-950"
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </label>

                <label data-contact-field className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Tell us more</span>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={updateField("message")}
                    aria-invalid={Boolean(fieldErrors.message)}
                    className="mt-3 w-full resize-none bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-[#f2e4d0]"
                    placeholder="What are you trying to launch or fix?"
                  />
                  {fieldErrors.message && (
                    <span className="mt-2 block text-xs font-medium text-[#ffb4a2]">{fieldErrors.message}</span>
                  )}
                </label>

                {/* Company and budget are collapsed by default. Asking about
                    money up front is the single biggest drop-off on a first
                    enquiry; the people willing to answer still can. */}
                <div data-contact-field>
                  {!showOptional ? (
                    <button
                      type="button"
                      onClick={() => setShowOptional(true)}
                      className="text-xs font-bold uppercase tracking-[0.18em] text-white/62 underline-offset-4 transition-colors hover:text-[#f2e4d0] hover:underline"
                    >
                      › Add budget &amp; company (optional)
                    </button>
                  ) : (
                    <div className="space-y-7">
                      <label className="block border-b border-white/28 pb-3">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Business name</span>
                        <input
                          value={form.company}
                          onChange={updateField("company")}
                          className="mt-3 w-full bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-emerald-100"
                          placeholder="Your shop or company"
                        />
                      </label>

                      <label className="block border-b border-white/28 pb-3">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Budget range</span>
                        <select
                          value={form.budgetRange}
                          onChange={updateField("budgetRange")}
                          className="mt-3 w-full bg-transparent text-base text-white outline-none focus:text-emerald-100 [&>option]:bg-emerald-950"
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
                  <div
                    role="alert"
                    className="border border-[#ffb4a2]/50 bg-[#ffb4a2]/10 p-4 text-sm leading-relaxed text-[#ffd7cc]"
                  >
                    {formError}
                    <a
                      href={mailtoHref}
                      className="mt-2 block font-bold underline underline-offset-4"
                    >
                      Send it by email instead →
                    </a>
                  </div>
                )}

                <div data-contact-field className="flex flex-col gap-3 pt-3 sm:flex-row">
                  <MagneticButton strength={8} className="w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group/submit inline-flex h-12 w-full items-center justify-center gap-3 border border-[#f2e4d0] bg-[#f2e4d0] px-5 text-sm font-black uppercase tracking-[0.16em] text-[#123f36] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Send className="size-4 transition-transform group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5" />
                      {isSubmitting ? "Sending..." : "Send message"}
                    </button>
                  </MagneticButton>
                  <MagneticButton strength={8} className="w-full sm:w-auto">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.whatsappClick()}
                      className="group/whatsapp inline-flex h-12 w-full items-center justify-center gap-3 border border-white/30 px-5 text-sm font-black uppercase tracking-[0.16em] text-white transition-colors hover:border-[#f2e4d0] hover:text-[#f2e4d0]"
                    >
                      <MessageCircle className="size-4 transition-transform group-hover/whatsapp:scale-110" />
                      WhatsApp
                    </a>
                  </MagneticButton>
                </div>

                {/* Trust line sits with the button, not in the footer — this is
                    where the visitor decides whether to press it. */}
                <p data-contact-field className="text-[11px] font-medium leading-relaxed text-white/62">
                  We reply within {DMC.replyWindowHours} hours · Your details are never shared or sold ·
                  You get scope, price, and timeline in writing before committing a rupee
                </p>
              </form>
              )}
            </div>

            <div data-contact-footer className="group relative mt-8 grid gap-4 overflow-hidden border border-border-subtle bg-bg-card p-5 text-sm text-text-secondary sm:grid-cols-2">
              <CornerTicks tone="accent" />
              <a href={`mailto:${DMC.email}`} className="group flex items-center justify-between gap-4 hover:text-text-primary">
                <span className="flex min-w-0 items-center gap-3">
                  <Mail className="size-4 shrink-0 text-accent" />
                  <span className="link-underline truncate">{DMC.email}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link href="/" className="group flex items-center justify-between gap-4 hover:text-text-primary">
                <span className="link-underline">Back to home</span>
                <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
