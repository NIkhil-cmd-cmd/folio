import { Links } from "@/components/Links";
import { Rich } from "@/components/Rich";
import { Shader } from "@/components/Shader";
import { bio, sections } from "@/lib/content";

export default function Home() {
  let n = 0;

  return (
    <main className="board">
      <Shader />
      <div className="top rise" style={{ "--i": 0 } as React.CSSProperties}>
        <h1>{bio.name}</h1>
        <nav>
          <Links />
        </nav>
      </div>

      <div className="cols">
        {sections.map((s) => (
          <div key={s.label} className="stack">
            <span className="label">{s.label}</span>
            {s.lines.map((line, i) => (
              <p
                key={i}
                className="rise"
                style={{ "--i": ++n } as React.CSSProperties}
              >
                <Rich text={line} />
              </p>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
