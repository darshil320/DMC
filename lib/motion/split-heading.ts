import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const LINE_DURATION = 0.9;
const LINE_STAGGER = 0.09;

/** Unhide the heading without the split effect — used as a safety fallback. */
function revealPlain(element: HTMLElement) {
  gsap.set(element, { autoAlpha: 1 });
  element.dataset.motionVisible = "true";
}

function runSplit(element: HTMLElement) {
  let split: SplitText | null = null;

  try {
    split = new SplitText(element, {
      type: "lines",
      mask: "lines",
      linesClass: "split-heading-line",
    });
  } catch {
    split = null;
  }

  if (!split || split.lines.length === 0) {
    revealPlain(element);
    return;
  }

  const instance = split;
  gsap.set(element, { autoAlpha: 1 });
  gsap.fromTo(
    instance.lines,
    { yPercent: 115 },
    {
      yPercent: 0,
      duration: LINE_DURATION,
      stagger: LINE_STAGGER,
      ease: "expo.out",
      onComplete: () => {
        // Restore the original DOM once the entrance is done — keeps text
        // selectable/semantic and removes any resize concerns.
        instance.revert();
        element.dataset.motionVisible = "true";
      },
    }
  );
}

/**
 * Awwwards-style masked line reveal: splits a heading into lines, each inside
 * an overflow-clipped mask, and slides them up with a hard expo settle.
 * Waits for fonts so line breaks are measured against the final metrics.
 */
export function animateSplitHeading(element: HTMLElement): void {
  if (!document.fonts || document.fonts.status === "loaded") {
    runSplit(element);
    return;
  }

  document.fonts.ready
    .then(() => runSplit(element))
    .catch(() => revealPlain(element));
}
