"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { PortfolioSection } from "./PortfolioSection";
import { MediaHoverRow, type HoverRowItem } from "./MediaHoverRow";
import { HoverPreviewPanel } from "./HoverPreviewPanel";
import { CursorGlow } from "./CursorGlow";
import { TextLink } from "./TextLink";
import { awards, currentlyItems, projects, researchItems } from "@/lib/data";

export function PortfolioPage() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [previewItem, setPreviewItem] = useState<HoverRowItem | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-div: reduce)").matches
    );
  }, []);

  const cancelHide = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const activate = useCallback(
    (item: HoverRowItem) => {
      cancelHide();
      setPreviewItem(item);
    },
    [cancelHide]
  );

  const scheduleHide = useCallback(() => {
    cancelHide();
    hideTimer.current = setTimeout(() => setPreviewItem(null), 120);
  }, [cancelHide]);

  const deactivate = useCallback(() => {
    cancelHide();
    setPreviewItem(null);
  }, [cancelHide]);

  const rowProps = (item: HoverRowItem) => ({
    item,
    reduceMotion,
    isActive: previewItem?.mediaFolder === item.mediaFolder,
    onActivate: activate,
    onDeactivate: scheduleHide,
  });

  return (
    <>
      <CursorGlow />
      <Header />
      <main
        className="page-shell"
        onMouseLeave={(e) => {
          const next = e.relatedTarget as Node | null;
          if (!next || !e.currentTarget.contains(next)) {
            deactivate();
          }
        }}
      >
        <div className="page-main">
          <Hero reduceMotion={reduceMotion} />

          <PortfolioSection
            number="01"
            label="CURRENTLY"
            className="animate-first-section"
            reduceMotion={reduceMotion}
          >
            <div className="hover-list">
              {currentlyItems.map((item) => (
                <MediaHoverRow key={item.mediaFolder} {...rowProps(item)} />
              ))}
            </div>
          </PortfolioSection>

          <PortfolioSection
            number="02"
            label="RESEARCH"
            reduceMotion={reduceMotion}
          >
            <div className="hover-list">
              {researchItems.map((item) => (
                <MediaHoverRow key={item.mediaFolder} {...rowProps(item)} />
              ))}
            </div>
          </PortfolioSection>

          <PortfolioSection
            number="03"
            label="PROJECTS"
            reduceMotion={reduceMotion}
          >
            <div className="hover-list">
              {projects.map((item) => (
                <MediaHoverRow key={item.mediaFolder} {...rowProps(item)} />
              ))}
            </div>
          </PortfolioSection>

          <PortfolioSection
            number="04"
            label="SELECT AWARDS"
            reduceMotion={reduceMotion}
          >
            <div className="award-list">
              {awards.map((award) => (
                <div key={award.name} className="award-row">
                  {award.href ? (
                    <TextLink
                      href={award.href}
                      external
                      className="award-name"
                    >
                      {award.name}
                    </TextLink>
                  ) : (
                    <span className="award-name">{award.name}</span>
                  )}
                  <span className="award-year">{award.year}</span>
                </div>
              ))}
            </div>
          </PortfolioSection>

          <footer className="site-footer">
            <p className="footer-name">nikhil krishnaswamy</p>
            <nav className="footer-links" aria-label="Footer links">
              <TextLink href="https://github.com/NIkhil-cmd-cmd" external>
                github
              </TextLink>
              <span className="footer-sep" aria-hidden="true">
                ·
              </span>
              <TextLink
                href="https://linkedin.com/in/nikhil-krishnaswamy"
                external
              >
                linkedin
              </TextLink>
              <span className="footer-sep" aria-hidden="true">
                ·
              </span>
              <TextLink href="mailto:krishnaswamynikhil@gmail.com" mailto>
                email
              </TextLink>
            </nav>
          </footer>
        </div>

        <HoverPreviewPanel
          item={previewItem}
          onPointerEnter={cancelHide}
          onPointerLeave={scheduleHide}
        />
      </main>
    </>
  );
}
