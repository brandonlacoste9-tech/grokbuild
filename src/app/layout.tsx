import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistDisplay = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Grok Collective",
  description:
    "Premium multi-agent studio. Meet Grok, Benjamin, Harper, and Lucas — then brief the Collective.",
  openGraph: {
    title: "The Grok Collective",
    description:
      "Four minds. One mission. Plan → Parallel Subagents → Review & Iterate → Ship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistDisplay.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-text font-sans">
        {children}
      </body>
    </html>
  );
}
