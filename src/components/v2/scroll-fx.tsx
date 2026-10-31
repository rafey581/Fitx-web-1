"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Smooth scrolling plus scroll-in reveals for every public page. Sections,
 * cards and anything marked `data-reveal` inside #main-content rise in as they
 * enter the viewport; siblings in a grid are staggered.
 */
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "#main-content main section, #main-content .card, #main-content [data-reveal]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    targets.forEach((el) => {
      if (el.classList.contains("is-in")) return;
      // Never hide anything already on screen at load (no flash of empty hero).
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      const index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 70}ms`);
      el.classList.add("reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
