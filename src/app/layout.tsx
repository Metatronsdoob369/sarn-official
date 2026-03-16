import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav/Nav";

const heroFont = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-hero",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "SARN — Sovereign Autonomous Racing Network",
  description: "Speed culture intelligence. Racing, technology, and the future of motion.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${heroFont.variable} ${bodyFont.variable} antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
