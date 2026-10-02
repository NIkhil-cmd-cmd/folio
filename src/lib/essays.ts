import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content/essays");

export type Essay = {
  slug: string;
  title: string;
  date: string;
  html: string;
};

function parse(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return null;
  const body = raw.slice(match[0].length);
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body };
}

export async function getEssays(): Promise<Essay[]> {
  let files: string[] = [];
  try {
    files = (await readdir(DIR)).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const essays = await Promise.all(
    files.map(async (file) => {
      const parsed = parse(await readFile(path.join(DIR, file), "utf8"));
      if (!parsed) return null;
      const { meta, body } = parsed;
      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: meta.title ?? slug,
        date: meta.date ?? "",
        html: await marked.parse(body),
      };
    })
  );

  return essays
    .filter((e): e is Essay => e !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toLowerCase();
}
