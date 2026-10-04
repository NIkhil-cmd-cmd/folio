import Link from "next/link";
import { formatDate, getEssays } from "@/lib/essays";

export const metadata = {
  title: "Writing — Nikhil Krishnaswamy",
  description: "Essays on agents, philosophy and brains.",
};

export default async function Essays() {
  const essays = await getEssays();

  return (
    <main>
      <header>
        <h1>
          <Link href="/" className="back">
            Nikhil Krishnaswamy
          </Link>
        </h1>
        <h2>Writing</h2>
      </header>

      <section>
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
    </main>
  );
}
