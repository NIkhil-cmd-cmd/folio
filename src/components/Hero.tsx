"use client";

import { useEffect, useState } from "react";
import { useScramble } from "use-scramble";
import { SCRAMBLE_CONFIG } from "@/lib/scramble-config";
import { MEDIA } from "@/lib/media";
import { TextLink } from "./TextLink";

export function Hero({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [portraitSrc, setPortraitSrc] = useState<string>(MEDIA.profile);
  const [showPortrait, setShowPortrait] = useState(true);

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
        {showPortrait && (
          <div className="hero-portrait-wrap animate-hero-subtitle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portraitSrc}
              alt="Nikhil Krishnaswamy"
              width={160}
              height={160}
              className="hero-portrait"
              onError={() => {
                if (portraitSrc.endsWith(".jpg")) {
                  setPortraitSrc("/media/profile/photo.png");
                  return;
                }
                setShowPortrait(false);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}