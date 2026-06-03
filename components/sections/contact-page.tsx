"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Send, Sparkles } from "lucide-react";
import { DMC } from "@/lib/dmc-config";

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
                  className="text-[56px] italic leading-none text-white md:text-[86px] lg:text-[144px]"
                  style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
                >
                  Contact us
                </span>
                <span
                  className="mx-4 text-[56px] leading-none text-white md:mx-7 md:text-[86px] lg:text-[144px]"
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
    `Project type: ${form.budget || "-"}`,
    "",
    "Project details:",
    form.project || "-",
  ].join("\n");
}

export function ContactPageExperience() {
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

        <div className="relative z-40 -mx-6 mb-6 pointer-events-none mix-blend-difference md:-mx-12 lg:absolute lg:left-0 lg:right-0 lg:top-[228px] lg:mx-0 lg:mb-0">
          <ContactMarquee />
        </div>

        <div className="relative z-30 -mx-2 pointer-events-none md:mx-0 lg:absolute lg:left-14 lg:top-[245px] lg:mx-0 lg:w-[672px]">
          <ContactArtwork />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100svh-7rem)] w-full max-w-[1440px] grid-cols-1 gap-10 lg:grid-cols-12 lg:pt-24">
          <div className="relative z-30 lg:col-span-5 lg:col-start-7 xl:col-span-5 xl:col-start-8 lg:mt-[260px] lg:pb-12">
            <div className="bg-emerald-950 px-6 py-8 md:p-8 lg:p-12">
              <div className="mb-10 flex items-start justify-between gap-4">
                <h1
                  className="max-w-[480px] text-[44px] uppercase leading-[0.95] text-white md:text-[56px] lg:text-[56px]"
                  style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
                >
                  Leave us a message
                </h1>
                <Sparkles className="mt-2 size-9 shrink-0 text-white/80 md:size-11" aria-hidden="true" strokeWidth={1} />
              </div>

              <form className="space-y-7" onSubmit={handleSubmit}>
                <label className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Your name</span>
                  <input
                    required
                    value={form.name}
                    onChange={updateField("name")}
                    className="mt-3 w-full bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-emerald-100"
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
                    className="mt-3 w-full bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-emerald-100"
                    placeholder="name@example.com"
                  />
                </label>

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
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Project type</span>
                  <select
                    value={form.budget}
                    onChange={updateField("budget")}
                    className="mt-3 w-full bg-transparent text-base text-white outline-none focus:text-emerald-100 [&>option]:bg-emerald-950"
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
