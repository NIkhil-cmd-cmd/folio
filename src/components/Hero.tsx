"use client";

import { useEffect, useState } from "react";
import { useScramble } from "use-scramble";
import { SCRAMBLE_CONFIG } from "@/lib/scramble-config";
import { TextLink } from "./TextLink";
import { HeroPortrait } from "./HeroPortrait";

export function Hero({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const [mounted, setMounted] = useState(false);

  const prefix = useScramble({
    ...SCRAMBLE_CONFIG,
    text: "hi, i'm ",
    playOnMount: !reduceMotion,
    speed: reduceMotion ? 0 : SCRAMBLE_CONFIG.speed,
  });

  const name = useScramble({
    ...SCRAMBLE_CONFIG,
    text: "nikhil",
    playOnMount: !reduceMotion,
    speed: reduceMotion ? 0 : SCRAMBLE_CONFIG.speed,
  });

  useEffect(() => setMounted(true), []);

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-layout">
        <div className="hero-copy">
          <h1 className="hero-title">
            {reduceMotion ? (
              <>
                hi, i&apos;m <span className="accent">nikhil</span>
              </>
            ) : (
              <>
                <span ref={prefix.ref} />
                <span ref={name.ref} className="accent" />
              </>
            )}
          </h1>
          <p
            className={`hero-subtitle${mounted ? " animate-hero-subtitle" : ""}`}
          >
            studying cs + ee @ stanford
          </p>
          <TextLink
            href="mailto:nikhilk0@stanford.edu"
            mailto
            className={`hero-email${mounted ? " animate-hero-email" : ""}`}
          >
            nikhilk0@stanford.edu
          </TextLink>
        </div>
        <HeroPortrait />
      </div>
    </section>
  );
}
