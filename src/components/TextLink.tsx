import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  mailto?: boolean;
};

function LinkIcon({ external }: { external?: boolean }) {
  if (external) {
    return (
      <svg
        className="link-icon"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    );
  }
  return (
    <svg
      className="link-icon"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function TextLink({
  href,
  children,
  external = false,
  className = "",
  mailto = false,
}: TextLinkProps) {
  const isExternal =
    external || (!mailto && href.startsWith("http"));

  return (
    <a
      href={href}
      className={`text-link${isExternal ? " text-link-external" : ""} ${className}`.trim()}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <span className="text-link-label">{children}</span>
      <LinkIcon external={isExternal} />
    </a>
  );
}
