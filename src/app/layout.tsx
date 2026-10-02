import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nikhil Krishnaswamy",
  description: "Building Memorable, procedural memory for agents. CS + EE @ Stanford.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mono.className}>
      <body>{children}</body>
    </html>
  );
}
