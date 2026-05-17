"use client";

import { useEffect, useRef } from "react";

type ScrollingIframeProps = {
  src: string;
  title: string;
  playing: boolean;
};

const SCROLL_SPEED = 0.45;
const IFRAME_OVERSCAN = 1.85;

export function ScrollingIframe({ src, title, playing }: ScrollingIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const offsetRef = useRef(0);
  const maxScrollRef = useRef(320);

  useEffect(() => {
    offsetRef.current = 0;
    if (iframeRef.current) {
      iframeRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  }, [src]);

  useEffect(() => {
    const wrap = iframeRef.current?.parentElement;
    if (!wrap) return;
    maxScrollRef.current = Math.max(
      120,
      wrap.clientHeight * (IFRAME_OVERSCAN - 1)
    );
  }, [src, playing]);

  useEffect(() => {
    if (!playing) {
      offsetRef.current = 0;
      if (iframeRef.current) {
        iframeRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      return;
    }

    let frame = 0;
    const tick = () => {
      const max = maxScrollRef.current;
      offsetRef.current += SCROLL_SPEED;
      if (offsetRef.current >= max) {
        offsetRef.current = 0;
      }
      if (iframeRef.current) {
        iframeRef.current.style.transform = `translate3d(0, -${offsetRef.current}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, src]);

  return (
    <div className="iframe-scroll-port">
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className="hover-card-iframe scrolling"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
