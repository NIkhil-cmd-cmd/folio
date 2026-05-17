import type { Metadata } from "next";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nikhil Krishnaswamy",
  description:
    "Stanford CS + EE student, researcher, and builder — portfolio of projects, research, and awards.",
  openGraph: {
    title: "Nikhil Krishnaswamy",
    description:
      "Stanford CS + EE student, researcher, and builder.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="cursor-glow" className="hidden" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
