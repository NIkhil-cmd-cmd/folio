const GITHUB = "https://github.com/NIkhil-cmd-cmd";
const LINKEDIN = "https://linkedin.com/in/nikhil-krishnaswamy";
const EMAIL = "nikhilk0@stanford.edu";

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
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
            i build memory for agents.{" "}
            <Out href="https://memorable.sh">memorable</Out> records how a task
            was actually done, then replays that procedure next time instead of
            relearning it.
          </Item>
          <Item n="02">cs + ee @ stanford</Item>
        </section>

        <section>
          <Item n="01">
            engineered agentic ios phone control @{" "}
            <Out href="https://www.theagi.company/">AGI Inc</Out>.
          </Item>
          <Item n="02">
            wrote ios modules for{" "}
            <Out href="https://github.com/StanfordSpezi">spezi</Out>,
            stanford&apos;s open-source digital health platform.
          </Item>
          <Item n="03">
            researched seizure suppression with neural mass modeling. presented @{" "}
            <Out href="/ieee-bsn-2025.pdf">IEEE BSN 2025</Out>.
          </Item>
        </section>

        <section>
          <Item n="01">
            <Out href="https://www.epilepsyassociation.com/epilepsyu/cupertino-high-students-create-award-winning-seizure-monitoring-device">
              neuropod
            </Out>{" "}
            — wearable eeg that predicts seizures up to 30 minutes early.
          </Item>
          <Item n="02">
            <Out href="https://www.tokns.space/">tokn$</Out> — a market for unused
            api credits.
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
        </section>
      </div>
    </main>
  );
}
