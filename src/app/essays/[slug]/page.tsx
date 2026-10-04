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
  return { title: essay ? `${essay.title} — Nikhil Krishnaswamy` : "Writing" };
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
      <header>
        <h1>
          <Link href="/essays" className="back">
            Writing
          </Link>
        </h1>
        <h2>{essay.title}</h2>
        <span className="meta" style={{ textAlign: "left" }}>
          {formatDate(essay.date)}
        </span>
      </header>

      <article dangerouslySetInnerHTML={{ __html: essay.html }} />
    </main>
  );
}
