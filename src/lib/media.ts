/** Base path under /public/media — drop files into each folder (see folder README). */

export const MEDIA = {
  resume: "/resume.pdf",
  profile: "/media/profile/profile.png",
  placeholder: "/media/placeholder.svg",
  projects: {
    solo: "/media/projects/solo",
    vinyl: "/media/projects/vinyl",
    neuropod: "/media/projects/neuropod",
    tokns: "/media/projects/tokns",
    atlas: "/media/projects/atlas",
    "share-on": "/media/projects/share-on",
    openhive: "/media/projects/openhive",
  },
  research: {
    "neural-mass": "/media/research/neural-mass",
    fnirs: "/media/research/fnirs",
    tdcs: "/media/research/tdcs",
  },
  currently: {
    spezi: "/media/currently/spezi",
    agi: "/media/currently/agi",
    simr: "/media/currently/simr",
  },
  press: {
    epilepsy: "/media/press/epilepsy",
    kqed: "/media/press/kqed",
    github: "/media/press/github",
    linkedin: "/media/press/linkedin",
  },
  papers: {
    ieeeEmbc: "/media/ieee-embc-manuscript.pdf",
  },
} as const;

/** Preferred cover image; add cover.jpg or cover.png to the folder. */
export function coverImage(folder: string): string {
  return `${folder}/cover.jpg`;
}

/** Cover still candidates (checked in order). */
export function coverImageCandidates(folder: string): string[] {
  const slug = folder.split("/").pop() ?? "";
  return [
    `${folder}/cover.jpg`,
    `${folder}/cover.png`,
    `${folder}/${slug}.png`,
    `${folder}/${slug}.jpg`,
  ];
}

/** Default hover video path; also try previewVideoCandidates(). */
export function previewVideo(folder: string): string {
  return `${folder}/preview.mp4`;
}

/** Candidate screen-recording paths (checked in order). */
export function previewVideoCandidates(folder: string): string[] {
  const slug = folder.split("/").pop() ?? "";
  const slugFlat = slug.replace(/-/g, "");
  return [
    `${folder}/preview.mp4`,
    `${folder}/preview.MP4`,
    `${folder}/preview.mov`,
    `${folder}/${slug}.mp4`,
    `${folder}/${slug}.MP4`,
    `${folder}/${slug}.mov`,
    `${folder}/${slugFlat}.mp4`,
    `${folder}/${slugFlat}.MP4`,
    `${folder}/${slugFlat}.mov`,
    `${folder}/${slug}musicplayer.mov`,
    `${folder}/${slug}musicplayer.MOV`,
    `${folder}/${slugFlat}musicplayer.mov`,
    `${folder}/${slugFlat}musicplayer.MOV`,
  ];
}

export async function findFirstExistingUrl(
  urls: string[],
): Promise<string | null> {
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok) return url;
    } catch {
      /* try next */
    }
  }
  return null;
}
