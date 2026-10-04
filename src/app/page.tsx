import { Rich } from "@/components/Rich";
import { bio, groups } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <aside>
        <h1>{bio.name}</h1>
        <nav>
          <a href={`mailto:${bio.email}`}>email</a>
          <a href={bio.github} target="_blank" rel="noopener noreferrer">
            github
          </a>
          <a href={bio.linkedin} target="_blank" rel="noopener noreferrer">
            linkedin
          </a>
          <a href={bio.resume} target="_blank" rel="noopener noreferrer">
            cv
          </a>
        </nav>
      </aside>

      <div className="col">
        {groups.map((group, g) => (
          <section key={g}>
            {group.map((line, i) => (
              <div key={i} className="item">
                <span className="num">{`0${i + 1}`}</span>
                <p>
                  <Rich text={line} />
                </p>
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
