"use client";

import { motion } from "framer-motion";
import SarnCard from "@/components/ui/SarnCard";

interface SignalRun {
  id: string;
  sector: string;
  analysis: string;
  sceneImageUrl?: string;
  itemCount: number;
  nodeCount: number;
  runAt: string;
  status: string;
}

export default function SignalClient({ signal }: { signal: SignalRun | null }) {
  // Parse article lead from analysis (first line after **ARTICLE LEAD:**)
  const articleLead = signal?.analysis
    ?.match(/\*\*ARTICLE LEAD:\*\*\s*([\s\S]*?)(?=\n\n\*\*|\n\*\*|$)/)?.[1]
    ?.trim() ?? null;

  const breakdown = signal?.analysis
    ?.match(/\*\*SIGNAL BREAKDOWN:\*\*([\s\S]*?)(?=\n\n\*\*EDITORIAL|\n\*\*EDITORIAL|$)/)?.[1]
    ?.trim() ?? null;

  const editorial = signal?.analysis
    ?.match(/\*\*EDITORIAL CALL:\*\*([\s\S]*?)$/)?.[1]
    ?.trim() ?? null;

  return (
    <main className="min-h-screen pt-28 pb-32" style={{ position: "relative" }}>
      <div className="mx-auto max-w-3xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="h-px w-8" style={{ background: "#b86c2a" }} />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "#b86c2a" }}>
            Live Signal
          </span>
          <span className="font-mono text-[11px]" style={{ color: "#23252e" }}>·</span>
          <span className="font-mono text-[11px] tracking-[0.1em]" style={{ color: "#555a68" }}>
            TORCS Engine
          </span>
          {signal && (
            <>
              <span className="font-mono text-[11px]" style={{ color: "#23252e" }}>·</span>
              <span className="relative flex h-[5px] w-[5px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40" style={{ background: "#4ade80" }} />
                <span className="relative inline-flex h-[5px] w-[5px] rounded-full" style={{ background: "#4ade80" }} />
              </span>
            </>
          )}
        </motion.div>

        {!signal ? (
          <NoSignal />
        ) : (
          <div className="flex flex-col gap-12">

            {/* Scene image */}
            {signal.sceneImageUrl && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full overflow-hidden rounded-sm"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={signal.sceneImageUrl}
                  alt="SARN signal scene"
                  className="w-full object-cover"
                  style={{ maxHeight: "420px" }}
                />
              </motion.div>
            )}

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="flex items-center gap-6 flex-wrap"
            >
              <SarnCard label="SARN+" value={signal.sector.toUpperCase()} />

              <div className="flex flex-col gap-3">
                <Stat label="Articles scanned" value={String(signal.itemCount)} />
                <Stat label="Graph nodes"       value={String(signal.nodeCount)} />
                <Stat label="Status"            value={signal.status} highlight={signal.status === "approved"} />
                <Stat label="Run at"            value={new Date(signal.runAt).toLocaleString()} />
              </div>
            </motion.div>

            {/* Article lead */}
            {articleLead && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <SectionLabel>Article Lead</SectionLabel>
                <p className="font-hero font-semibold text-xl leading-snug mt-3" style={{ color: "#b8bdc8" }}>
                  {articleLead}
                </p>
              </motion.div>
            )}

            {/* Signal breakdown */}
            {breakdown && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <SectionLabel>Signal Breakdown</SectionLabel>
                <BreakdownBody text={breakdown} />
              </motion.div>
            )}

            {/* Editorial call */}
            {editorial && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="rounded-sm p-5"
                style={{ border: "1px solid rgba(184,108,42,0.15)", background: "rgba(184,108,42,0.04)" }}
              >
                <SectionLabel>Editorial Call</SectionLabel>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#8a8f9e" }}>
                  {editorial}
                </p>
              </motion.div>
            )}

          </div>
        )}
      </div>
    </main>
  );
}

function NoSignal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-start gap-4"
    >
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "#23252e" }}>
        No approved signal on record yet
      </p>
      <p className="text-sm" style={{ color: "#555a68" }}>
        The TORCS engine is running. Approve a signal run in the Inngest dashboard to publish it here.
      </p>
    </motion.div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[10px] tracking-[0.15em] uppercase w-32" style={{ color: "#23252e" }}>
        {label}
      </span>
      <span
        className="font-mono text-[11px] tracking-[0.1em]"
        style={{ color: highlight ? "#4ade80" : "#555a68" }}
      >
        {value}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-px w-5" style={{ background: "#b86c2a" }} />
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#b86c2a" }}>
        {children}
      </span>
    </div>
  );
}

function BreakdownBody({ text }: { text: string }) {
  // Render markdown-lite: bold headers (** **), bullet lists, plain paragraphs
  const lines = text.split("\n");

  return (
    <div className="mt-3 flex flex-col gap-2">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // Bold header: **text** or **text:**
        if (/^\*\*[^*]+\*\*:?$/.test(trimmed)) {
          const label = trimmed.replace(/^\*\*|\*\*:?$/g, "");
          return (
            <p key={i} className="font-mono text-[10px] tracking-[0.15em] uppercase mt-4 first:mt-0" style={{ color: "#b86c2a" }}>
              {label}
            </p>
          );
        }

        // Bullet: - text or • text
        if (/^[-•]\s/.test(trimmed)) {
          return (
            <div key={i} className="flex gap-2">
              <span className="font-mono text-[11px] mt-[2px]" style={{ color: "#b86c2a" }}>—</span>
              <p className="text-[13px] leading-relaxed" style={{ color: "#555a68" }}>
                {trimmed.replace(/^[-•]\s/, "")}
              </p>
            </div>
          );
        }

        // Numbered list: 1. text
        if (/^\d+\.\s/.test(trimmed)) {
          const num  = trimmed.match(/^(\d+)\./)?.[1];
          const body = trimmed.replace(/^\d+\.\s/, "");
          return (
            <div key={i} className="flex gap-3">
              <span className="font-mono text-[10px] mt-[3px] w-4 shrink-0" style={{ color: "#b86c2a" }}>{num}.</span>
              <p className="text-[13px] leading-relaxed" style={{ color: "#555a68" }}>{body}</p>
            </div>
          );
        }

        // Plain paragraph
        return (
          <p key={i} className="text-[13px] leading-relaxed" style={{ color: "#555a68" }}>
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
