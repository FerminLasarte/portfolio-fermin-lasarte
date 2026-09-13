"use client";

import { useEffect } from "react";

/**
 * Premium effect: 3D parallax + organic floating of the hero tech badges.
 * No renderiza nada: se engancha al hero (#sobre-mi) ya renderizado en el servidor.
 */
export default function HeroParallax() {
  useEffect(() => {
    const hero = document.getElementById("sobre-mi");
    if (!hero) return;
    if (window.innerWidth <= 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const badges = hero.querySelectorAll(".hero-badge-float");
    if (badges.length === 0) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let time = 0;
    let rafId;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    const animate = () => {
      time += 0.025;
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      badges.forEach((badge, index) => {
        badge.style.animation = "none";
        const depth = ((index % 3) + 1.5) * -12;
        const floatY = Math.sin(time + index * 2) * 6;
        const isPython = badge.classList.contains("hero-badge-float--5");
        const baseX = isPython ? "-50%" : "0px";
        const tx = `calc(${baseX} + ${mouseX * depth}px)`;
        const ty = `${floatY + mouseY * depth}px`;
        badge.style.transform = `translate(${tx}, ${ty})`;
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return null;
}
