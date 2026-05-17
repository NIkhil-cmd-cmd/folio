"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ScrambleText } from "./ScrambleText";

type PortfolioSectionProps = {
  number: string;
  label: string;
  children: ReactNode;
  className?: string;
  reduceMotion?: boolean;
};

export function PortfolioSection({
  number,
  label,
  children,
  className = "",
  reduceMotion = false,
}: PortfolioSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (reduceMotion) {
      el.classList.add("visible");
      return;
    }

    if (el.classList.contains("animate-first-section")) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className={`portfolio-section ${className}`.trim()}
    >
      <div className="section-label">
        <ScrambleText
          text={`${number} — ${label}`}
          triggerOnView
          disabled={reduceMotion}
        />
      </div>
      <div className="section-content">{children}</div>
    </section>
  );
}
