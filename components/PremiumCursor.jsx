"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Magnetic contextual cursor — only rendered on devices with a fine pointer
 * (mouse). It grows when hovering interactive elements.
 */
export default function PremiumCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    document.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button");
    const onEnter = () => cursor.classList.add("cursor-hover");
    const onLeave = () => cursor.classList.remove("cursor-hover");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div className="premium-cursor" ref={cursorRef} />;
}
