"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Send, Sparkles } from "lucide-react";
import { DMC } from "@/lib/dmc-config";
import { cn } from "@/lib/utils";

const CONTACT_ASSET = "/assets/contact-union.webp";

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  project: string;
  budget: string;
};

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  company: "",
  project: "",
  budget: "Starter website",
};

function ContactMarquee() {
  const items = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="relative flex h-[88px] w-full items-center overflow-hidden whitespace-nowrap md:h-[120px]">
      <div className="absolute left-0 top-0 z-20 h-full w-10 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 z-20 h-full w-10 bg-gradient-to-l from-black to-transparent" />

      <div className="contact-marquee-track flex w-max shrink-0 items-center">
        {[0, 1].map((set) => (
          <div key={set} className="flex shrink-0 items-center">
            {items.map((item) => (
              <div key={`${set}-${item}`} className="flex shrink-0 items-center">
                <span
                  className="text-[56px] italic leading-none text-white md:text-[86px] lg:text-[124px]"
                  style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
                >
                  Contact us
                </span>
                <span
                  className="mx-4 text-[56px] leading-none text-white md:mx-7 md:text-[86px] lg:text-[124px]"
                  style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
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

function FallbackArtwork({ hidden }: { hidden: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 transition-opacity duration-500",
        hidden ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="absolute left-[2%] top-[20%] h-[38%] w-[38%] bg-[#4f7389]" />
      <div className="absolute left-[27%] top-[12%] h-[27%] w-[48%] bg-[#6e8aa2]" />
      <div className="absolute bottom-[1%] left-[21%] h-[31%] w-[70%] bg-[#6f91a3]" />
      <div className="absolute bottom-0 left-[16%] h-[16%] w-[75%] bg-[linear-gradient(90deg,#b84161_0_8%,#e6ad56_8%_18%,#d94767_18%_31%,#f3c26f_31%_43%,#7fbe8a_43%_58%,#cc4562_58%_72%,#edc66f_72%_86%,#8ac495_86%_100%)] opacity-90" />

      <div className="absolute left-[32%] top-[7%] h-[78%] w-[38%]">
        <div className="absolute left-[34%] top-[2%] h-[11%] w-[70%] rotate-[-7deg] border-[10px] border-[#f4d37c]" />
        <div className="absolute left-[24%] top-[6%] h-[23%] w-[46%] border-[10px] border-[#d7bf98] bg-[#e4d1ad] shadow-[10px_10px_0_rgba(0,0,0,0.45)]">
          <div className="absolute left-[14%] top-[18%] h-[46%] w-[68%] bg-[#2b2925]" />
          <div className="absolute bottom-[13%] left-[20%] h-[6%] w-[52%] bg-[#8d7b65]" />
        </div>
        <div className="absolute bottom-[8%] left-[36%] h-[62%] w-[34%] skew-x-[-8deg] bg-[linear-gradient(120deg,#f5e4c9_0%,#7f9fb1_28%,#e8d2af_42%,#6e8493_58%,#f3e3cb_73%,#9aa8b1_100%)]" />
        <div className="absolute bottom-[4%] left-[55%] h-[44%] w-[19%] skew-x-[10deg] bg-[linear-gradient(120deg,#d7eef6,#658ca1_38%,#f1d8b7_64%,#3e6174)]" />
        <div className="absolute bottom-[3%] left-[15%] h-[47%] w-[20%] skew-x-[-12deg] bg-[linear-gradient(120deg,#f1d7b3,#7896a6_42%,#e8f3f6_55%,#4f7180)]" />
      </div>

      <div className="absolute left-[24%] top-[37%] h-[29%] w-[44%] border-[26px] border-black" />
      <div className="absolute left-[44%] top-[57%] h-[22%] w-[36%] border-[22px] border-black border-l-0" />
    </div>
  );
}

function ContactArtwork({ hasAsset }: { hasAsset: boolean }) {
  const [assetLoaded, setAssetLoaded] = useState(false);

  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[720px] overflow-hidden sm:h-[560px] lg:h-[680px]">
      <FallbackArtwork hidden={assetLoaded} />

      {hasAsset && (
        <Image
          src={CONTACT_ASSET}
          alt="DMC contact artwork"
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 90vw, 720px"
          onLoad={() => setAssetLoaded(true)}
          onError={() => setAssetLoaded(false)}
          className={cn(
            "object-contain object-left-bottom transition-opacity duration-700",
            assetLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
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
    `Project type: ${form.budget || "-"}`,
    "",
    "Project details:",
    form.project || "-",
  ].join("\n");
}

export function ContactPageExperience({ hasContactAsset }: { hasContactAsset: boolean }) {
  const [form, setForm] = useState<ContactFormState>(initialFormState);

  const message = useMemo(() => composeMessage(form), [form]);
  const mailtoHref = useMemo(() => {
    const subject = `New project enquiry from ${form.name || "DMC website"}`;
    return `mailto:${DMC.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }, [form.name, message]);
  const whatsappHref = `${DMC.whatsappLink}?text=${encodeURIComponent(message)}`;

  const updateField =
    (field: keyof ContactFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = mailtoHref;
  };

  return (
    <main className="relative z-10 min-h-screen overflow-hidden bg-black text-white">
      <section className="relative min-h-screen px-6 pb-16 pt-28 md:px-12 lg:px-16 lg:pb-20">
        <div className="pointer-events-none absolute left-0 right-0 top-[184px] hidden h-px bg-white/12 lg:block" />
        <div className="pointer-events-none absolute bottom-[19%] left-0 right-0 hidden h-px bg-white/12 lg:block" />

        <div className="relative z-20 -mx-6 mb-6 md:-mx-12 lg:absolute lg:left-0 lg:right-0 lg:top-[220px] lg:mx-0 lg:mb-0">
          <ContactMarquee />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100svh-7rem)] w-full max-w-[1440px] grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:pt-[250px]">
          <div className="relative z-10 lg:col-span-6">
            <ContactArtwork hasAsset={hasContactAsset} />
          </div>

          <div className="relative z-30 lg:col-span-5 lg:col-start-8 lg:pb-[5vh]">
            <div className="bg-[#123f36] px-6 py-8 shadow-[14px_14px_0_rgba(0,0,0,0.55)] md:p-10 lg:p-12">
              <div className="mb-10 flex items-start justify-between gap-6">
                <h1
                  className="max-w-[520px] text-[40px] uppercase leading-[0.95] text-white md:text-[56px] lg:text-[64px]"
                  style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
                >
                  Leave us a message
                </h1>
                <Sparkles className="mt-2 size-9 shrink-0 text-[#f2e4d0] md:size-11" aria-hidden="true" />
              </div>

              <form className="space-y-7" onSubmit={handleSubmit}>
                <label className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Your name</span>
                  <input
                    required
                    value={form.name}
                    onChange={updateField("name")}
                    className="mt-3 w-full bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-[#f2e4d0]"
                    placeholder="Darshil Lashkari"
                  />
                </label>

                <label className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={updateField("email")}
                    className="mt-3 w-full bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-[#f2e4d0]"
                    placeholder="name@example.com"
                  />
                </label>

                <label className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Business name</span>
                  <input
                    value={form.company}
                    onChange={updateField("company")}
                    className="mt-3 w-full bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-[#f2e4d0]"
                    placeholder="Your shop or company"
                  />
                </label>

                <label className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Project type</span>
                  <select
                    value={form.budget}
                    onChange={updateField("budget")}
                    className="mt-3 w-full bg-transparent text-base text-white outline-none focus:text-[#f2e4d0] [&>option]:bg-[#123f36]"
                  >
                    <option>Starter website</option>
                    <option>Product catalog</option>
                    <option>Ecommerce store</option>
                    <option>AI visualizer</option>
                    <option>Not sure yet</option>
                  </select>
                </label>

                <label className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">How can I help you?</span>
                  <textarea
                    required
                    rows={4}
                    value={form.project}
                    onChange={updateField("project")}
                    className="mt-3 w-full resize-none bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-[#f2e4d0]"
                    placeholder="Tell us what you want to launch."
                  />
                </label>

                <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center gap-3 border border-[#f2e4d0] bg-[#f2e4d0] px-5 text-sm font-black uppercase tracking-[0.16em] text-[#123f36] transition-colors hover:bg-white"
                  >
                    <Send className="size-4" />
                    Send message
                  </button>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-3 border border-white/30 px-5 text-sm font-black uppercase tracking-[0.16em] text-white transition-colors hover:border-[#f2e4d0] hover:text-[#f2e4d0]"
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </a>
                </div>
              </form>
            </div>

            <div className="mt-8 grid gap-4 border border-white/12 bg-black/60 p-5 text-sm text-white/70 sm:grid-cols-2">
              <a href={`mailto:${DMC.email}`} className="group flex items-center justify-between gap-4 hover:text-white">
                <span className="flex min-w-0 items-center gap-3">
                  <Mail className="size-4 shrink-0 text-[#f2e4d0]" />
                  <span className="truncate">{DMC.email}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link href="/" className="group flex items-center justify-between gap-4 hover:text-white">
                <span>Back to home</span>
                <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
