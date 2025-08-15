import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | AI Music Generator",
    default: "AI Music Generator",
  },
  description:
    "An AI-powered music generator that creates unique tracks based on user input.",
  keywords: "AI, music generation, creative tools",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
