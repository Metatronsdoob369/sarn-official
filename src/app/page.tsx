"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import SShield from "@/components/ui/SShield";

// CarBackground is WebGL — must be client-only, no SSR
const CarBackground = dynamic(() => import("@/components/ui/CarBackground"), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ position: "relative" }}>
      <CarBackground />
      <section className="flex-1 flex flex-col justify-center px-6 pt-32 pb-24 max-w-5xl mx-auto w-full" style={{ position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="h-px w-10" style={{ background: "#b86c2a" }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#b86c2a" }}>
            Torcs Engine · Active · 255 signals / 30min
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-hero font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-8"
          style={{
            background: "linear-gradient(160deg, #e4e8f0 0%, #b8bdc8 50%, #6e7380 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          The <SShield size="0.78em" />&thinsp;ignal<br />
          Before The<br />
          Podium.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg max-w-md mb-12 leading-relaxed"
          style={{ color: "#555a68" }}
        >
          Sovereign Autonomous Racing Network. Intelligence infrastructure for the future of motion culture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="flex items-center gap-5"
        >
          <Link
            href="/racing"
            className="group flex items-center gap-3 rounded-sm px-5 py-3 transition-all duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#0d0e13" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(220,225,240,0.18)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200" style={{ color: "#b8bdc8" }}>
              Enter Racing
            </span>
            <span className="text-sm transition-colors duration-200" style={{ color: "#555a68" }}>→</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="relative flex h-[6px] w-[6px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40" style={{ background: "#4ade80" }} />
              <span className="relative inline-flex h-[6px] w-[6px] rounded-full" style={{ background: "#4ade80" }} />
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#555a68" }}>Live</span>
          </div>
        </motion.div>

      </section>

      <div
        className="px-6 py-5 max-w-5xl mx-auto w-full flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", position: "relative", zIndex: 1 }}
      >
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: "#23252e" }}>
          1 Human · 3 Systems · 1 Graph · 2 AIs
        </span>
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: "#23252e" }}>
          SARN © 2026
        </span>
      </div>
    </main>
  );
}
