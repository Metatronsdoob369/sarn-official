import Link from "next/link";
import { getPostsByEngine } from "@/lib/content";

export const metadata = {
  title: "Racing — SARN",
  description: "Speed culture intelligence from the TORCS engine.",
};

export default function RacingIndex() {
  const posts = getPostsByEngine("racing");

  return (
    <main className="min-h-screen pt-28 pb-32">
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="h-px w-8" style={{ background: "#b86c2a" }} />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: "#b86c2a" }}>
            TORCS Engine
          </span>
          <span className="font-mono text-[11px]" style={{ color: "#23252e" }}>·</span>
          <span className="font-mono text-[11px] tracking-[0.1em]" style={{ color: "#555a68" }}>
            {posts.length} dispatch{posts.length !== 1 ? "es" : ""}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "#23252e" }}>
              No dispatches yet
            </p>
            <p className="text-sm" style={{ color: "#555a68" }}>
              Dispatches publish after a signal run is approved in the Inngest dashboard.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/racing/${post.slug}`}
                className="group relative flex flex-col p-5 transition-all duration-200"
                style={{
                  background: "#0d0e13",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(184,108,42,0.22)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)")}
              >
                {/* Engine badge + index + date */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span
                    className="font-mono text-[9px] tracking-[0.16em] uppercase px-2 py-0.5"
                    style={{
                      color: "#b86c2a",
                      background: "rgba(184,108,42,0.07)",
                      border: "1px solid rgba(184,108,42,0.16)",
                    }}
                  >
                    {post.engine}
                  </span>
                  {post.sector && (
                    <span
                      className="font-mono text-[9px] tracking-[0.14em] uppercase px-2 py-0.5"
                      style={{ color: "#555a68", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      {post.sector}
                    </span>
                  )}
                  <span className="ml-auto font-mono text-[9px]" style={{ color: "#2e313a" }}>
                    {post.date}
                  </span>
                </div>

                <h2 className="font-hero font-semibold text-[14px] leading-snug mb-2 flex-1" style={{ color: "#6e7380" }}>
                  <span className="group-hover:text-[#b8bdc8] transition-colors duration-200">
                    {post.title}
                  </span>
                </h2>

                <p className="text-[12px] leading-relaxed line-clamp-3 mb-4" style={{ color: "#2e313a" }}>
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div
                  className="flex items-center justify-between mt-auto pt-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                >
                  {post.tags?.length > 0 && (
                    <span className="font-mono text-[9px]" style={{ color: "#23252e" }}>
                      {post.tags.slice(0, 2).join(" · ")}
                    </span>
                  )}
                  <span
                    className="font-mono text-[9px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-auto"
                    style={{ color: "#b86c2a" }}
                  >
                    READ →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
