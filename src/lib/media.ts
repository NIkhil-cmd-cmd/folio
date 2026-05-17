/** Base path under /public/media — drop files into each folder (see folder README). */

export const MEDIA = {
  profile: "/media/profile/photo.jpg",
  placeholder: "/media/placeholder.svg",
  projects: {
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
    simr: "/media/currently/simr",
    opentslm: "/media/currently/opentslm",
  },
} as const;

/** Preferred cover image; add cover.jpg or cover.png to the folder. */
export function coverImage(folder: string): string {
  return `${folder}/cover.jpg`;
}

/** Optional hover video; add preview.mp4 to the folder. */
export function previewVideo(folder: string): string {
  return `${folder}/preview.mp4`;
}
