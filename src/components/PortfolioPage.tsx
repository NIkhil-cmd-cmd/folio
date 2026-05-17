"use client";

import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { PortfolioSection } from "./PortfolioSection";
import { MediaHoverRow } from "./MediaHoverRow";
import { CursorGlow } from "./CursorGlow";
import { TextLink } from "./TextLink";
import { awards, currentlyItems, projects, researchItems } from "@/lib/data";

export function PortfolioPage() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <>
      <CursorGlow />
      <Header />
      <main className="page-container">
        <Hero reduceMotion={reduceMotion} />

        <PortfolioSection
          number="01"
          label="CURRENTLY"
          className="animate-first-section"
          reduceMotion={reduceMotion}
        >
          <div className="hover-list">
            {currentlyItems.map((item) => (
              <MediaHoverRow
                key={item.index}
                item={item}
                reduceMotion={reduceMotion}
              />
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
              <MediaHoverRow
                key={item.index}
                item={item}
                reduceMotion={reduceMotion}
              />
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
              <MediaHoverRow
                key={item.index}
                item={item}
                reduceMotion={reduceMotion}
              />
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
      </main>
    </>
  );
}
