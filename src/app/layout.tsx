import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--mono" });
const serif = Newsreader({ subsets: ["latin"], variable: "--serif" });
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--display",
});

export const metadata: Metadata = {
  title: "Nikhil Krishnaswamy",
  description: "Building Memorable, procedural memory for agents. CS + EE @ Stanford.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${serif.variable} ${display.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
