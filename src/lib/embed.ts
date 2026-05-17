/** Hosts that block cross-origin iframe embedding (X-Frame-Options / CSP). */
const IFRAME_BLOCKED_HOSTS = [
  "github.com",
  "linkedin.com",
  "www.linkedin.com",
  "kqed.org",
  "www.kqed.org",
  "epilepsyassociation.com",
  "www.epilepsyassociation.com",
  "stanford.edu",
  "google.com",
  "facebook.com",
  "twitter.com",
  "x.com",
  "conrad.spacecenter.org",
  "www.conrad.spacecenter.org",
];

export function isEmbeddableUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return !IFRAME_BLOCKED_HOSTS.some(
      (blocked) => host === blocked || host.endsWith(`.${blocked}`),
    );
  } catch {
    return false;
  }
}

export function siteHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function faviconUrl(url: string, size = 128): string {
  const host = siteHostname(url);
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=${size}`;
}
