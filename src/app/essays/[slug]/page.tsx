import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getEssays } from "@/lib/essays";

export async function generateStaticParams() {
  const essays = await getEssays();
  return essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = (await getEssays()).find((e) => e.slug === slug);
  return { title: essay ? `${essay.title} — Nikhil Krishnaswamy` : "essay" };
}

export default async function Essay({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = (await getEssays()).find((e) => e.slug === slug);
  if (!essay) notFound();

  return (
    <main>
      <aside>
        <h1>
          <Link href="/">nikhil krishnaswamy</Link>
        </h1>
        <nav>
          <Link href="/essays">essays</Link>
        </nav>
      </aside>

      <article className="col prose">
        <header>
          <h2>{essay.title}</h2>
          <p className="year">{formatDate(essay.date)}</p>
        </header>
        <div dangerouslySetInnerHTML={{ __html: essay.html }} />
      </article>
    </main>
  );
}
