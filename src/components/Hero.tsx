"use client";

import { useEffect, useState } from "react";
import { useScramble } from "use-scramble";
import { SCRAMBLE_CONFIG } from "@/lib/scramble-config";
import { MEDIA } from "@/lib/media";

const GITHUB = "https://github.com/NIkhil-cmd-cmd";
const LINKEDIN = "https://linkedin.com/in/nikhil-krishnaswamy";

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
      <div className="hero-layout hero-layout--solo">
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
          <div
            className={`hero-meta${mounted ? " animate-hero-meta" : ""}`}
          >
            <p className="hero-subtitle">studying cs + ee @ stanford</p>
            <a
              className="hero-email"
              href="mailto:nikhilk0@stanford.edu"
            >
              nikhilk0 [at] stanford [dot] edu
            </a>
            <nav className="hero-links" aria-label="Profile links">
              <a
                className="hero-link"
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
              >
                github ↗
              </a>
              <span className="hero-link-sep" aria-hidden>
                ·
              </span>
              <a
                className="hero-link"
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin ↗
              </a>
              <span className="hero-link-sep" aria-hidden>
                ·
              </span>
              <a
                className="hero-link"
                href={MEDIA.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                resume ↗
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
