"use client";

import { useEffect, useState } from "react";
import { useScramble } from "use-scramble";
import { SCRAMBLE_CONFIG } from "@/lib/scramble-config";

export type Project = {
  index: string;
  title: string;
  href?: string;
  image: string;
  description: string;
};

type ProjectRowProps = {
  project: Project;
  reduceMotion?: boolean;
};

export function ProjectRow({ project, reduceMotion = false }: ProjectRowProps) {
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { ref, replay } = useScramble({
    ...SCRAMBLE_CONFIG,
    text: project.title,
    playOnMount: false,
    speed: reduceMotion ? 0 : SCRAMBLE_CONFIG.speed,
  });

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 640px)").matches);
  }, []);

  const handleRowEnter = () => {
    if (!isMobile) setActive(true);
    if (!reduceMotion) replay();
  };

  const handleRowLeave = () => {
    if (!isMobile) setActive(false);
  };

  const handleRowClick = () => {
    if (isMobile) {
      setActive((v) => !v);
      if (!reduceMotion) replay();
    }
  };

  const titleInner = (
    <span ref={ref} className="project-title-text">
      {reduceMotion ? project.title : null}
    </span>
  );

  return (
    <article
      className={`project-row${active ? " active" : ""}`}
      onMouseEnter={handleRowEnter}
      onMouseLeave={handleRowLeave}
      onClick={handleRowClick}
    >
      <span className="item-index">{project.index}</span>
      <div>
        <h3 className="project-title">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} (opens in new tab)`}
            >
              {titleInner}
              <span className="arrow" aria-hidden="true">
                {" "}
                →
              </span>
            </a>
          ) : (
            titleInner
          )}
        </h3>
        <div className="project-card-wrapper">
          <div className="project-card" role="tooltip">
            <img src={project.image} alt="" />
            <p className="project-card-desc">{project.description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
