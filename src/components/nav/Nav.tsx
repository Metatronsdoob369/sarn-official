"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import SShield from "@/components/ui/SShield";

const links = [
  { label: "RACING",  href: "/racing" },
  { label: "CIRCUIT", href: "/circuit" },
  { label: "SIGNAL",  href: "/signal" },
  { label: "NETWORK", href: "/network" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-[rgba(255,255,255,0.06)] bg-[rgba(7,8,11,0.88)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* S-shield + SARN+ wordmark lockup */}
        <Link href="/" className="group flex items-center gap-3 select-none">
          <SShield size="32px" chrome />
          <div className="flex flex-col leading-none">
            <span
              className="font-hero font-bold tracking-[0.12em] text-[18px]"
              style={{
                background: "linear-gradient(160deg, #e4e8f0 0%, #b8bdc8 45%, #6e7380 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SARN<span style={{ WebkitTextFillColor: "#b86c2a", color: "#b86c2a" }}>+</span>
            </span>
            <span className="font-mono text-[7px] tracking-[0.2em] uppercase mt-[3px]" style={{ color: "#2e3040" }}>
              Sovereign Autonomous Racing Network
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-mono text-[11px] tracking-[0.14em] text-[#555a68] hover:text-[#b8bdc8] transition-colors duration-200 uppercase"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 border border-[rgba(255,255,255,0.06)] rounded-sm px-3 py-1.5 bg-[#0d0e13]">
            <span className="relative flex h-[6px] w-[6px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-40" />
              <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-[#4ade80]" />
            </span>
            <span className="font-mono text-[9px] tracking-[0.16em] text-[#555a68] uppercase">TORCS LIVE</span>
          </div>
        </div>

        {/* Mobile */}
        <button
          className="lg:hidden text-[#555a68] hover:text-[#b8bdc8] transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[rgba(255,255,255,0.06)] bg-[#07080b] lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-5 px-6 py-6">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-[11px] tracking-[0.14em] text-[#555a68] hover:text-[#b8bdc8] transition-colors uppercase"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
