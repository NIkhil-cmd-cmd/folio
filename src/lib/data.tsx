import type { HoverRowItem } from "@/components/MediaHoverRow";
import { TextLink } from "@/components/TextLink";
import { MEDIA } from "@/lib/media";

export const currentlyItems: HoverRowItem[] = [
  {
    id: "currently-spezi",
    index: "01",
    variant: "entry",
    href: "https://github.com/StanfordSpezi",
    previewUrl: "https://spezi.stanford.edu/",
    mediaFolder: MEDIA.currently.spezi,
    description:
      "Building iOS modules for Stanford's open-source digital health platform.",
    body: (
      <>
        developing modules for iOS digital health @{" "}
        <TextLink href="https://github.com/StanfordSpezi" external>
          spezi
        </TextLink>
      </>
    ),
  },
  {
    id: "currently-simr",
    index: "02",
    variant: "entry",
    href: "https://simr.stanford.edu/",
    previewUrl: "https://simr.stanford.edu/",
    mediaFolder: MEDIA.currently.simr,
    description:
      "Teaching and mentoring high schoolers in Stanford's BioE summer design program.",
    body: (
      <>
        teaching{" "}
        <TextLink href="https://simr.stanford.edu/" external>
          SIMR
        </TextLink>
        , a BioE program for high schoolers
      </>
    ),
  },
];

export const researchItems: HoverRowItem[] = [
  {
    id: "research-neural-mass",
    index: "01",
    variant: "entry",
    mediaFolder: MEDIA.research["neural-mass"],
    previewPdf: MEDIA.papers.ieeeEmbc,
    description:
      "Neural mass modeling for seizure suppression — presented at IEEE BSN 2025.",
    body: (
      <>
        researched seizure suppression using neural mass modeling
        <br />
        presented @ IEEE BSN 2025
      </>
    ),
  },
  {
    id: "research-fnirs",
    index: "02",
    variant: "entry",
    href: "https://simr.stanford.edu/",
    previewUrl: "https://simr.stanford.edu/",
    mediaFolder: MEDIA.research.fnirs,
    description:
      "Portable fNIRS device for MDD patients — custom PCB at 78.88mm × 43.26mm, dual-wavelength IR.",
    body: (
      <>
        prototyped a portable fNIRS device for MDD patients @ stanford{" "}
        <TextLink href="https://simr.stanford.edu/" external>
          SIMR
        </TextLink>{" "}
        — custom PCB, 78.88mm × 43.26mm, dual wavelength IR
      </>
    ),
  },
  {
    id: "research-tdcs",
    index: "03",
    variant: "entry",
    mediaFolder: MEDIA.research.tdcs,
    description:
      "Clinical study on tDCS brain stimulation and speech formulation.",
    body: (
      <>
        ran clinical study evaluating the effect of tDCS brain stimulation on
        speech formulation
      </>
    ),
  },
];

export const projects: HoverRowItem[] = [
  {
    index: "01",
    variant: "project",
    title: "solo",
    mediaFolder: MEDIA.projects.solo,
    previewDevice: "iphone",
    scrambleTitle: true,
    description:
      "on-device iOS app built while interning at Solo Technologies — local-first workflows without the cloud",
  },
  {
    index: "02",
    variant: "project",
    title: "vinyl",
    mediaFolder: MEDIA.projects.vinyl,
    previewDevice: "mac",
    scrambleTitle: true,
    description:
      "vinyl-inspired music player for Mac — spin records, scrub grooves, and browse albums like a physical collection",
  },
  {
    index: "03",
    variant: "project",
    title: "neuropod",
    href: "https://www.epilepsyassociation.com/epilepsyu/cupertino-high-students-create-award-winning-seizure-monitoring-device",
    mediaFolder: MEDIA.projects.neuropod,
    previewDevice: "iphone",
    scrambleTitle: true,
    description:
      "wearable EEG device and companion app that records brain activity and predicts seizures up to 30 minutes early",
  },
  {
    index: "04",
    variant: "project",
    title: "tokn$",
    href: "https://www.tokns.space/",
    previewUrl: "https://www.tokns.space/",
    mediaFolder: MEDIA.projects.tokns,
    scrambleTitle: true,
    description:
      "the airbnb for api credits — buy, sell, and trade unused API quota across providers",
  },
  {
    index: "05",
    variant: "project",
    title: "atlas",
    mediaFolder: MEDIA.projects.atlas,
    previewDevice: "iphone",
    scrambleTitle: true,
    description:
      "agentic AI for navigation and trip planning — natural language to full itineraries",
  },
  {
    index: "06",
    variant: "project",
    title: "share-on",
    mediaFolder: MEDIA.projects["share-on"],
    previewDevice: "iphone",
    scrambleTitle: true,
    description:
      "productivity and mental health app for teens — shared focus sessions and mood tracking",
  },
  {
    index: "07",
    variant: "project",
    title: "openhive",
    href: "https://hivemind-agi.vercel.app/",
    previewUrl: "https://hivemind-agi.vercel.app/",
    mediaFolder: MEDIA.projects.openhive,
    scrambleTitle: true,
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
  {
    name: "Presented @ IEEE BSN",
    year: "2025",
    href: MEDIA.papers.ieeeEmbc,
  },
  { name: "Best Poster @ MIT URTC", year: "2025" },
  {
    name: "1st Place — School Photographers of America",
    year: "2023",
    href: "https://www.schoolphotographersofamerica.com/post/winners-of-the-fall-2023-sony-spoa-student-photo-contest-announced",
  },
  { name: "State Winner — Samsung Solve for Tomorrow", year: "2025" },
  {
    name: "Pete Conrad Challenge Power Pitch Award",
    year: "2025",
    href: "https://conrad.spacecenter.org/2025-winners/",
  },
  { name: "2nd Place @ CSEF", year: "2025" },
];
