import { Arrow } from "@/components/Rich";
import { Scramble } from "@/components/Scramble";
import { bio } from "@/lib/content";

const links = [
  ["github", bio.github],
  ["linkedin", bio.linkedin],
  ["cv", bio.resume],
];

export function Links() {
  return (
    <>
      {links.map(([label, href]) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer">
          <Scramble text={label} hover />
          <Arrow />
        </a>
      ))}
    </>
  );
}
