/** Every string the site renders. [label](url) becomes a link. */

export const bio = {
  name: "nikhil krishnaswamy",
  email: "nikhilk0@stanford.edu",
  github: "https://github.com/NIkhil-cmd-cmd",
  linkedin: "https://linkedin.com/in/nikhil-krishnaswamy",
  resume: "/resume.pdf",
};

const stanford = "cs + neuroscience @ stanford.";
const memorable =
  "co-founder @ [memorable](https://memorable.sh), YC S27. [linkedin](https://www.linkedin.com/feed/update/urn:li:ugcPost:7506406323404840960/), [x](https://x.com/advaiytsane/status/2100668011673731441).";
const agi = "mts @ [AGI inc](https://www.theagi.company/).";
const ta = "ta @ [simr](https://simr.stanford.edu/) '25 and '26.";
const interns = "intern @ solo technologies and [nextsense](https://nextsense.io/).";
const research =
  "research @ [spezi lab](https://github.com/StanfordSpezi) and the peter tass lab. epilepsy virtual brain modeling, [presented at IEEE BSN](/ieee-bsn-2025.pdf).";

const awards = [
  "[conrad challenge](https://conrad.spacecenter.org/2025-winners/) winner.",
  "samsung solve for tomorrow winner.",
  "[bryan cameron](https://www.bryancameroneducationfoundation.org/scholars/finalists) finalist.",
  "[coca-cola](https://www.coca-colascholarsfoundation.org/2026-semifinalists/) semifinalist.",
];

export const sections: { label: string; lines: string[] }[] = [
  { label: "currently", lines: [stanford, memorable, research] },
  { label: "previously", lines: [agi, ta, interns] },
  { label: "awards", lines: awards },
];
