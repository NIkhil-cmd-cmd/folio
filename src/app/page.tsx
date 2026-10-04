import Link from "next/link";
import { Rich } from "@/components/Rich";
import { awards, bio, built, paragraphs, work } from "@/lib/content";
import { formatDate, getEssays } from "@/lib/essays";

type Row = { text: string; meta: string };

function Rows({ rows }: { rows: Row[] }) {
  return (
    <div className="rows">
      {rows.map((row) => (
        <div key={row.text} className="row">
          <p>
            <Rich text={row.text} />
          </p>
          {row.meta ? <span className="meta">{row.meta}</span> : null}
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  const essays = await getEssays();

  return (
    <main>
      <header>
        <h1>{bio.name}</h1>
        {paragraphs.map((p) => (
          <p key={p}>
            <Rich text={p} />
          </p>
        ))}
      </header>

      <section>
        <h2>Writing</h2>
        {essays.length === 0 ? (
          <p className="muted">On agents, philosophy and brains. Soon.</p>
        ) : (
          <div className="rows">
            {essays.map((essay) => (
              <div key={essay.slug} className="row">
                <p>
                  <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
                </p>
                <span className="meta">{formatDate(essay.date)}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Work</h2>
        <Rows rows={work} />
      </section>

      <section>
        <h2>Built</h2>
        <Rows rows={built} />
      </section>

      <section>
        <h2>Awards</h2>
        <Rows rows={awards} />
      </section>

      <footer>
        <a href={`mailto:${bio.email}`}>email</a>
        <a href={bio.github} target="_blank" rel="noopener noreferrer">
          github
        </a>
        <a href={bio.linkedin} target="_blank" rel="noopener noreferrer">
          linkedin
        </a>
        <a href={bio.resume} target="_blank" rel="noopener noreferrer">
          cv
        </a>
      </footer>
    </main>
  );
}
