"use client";

import React, { useMemo, useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
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
    `Project type: ${form.budget || "-"}`,
    "",
    "Project details:",
    form.project || "-",
  ].join("\n");
}

export function ContactPageExperience() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycbwRxB1lfQw1_kdsDGoThSqQl4aYtl5NfRaj58PPwEH-_wrjSWHAEfYYwsnhAVVVWFiPtA/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ ...form, source: "Contact Page" }),
      });
      
      setIsSuccess(true);
      setForm(initialFormState);
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission failed:", error);
      // Fallback to mailto if fetch fails entirely
      window.location.href = mailtoHref;
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
            <div data-contact-form className="bg-emerald-950 px-6 py-8 md:p-8 lg:p-12">
              <div data-contact-field className="mb-10 flex items-start justify-between gap-4">
                <h1
                  className="max-w-[480px] text-[44px] uppercase leading-[0.95] text-white md:text-[56px] lg:text-[56px] font-display tracking-tighter"
                >
                  Leave us a message
                </h1>
                <Sparkles className="mt-2 size-9 shrink-0 text-white/80 md:size-11" aria-hidden="true" strokeWidth={1} />
              </div>

              <form className="space-y-7" onSubmit={handleSubmit}>
                <label data-contact-field className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Your name</span>
                  <input
                    required
                    value={form.name}
                    onChange={updateField("name")}
                    className="mt-3 w-full bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-emerald-100"
                    placeholder="Darshil Lashkari"
                  />
                </label>

                <label data-contact-field className="block border-b border-white/28 pb-3">
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

                <label data-contact-field className="block border-b border-white/28 pb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">Business name</span>
                  <input
                    value={form.company}
                    onChange={updateField("company")}
                    className="mt-3 w-full bg-transparent text-base text-white outline-none placeholder:text-white/28 focus:text-emerald-100"
                    placeholder="Your shop or company"
                  />
                </label>

                <label data-contact-field className="block border-b border-white/28 pb-3">
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

                <label data-contact-field className="block border-b border-white/28 pb-3">
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

                <div data-contact-field className="flex flex-col gap-3 pt-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="inline-flex h-12 items-center justify-center gap-3 border border-[#f2e4d0] bg-[#f2e4d0] px-5 text-sm font-black uppercase tracking-[0.16em] text-[#123f36] transition-colors hover:bg-white disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Send className="size-4" />
                    {isSubmitting ? "Sending..." : isSuccess ? "Sent Successfully" : "Send message"}
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

            <div data-contact-footer className="mt-8 grid gap-4 border border-border-subtle bg-bg-card p-5 text-sm text-text-secondary sm:grid-cols-2">
              <a href={`mailto:${DMC.email}`} className="group flex items-center justify-between gap-4 hover:text-text-primary">
                <span className="flex min-w-0 items-center gap-3">
                  <Mail className="size-4 shrink-0 text-accent" />
                  <span className="truncate">{DMC.email}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link href="/" className="group flex items-center justify-between gap-4 hover:text-text-primary">
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
