import Link from "next/link";
import { formatDate, getEssays } from "@/lib/essays";

export const metadata = {
  title: "essays — Nikhil Krishnaswamy",
  description: "Essays on ai and philosophy.",
};

export default async function Essays() {
  const essays = await getEssays();

  return (
    <main>
      <aside>
        <h1>
          <Link href="/">nikhil krishnaswamy</Link>
        </h1>
        <nav>
          <span className="here">essays</span>
        </nav>
      </aside>

      <div className="col">
        <section className="awards">
          {essays.length === 0 ? (
            <p className="muted">nothing published yet.</p>
          ) : (
            essays.map((essay) => (
              <div key={essay.slug} className="award">
                <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
                <span className="year">{formatDate(essay.date)}</span>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
