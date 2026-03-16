"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "RACING", href: "/racing" },
  { label: "SIGNAL", href: "/signal" },
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

        {/* Horizontal chrome plaque */}
        <Link href="/" className="group flex items-center gap-4 select-none">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-sm border border-[rgba(255,255,255,0.06)] bg-[#0d0e13] transition-all duration-300 group-hover:border-[rgba(220,225,240,0.18)]">
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#b8bdc8] transition-colors duration-300 group-hover:text-[#e4e8f0]">
              A
            </span>
            <span className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-transparent" />
          </div>

          <div className="flex flex-col leading-none">
            <span
              className="font-hero font-bold tracking-[0.18em] text-[17px] transition-all duration-300"
              style={{
                background: "linear-gradient(160deg, #e4e8f0 0%, #b8bdc8 45%, #6e7380 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SARN
            </span>
            <span className="font-mono text-[7.5px] tracking-[0.22em] text-[#555a68] mt-[3px] uppercase">
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
