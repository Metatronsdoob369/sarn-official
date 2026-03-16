"use client";

import { motion } from "framer-motion";

const thread = [
  {
    num: "01",
    lines: [
      "The road is being automated away.",
      "Simracing isn't a hobby anymore.",
      "It's where driving goes when it stops being necessary.",
    ],
  },
  {
    num: "02",
    lines: [
      "Right now someone is optimizing their Meta Quest 3 passthrough settings for iRacing pit lane walks.",
      "Nobody told the community to take VR this seriously.",
      "They just did.",
    ],
  },
  {
    num: "03",
    lines: [
      "A guy lost his right arm.",
      "His first post back wasn\u2019t \u201Cshould I quit.\u201D",
      "It was \u201Chow do I adapt my rig.\u201D",
    ],
    signal: "That's not a Reddit post. That's a signal about what speed means to people when you remove every version of it that was handed to them.",
  },
  {
    num: "04",
    lines: [
      "Same week. Other side of the feed.",
      "r/cyberpunk: \u201CThere\u2019s now a website where AI agents hire humans to do tasks.\u201D",
      "Treated as normal Tuesday content.",
      "The line between physical and virtual is moving in both directions simultaneously.",
    ],
  },
  {
    num: "05",
    lines: [
      "Simracing lives exactly at that intersection.",
      "Not a game. Not real driving.",
    ],
    signal: "The thing that remains when everything that wasn't essential gets automated.",
  },
  {
    num: "06",
    lines: [
      "The cars are getting lighter. The rigs are getting more serious. The headsets are getting cheaper. The community is adapting around every constraint.",
      "Speed culture isn't dying with the combustion engine.",
      "It's migrating.",
    ],
  },
  {
    num: "07",
    lines: [
      "We're watching where it migrates.",
      "Every 30 minutes.",
    ],
    closing: true,
    tags: ["#simracing", "#SARN", "#outrun"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function RacingPage() {
  return (
    <main className="min-h-screen pt-28 pb-32">
      <div className="mx-auto max-w-2xl px-6">

        {/* Engine Tag */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-[#ff8c42]" />
          <span className="font-mono text-[11px] tracking-[0.18em] text-[#ff8c42] uppercase">
            TORCS Engine · Active
          </span>
        </motion.div>

        {/* Pulse bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-12 inline-flex items-center gap-3 glass-panel border-illuminated rounded px-4 py-2.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8effa6] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8effa6]" />
          </span>
          <span className="font-mono text-[11px] tracking-widest text-neutral-500">
            LIVE — 14 platforms · 255 signals / 30min
          </span>
        </motion.div>

        {/* Post Meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-6 flex items-center gap-4"
        >
          <span className="font-mono text-[10px] tracking-[0.16em] text-[#ff8c42] border border-[rgba(255,140,66,0.3)] bg-[rgba(255,140,66,0.06)] rounded-sm px-2 py-1">
            SARN
          </span>
          <span className="font-mono text-[11px] text-neutral-600">2026 · MAR 16</span>
          <span className="font-mono text-[11px] text-neutral-600">Sim Racing</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-hero text-3xl md:text-4xl leading-[1.2] tracking-tight text-white mb-14"
        >
          The road is being automated away. Simracing is where driving goes when it stops being necessary.
        </motion.h1>

        {/* Thread */}
        <div className="flex flex-col gap-[2px]">
          {thread.map((card, i) => (
            <motion.div
              key={card.num}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={`group relative glass-panel rounded-md px-7 py-6 transition-all duration-200 hover:border-[rgba(255,255,255,0.1)] ${
                card.closing
                  ? "border border-[rgba(255,140,66,0.35)] bg-gradient-to-br from-[#0a0a0a] to-[rgba(255,140,66,0.04)]"
                  : "border-illuminated"
              }`}
            >
              {/* Left accent bar */}
              <span
                className={`absolute left-0 top-0 bottom-0 w-[2px] rounded-l-md transition-colors duration-200 ${
                  card.closing ? "bg-[#ff8c42]" : "bg-[rgba(255,255,255,0.04)] group-hover:bg-[#ff8c42]"
                }`}
              />

              {/* Card number */}
              <span className="mb-3 block font-mono text-[10px] tracking-[0.12em] text-neutral-700">
                {card.num}
              </span>

              {/* Lines */}
              {card.lines.map((line, j) => (
                <p
                  key={j}
                  className={`mb-2 last:mb-0 leading-[1.75] text-white ${
                    card.closing && j === 0 ? "text-lg font-medium" : "text-[15px]"
                  }`}
                >
                  {line}
                </p>
              ))}

              {/* Signal callout */}
              {card.signal && (
                <p className="mt-4 border-l-2 border-[rgba(255,140,66,0.4)] pl-4 text-[14px] leading-[1.7] text-neutral-400">
                  {card.signal}
                </p>
              )}

              {/* Tags */}
              {card.tags && (
                <div className="mt-5 flex gap-3 flex-wrap">
                  {card.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[11px] text-[#00d4ff] tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer signal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-20 flex items-center gap-4 text-neutral-700"
        >
          <span className="h-px flex-1 bg-[rgba(255,255,255,0.04)]" />
          <span className="font-mono text-[11px] tracking-widest">
            1 HUMAN · 3 SYSTEMS · 1 GRAPH · 2 AIs
          </span>
          <span className="h-px flex-1 bg-[rgba(255,255,255,0.04)]" />
        </motion.div>

      </div>
    </main>
  );
}
