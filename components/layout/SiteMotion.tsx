"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = [
  "main section:not(#home) .section-tag",
  "main section:not(#home) h2",
  "main section:not(#home) h3",
  "main section:not(#home) h4",
  "main section:not(#home) p",
  "main section:not(#home) li",
  "footer a",
  "footer span",
].join(",");

const INTERACTIVE_SELECTOR = "a[href], button";

const CARD_SELECTOR = [
  "main section:not(#home) [class*='group'][class*='border']",
  "main section:not(#home) [class*='bg-bg-card'][class*='border']",
  "main section:not(#home) article",
].join(",");

const MEDIA_SELECTOR = [
  "main section:not(#home) img",
  "main section:not(#home) video",
  "main section:not(#home) canvas",
].join(",");

function getRevealKind(element: HTMLElement) {
  if (element.matches(".section-tag")) return "tag";
  if (element.matches("h2, h3, h4")) return "heading";
  if (element.matches("li")) return "row";
  return "text";
}

function isCardWrapperLink(element: HTMLElement) {
  return (
    element.tagName === "A" &&
    !element.getAttribute("class") &&
    element.children.length === 1
  );
}

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) return;

    const observed = new Set<Element>();
    let frame = 0;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.dataset.motionVisible = "true";
          revealObserver.unobserve(target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      }
    );

    const prepare = () => {
      frame = 0;

      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element, index) => {
        if (observed.has(element)) return;
        observed.add(element);
        element.dataset.premiumMotion = "reveal";
        element.dataset.motionKind = getRevealKind(element);
        element.style.setProperty("--motion-delay", `${Math.min(index % 8, 7) * 34}ms`);
        revealObserver.observe(element);
      });

      document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR).forEach((element) => {
        if (isCardWrapperLink(element)) return;
        if (element.dataset.premiumInteraction === "true") return;
        element.dataset.premiumInteraction = "true";
      });

      document.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((element) => {
        if (element.hasAttribute("data-premium-card")) return;
        element.dataset.premiumCard = "true";
      });

      document.querySelectorAll<HTMLElement>(MEDIA_SELECTOR).forEach((element) => {
        if (element.dataset.premiumMedia === "true") return;
        element.dataset.premiumMedia = "true";
      });
    };

    const schedulePrepare = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(prepare);
    };

    prepare();

    const mutationObserver = new MutationObserver(schedulePrepare);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
