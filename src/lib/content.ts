/** Every string the site renders. [label](url) becomes a link. */

export const bio = {
  name: "Nikhil Krishnaswamy",
  email: "nikhilk0@stanford.edu",
  github: "https://github.com/NIkhil-cmd-cmd",
  linkedin: "https://linkedin.com/in/nikhil-krishnaswamy",
  resume: "/resume.pdf",
};

export const paragraphs = [
  "I'm at Stanford studying CS and neuroscience, and I co-founded [Memorable](https://memorable.sh) (YC S27). It started at a hackathon. Memorable gives agents procedural memory, modeled on how a brain turns a repeated action into a habit: a run that worked becomes a workflow the agent follows next time, instead of working the task out from scratch again.",
  "Most of what I build comes back to graphs. Everyone is deep in transformers right now, and the representations that worked for decades got left behind. At [AGI Inc.](https://www.theagi.company/) I turned a phone's accessibility tree into a graph and agents ran 60% faster. At Memorable, a memory is a path found by searching over tool calls, not a paragraph a model has to reread. I'm mostly self taught, so I'm taking CS224W to learn the formal version.",
  "Before agents I worked on brains. My sister has epilepsy, so I spent high school in Peter Tass's lab modeling seizure-suppression stimulation with The Virtual Brain, and ended up the only high schooler presenting at IEEE BSN. After that I built a portable fNIRS device for depression at [SIMR](https://simr.stanford.edu/) and a wearable EEG. I don't think neuroscience has had its GPT moment yet, and I want to help build it.",
  "Lately I've been reading philosophy. Deciding what an agent should remember, and which of those memories it should trust, is the same question I have about people: why do we hold one belief over another? And if an agent's next move is a function of what it remembers, how much of it is a choice? Same question for neurons. I'm going to start writing about that here.",
];

export const work = [
  {
    text: "[Memorable](https://memorable.sh) — co-founder. YC S27, backed by Afore, TQ and a16z. 500+ users, and teams at OpenHome, AGI Inc. and Browser Use run on it.",
    meta: "2026—now",
  },
  {
    text: "[AGI Inc.](https://www.theagi.company/) — member of technical staff. Built an iOS MCP server in Swift that lets any agent read the screen and tap, type and navigate, so someone with limited mobility can run their phone hands-free.",
    meta: "2026",
  },
  {
    text: "[Spezi Lab](https://github.com/StanfordSpezi), Stanford Biodesign Digital Health — built the OpenTSLM iOS app, plus HealthKit, Charts and Epilog modules that plot health data live and log seizures. Presenting our multiagent clinical decision-support work at COLM.",
    meta: "2024—now",
  },
  {
    text: "Peter Tass Lab, Stanford — modeled seizure-suppression stimulation parameters and built the clinical interface. Published a comparison of supervised methods for EEG seizure detection; [presented at IEEE BSN](/ieee-bsn-2025.pdf).",
    meta: "2023—now",
  },
  {
    text: "SIMR, Stanford — designed a single-channel portable fNIRS device on a custom flexible PCB, 740/850 nm LEDs, under 100 g and under $50.",
    meta: "2025",
  },
];

export const built = [
  {
    text: "[Neuropod](https://www.epilepsyassociation.com/epilepsyu/cupertino-high-students-create-award-winning-seizure-monitoring-device) — wearable EEG and app that warns about a seizure up to 30 minutes early.",
    meta: "",
  },
  {
    text: "Share-On — app I co-founded in high school for teen focus and mood tracking. 7,000+ users.",
    meta: "",
  },
  {
    text: "Atlas — iOS app that turns a sentence about a trip into the actual itinerary.",
    meta: "",
  },
  {
    text: "[tokn$](https://www.tokns.space/) — a market for unused API credits.",
    meta: "",
  },
];

export const awards = [
  {
    text: "1st place, AGI House x DeepMind. Three AGI House wins total.",
    meta: "2026",
  },
  {
    text: "[Bryan Cameron Impact Scholar finalist](https://www.bryancameroneducationfoundation.org/scholars/finalists)",
    meta: "2026",
  },
  {
    text: "[Coca-Cola Scholar semifinalist](https://www.coca-colascholarsfoundation.org/2026-semifinalists/)",
    meta: "2026",
  },
  {
    text: "Best poster, IEEE MIT undergraduate research conference",
    meta: "2025",
  },
  {
    text: "[Pete Conrad Scholar](https://conrad.spacecenter.org/2025-winners/), Power Pitch award",
    meta: "2025",
  },
];
