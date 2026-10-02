const GITHUB = "https://github.com/NIkhil-cmd-cmd";
const LINKEDIN = "https://linkedin.com/in/nikhil-krishnaswamy";
const EMAIL = "nikhilk0@stanford.edu";

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

function Item({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="item">
      <span className="num">{n}</span>
      <p>{children}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <aside>
        <h1>nikhil krishnaswamy</h1>
        <nav>
          <a href={`mailto:${EMAIL}`}>email</a>
          <Out href={GITHUB}>github</Out>
          <Out href={LINKEDIN}>linkedin</Out>
          <Out href="/resume.pdf">resume</Out>
        </nav>
      </aside>

      <div className="col">
        <section>
          <Item n="01">
            i build memory for agents. right now that is{" "}
            <Out href="https://memorable.sh">memorable</Out>, procedural memory:
            an agent records how a task was actually done, then replays that
            procedure next time instead of relearning it.
          </Item>
          <Item n="02">cs + ee @ stanford</Item>
          <Item n="03">
            before agents i built brain hardware. eeg wearables, fnirs, seizure
            prediction. same instinct, different substrate.
          </Item>
        </section>

        <section>
          <Item n="01">
            building <Out href="https://memorable.sh">memorable</Out>. a cli, a
            dashboard and an mcp server, used by agents on real repos.
          </Item>
          <Item n="02">
            engineered agentic ios phone control @{" "}
            <Out href="https://www.theagi.company/">AGI Inc</Out>.
          </Item>
          <Item n="03">
            wrote ios modules for{" "}
            <Out href="https://github.com/StanfordSpezi">spezi</Out>, stanford&apos;s
            open-source digital health platform.
          </Item>
        </section>

        <section>
          <Item n="01">
            researched seizure suppression with neural mass modeling. presented @{" "}
            <Out href="/ieee-bsn-2025.pdf">IEEE BSN 2025</Out>.
          </Item>
          <Item n="02">
            prototyped a portable fnirs device for mdd patients @ stanford{" "}
            <Out href="https://simr.stanford.edu/">simr</Out>.
          </Item>
          <Item n="03">
            ran a clinical study on how tdcs brain stimulation affects speech
            formulation.
          </Item>
        </section>

        <section>
          <Item n="01">
            <Out href="https://www.epilepsyassociation.com/epilepsyu/cupertino-high-students-create-award-winning-seizure-monitoring-device">
              neuropod
            </Out>{" "}
            — wearable eeg and app that predicts seizures up to 30 minutes early.
          </Item>
          <Item n="02">
            <Out href="https://www.tokns.space/">tokn$</Out> — a market for unused
            api credits. buy, sell and trade quota across providers.
          </Item>
          <Item n="03">
            <Out href="https://hivemind-agi.vercel.app/">openhive</Out> — shared
            memory layer for multi-agent systems.
          </Item>
        </section>

        <section className="awards">
          <div className="award">
            <Out href="https://www.bryancameroneducationfoundation.org/scholars/finalists">
              bryan cameron impact scholar finalist
            </Out>
            <span className="year">2026</span>
          </div>
          <div className="award">
            <Out href="https://www.coca-colascholarsfoundation.org/2026-semifinalists/">
              coca-cola scholar semifinalist
            </Out>
            <span className="year">2026</span>
          </div>
          <div className="award">
            <span>best poster @ mit urtc</span>
            <span className="year">2025</span>
          </div>
          <div className="award">
            <span>state winner, samsung solve for tomorrow</span>
            <span className="year">2025</span>
          </div>
          <div className="award">
            <Out href="https://conrad.spacecenter.org/2025-winners/">
              pete conrad challenge power pitch award
            </Out>
            <span className="year">2025</span>
          </div>
        </section>
      </div>
    </main>
  );
}
