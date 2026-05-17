import type { Project } from "@/components/ProjectRow";

export const projects: Project[] = [
  {
    index: "01",
    title: "tokn$",
    href: "https://www.tokns.space/",
    image: "https://picsum.photos/seed/tokns/400/250",
    description:
      "the airbnb for api credits — buy, sell, and trade unused API quota across providers",
  },
  {
    index: "02",
    title: "atlas",
    image: "https://picsum.photos/seed/atlas/400/250",
    description:
      "agentic AI for navigation and trip planning — natural language to full itineraries",
  },
  {
    index: "03",
    title: "share-on",
    image: "https://picsum.photos/seed/shareon/400/250",
    description:
      "productivity and mental health app for teens — shared focus sessions and mood tracking",
  },
  {
    index: "04",
    title: "openhive",
    href: "https://hivemind-agi.vercel.app/",
    image: "https://picsum.photos/seed/openhive/400/250",
    description:
      "a shared memory layer for multi-agent systems — persistent context across agent sessions",
  },
];

export type Award = {
  name: string;
  year: string;
  href?: string;
};

export const awards: Award[] = [
  {
    name: "Bryan Cameron Impact Scholar Finalist",
    year: "2026",
    href: "https://www.bryancameroneducationfoundation.org/scholars/finalists#:~:text=Kessenger%0ABeatrice%20Kim-,Nikhil%20Krishnaswamy,-Ally%20Krysalka%0AKris",
  },
  {
    name: "Coca-Cola Scholar Semifinalist",
    year: "2026",
    href: "https://www.coca-colascholarsfoundation.org/2026-semifinalists/#:~:text=Nikhil,CA",
  },
  { name: "Presented @ IEEE BSN", year: "2025" },
  { name: "Best Poster @ MIT URTC", year: "2025" },
  {
    name: "1st Place — School Photographers of America",
    year: "2023",
    href: "https://www.schoolphotographersofamerica.com/post/winners-of-the-fall-2023-sony-spoa-student-photo-contest-announced",
  },
  { name: "State Winner — Samsung Solve for Tomorrow", year: "2025" },
  { name: "Pete Conrad Challenge Power Pitch Award", year: "2025" },
  { name: "2nd Place @ CSEF", year: "2025" },
];
