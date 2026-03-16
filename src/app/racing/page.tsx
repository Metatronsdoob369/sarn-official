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
      <div className="mx-auto max-w-2xl px-6">

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

        {/* Post list */}
        <div className="flex flex-col gap-[1px]">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/racing/${post.slug}`}
              className="post-card group block rounded-sm px-6 py-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm" style={{ color: "#b86c2a", background: "rgba(184,108,42,0.08)", border: "1px solid rgba(184,108,42,0.2)" }}>
                  {post.engine}
                </span>
                <span className="font-mono text-[10px]" style={{ color: "#23252e" }}>
                  {String(i + 1).padStart(3, "0")}
                </span>
                <span className="font-mono text-[10px]" style={{ color: "#555a68" }}>
                  {post.date}
                </span>
              </div>

              <h2 className="font-hero font-semibold text-lg leading-snug mb-2" style={{ color: "#b8bdc8" }}>
                {post.title}
              </h2>

              <p className="text-[14px] leading-relaxed line-clamp-2" style={{ color: "#555a68" }}>
                {post.excerpt}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="post-card-read font-mono text-[10px] tracking-widest">
                  READ →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
