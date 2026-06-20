"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Media-query helper that stays in sync with changes (e.g. user toggles
 * reduced-motion, resizes across the desktop breakpoint, plugs in a mouse).
 * Returns `false` on the server and first client paint to avoid hydration
 * mismatch, then resolves on mount.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** True only when the user has NOT requested reduced motion. */
export function useMotionAllowed(): boolean {
  return !useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Gate for expensive, decorative motion (custom cursor, 3D scenes, magnetic
 * hover). Requires a fine pointer, a desktop-class viewport, and motion
 * permission — mirrors the original `useDesktopDecorations` logic so mobile
 * and accessibility users never pay for the WebGL/animation cost.
 */
export function usePremiumMotion(): boolean {
  const finePointer = useMediaQuery("(pointer: fine) and (min-width: 768px)");
  const motionAllowed = useMotionAllowed();
  return finePointer && motionAllowed;
}

/**
 * Reports whether `ref` has entered the viewport. Once `once` is true (default)
 * it latches on first intersection so heavy work mounts a single time. Used to
 * defer mounting 3D canvases until the section is actually near the screen.
 */
export function useInViewport<T extends Element>(
  ref: RefObject<T | null>,
  { rootMargin = "200px", once = true }: { rootMargin?: string; once?: boolean } = {}
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}
