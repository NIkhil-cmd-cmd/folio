"use client";

import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { PortfolioSection } from "./PortfolioSection";
import { ProjectRow } from "./ProjectRow";
import { CursorGlow } from "./CursorGlow";
import { awards, projects } from "@/lib/data";

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
          <Item index="01">
            developing modules for iOS digital health @{" "}
            <a
              href="https://spezi.stanford.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              spezi
            </a>
          </Item>
          <Item index="02">
            teaching SIMR, a BioE program for high schoolers
          </Item>
          <Item index="03">
            building OpenTSLM — integrating time-series language models for
            clinical reasoning over multivariate medical data
          </Item>
        </PortfolioSection>

        <PortfolioSection
          number="02"
          label="RESEARCH"
          reduceMotion={reduceMotion}
        >
          <Item index="01">
            researched seizure suppression using neural mass modeling
            <br />
            presented @ IEEE BSN 2025
          </Item>
          <Item index="02">
            prototyped a portable fNIRS device for MDD patients @ stanford
            SIMR — custom PCB, 78.88mm × 43.26mm, dual wavelength IR
          </Item>
          <Item index="03">
            ran clinical study evaluating the effect of tDCS brain stimulation
            on speech formulation
          </Item>
        </PortfolioSection>

        <PortfolioSection
          number="03"
          label="PROJECTS"
          reduceMotion={reduceMotion}
        >
          <div className="project-list">
            {projects.map((p) => (
              <ProjectRow
                key={p.index}
                project={p}
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
                  <a
                    href={award.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="award-name"
                  >
                    {award.name}
                  </a>
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
            <a
              href="https://github.com/NIkhil-cmd-cmd"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a
              href="https://linkedin.com/in/nikhil-krishnaswamy"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>
            <span className="footer-sep" aria-hidden="true">
              ·
            </span>
            <a href="mailto:krishnaswamynikhil@gmail.com">email</a>
          </nav>
        </footer>
      </main>
    </>
  );
}

function Item({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="item-grid">
      <span className="item-index">{index}</span>
      <div className="item-content">{children}</div>
    </div>
  );
}
