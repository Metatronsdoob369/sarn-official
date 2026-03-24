"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  sector: string;
  summary?: string;
  author?: string;
  publishedAt?: string;
  signalScore: number;
}

interface Source {
  name: string;
  count: number;
}

interface CircuitData {
  articles: Article[];
  total: number;
  sources: Source[];
}

export default function CircuitClient({ initialData }: { initialData: CircuitData }) {
  const [query, setQuery]           = useState("");
  const [activeSource, setActive]   = useState<string | null>(null);

  // Client-side filter over the initial server payload
  const filtered = useMemo(() => {
    let items = initialData.articles;
    if (activeSource) {
      items = items.filter(a => a.source === activeSource);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(a =>
        a.title.toLowerCase().includes(q) ||
        (a.summary ?? "").toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q)
      );
    }
    return items;
  }, [query, activeSource, initialData.articles]);

  const isEmpty = initialData.articles.length === 0;

  return (
    <main className="min-h-screen pt-28 pb-32">
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8" style={{ background: "#b86c2a" }} />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "#b86c2a" }}>
              From The Circuit
            </span>
            {!isEmpty && (
              <>
                <span className="font-mono text-[11px]" style={{ color: "#23252e" }}>·</span>
                <span className="font-mono text-[11px]" style={{ color: "#555a68" }}>
                  {initialData.total} dispatches
                </span>
              </>
            )}
          </div>
          <p className="text-sm max-w-md" style={{ color: "#23252e" }}>
            Intelligence picked up from across the speed culture network. Source credited.
          </p>
        </motion.div>

        {isEmpty ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-8">

            {/* Search + source filters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search the circuit..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full rounded-sm px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "#0d0e13",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#b8bdc8",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.02em",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,108,42,0.4)")}
                  onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px]"
                    style={{ color: "#555a68" }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Source chips */}
              <div className="flex flex-wrap gap-2">
                <SourceChip
                  label="All"
                  active={activeSource === null}
                  onClick={() => setActive(null)}
                />
                {initialData.sources.map(s => (
                  <SourceChip
                    key={s.name}
                    label={s.name}
                    count={s.count}
                    active={activeSource === s.name}
                    onClick={() => setActive(activeSource === s.name ? null : s.name)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Results count */}
            {(query || activeSource) && (
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: "#23252e" }}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </p>
            )}

            {/* Article grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
              {filtered.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#23252e" }}>
                Nothing matching — try adjusting the search
              </p>
            )}

          </div>
        )}
      </div>
    </main>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const domain = (() => {
    try { return new URL(article.url).hostname.replace("www.", ""); }
    catch { return article.url; }
  })();

  const timeAgo = (() => {
    if (!article.publishedAt) return null;
    const diff = Date.now() - new Date(article.publishedAt).getTime();
    const h = Math.floor(diff / 3_600_000);
    if (h < 1)  return "< 1h";
    if (h < 24) return `${h}h`;
    const d = Math.floor(h / 24);
    if (d < 7)  return `${d}d`;
    return `${Math.floor(d / 7)}w`;
  })();

  // Signal score: 0–2 range from GAT, normalize to 0–1 for display
  const scoreNorm = Math.min(1, Math.max(0, article.signalScore / 2));
  const scorePct  = Math.round(scoreNorm * 100);

  const cleanSummary = article.summary
    ? article.summary.split("Article URL:")[0].trim() || article.summary
    : null;

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      className="group relative flex flex-col p-5 transition-all duration-200"
      style={{
        background: "#0d0e13",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(184,108,42,0.22)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)")}
    >
      {/* Top: source + time + sector */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className="font-mono text-[9px] tracking-[0.16em] uppercase px-2 py-0.5"
          style={{
            color: "#b86c2a",
            background: "rgba(184,108,42,0.07)",
            border: "1px solid rgba(184,108,42,0.16)",
          }}
        >
          {article.source}
        </span>
        {article.sector && article.sector !== "racing" && (
          <span
            className="font-mono text-[9px] tracking-[0.14em] uppercase px-2 py-0.5"
            style={{
              color: "#555a68",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {article.sector}
          </span>
        )}
        <span className="ml-auto font-mono text-[9px]" style={{ color: "#2e313a" }}>
          {timeAgo}
        </span>
      </div>

      {/* Title */}
      <h2
        className="font-hero font-semibold text-[14px] leading-snug mb-2 flex-1"
        style={{ color: "#6e7380" }}
      >
        <span className="group-hover:text-[#b8bdc8] transition-colors duration-200">
          {article.title}
        </span>
      </h2>

      {/* Summary */}
      {cleanSummary && (
        <p
          className="text-[12px] leading-relaxed line-clamp-3 mb-4"
          style={{ color: "#2e313a" }}
        >
          {cleanSummary}
        </p>
      )}

      {/* Footer: domain + signal score + read arrow */}
      <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <span className="font-mono text-[9px]" style={{ color: "#23252e" }}>
          {domain}
        </span>

        {/* Signal score bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-[2px]">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="block h-[3px] w-[6px] rounded-full transition-all duration-300"
                style={{
                  background: i < Math.round(scoreNorm * 5)
                    ? "rgba(184,108,42,0.7)"
                    : "rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[8px]" style={{ color: "#23252e" }}>{scorePct}</span>
        </div>

        <span
          className="font-mono text-[9px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: "#b86c2a" }}
        >
          READ →
        </span>
      </div>
    </motion.a>
  );
}

function SourceChip({
  label, count, active, onClick,
}: {
  label: string; count?: number; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm transition-all duration-200"
      style={{
        border: active
          ? "1px solid rgba(184,108,42,0.5)"
          : "1px solid rgba(255,255,255,0.05)",
        background: active ? "rgba(184,108,42,0.08)" : "transparent",
        color: active ? "#b86c2a" : "#555a68",
      }}
    >
      {label}{count !== undefined ? ` · ${count}` : ""}
    </button>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-3"
    >
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "#23252e" }}>
        No dispatches yet
      </p>
      <p className="text-sm" style={{ color: "#555a68" }}>
        The circuit feed populates during signal runs. Fire a signal run from the Inngest dashboard to seed it.
      </p>
    </motion.div>
  );
}
