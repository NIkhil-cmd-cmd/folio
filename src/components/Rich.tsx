import { Scramble } from "@/components/Scramble";

// the arrow stays glued to the last word, as on the reference
export function Arrow() {
  return (
    <span className="nb">
      &nbsp;
      <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </span>
  );
}

export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!link) return part ? <Scramble key={i} text={part} /> : null;
        const external = link[2].startsWith("http");
        return (
          <a
            key={i}
            href={link[2]}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <Scramble text={link[1]} hover />
            <Arrow />
          </a>
        );
      })}
    </>
  );
}
