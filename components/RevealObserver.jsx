"use client";

import { useEffect } from "react";

/**
 * Single IntersectionObserver that drives all scroll-reveal animations:
 *  - `.animate-on-scroll` / `.animate-left` / `.animate-right` / `.animate-scale` → adds `.visible`
 *  - `.premium-reveal` → adds `.is-visible`
 * Mounted once near the root, it observes the already-rendered DOM.
 */
export default function RevealObserver() {
  useEffect(() => {
    const basic = Array.from(
      document.querySelectorAll(
        ".animate-on-scroll, .animate-left, .animate-right, .animate-scale",
      ),
    );
    const premium = Array.from(document.querySelectorAll(".premium-reveal"));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add(el.classList.contains("premium-reveal") ? "is-visible" : "visible");
          obs.unobserve(el);
          // Release the GPU layer once the animation has finished.
          setTimeout(() => {
            el.style.willChange = "auto";
          }, 1000);
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.08 },
    );

    [...basic, ...premium].forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
