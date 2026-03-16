import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getPostsByEngine } from "@/lib/content";

export async function generateStaticParams() {
  const posts = getPostsByEngine("racing");
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost("racing", params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — SARN`,
    description: post.excerpt,
  };
}

export default function RacingPost({ params }: { params: { slug: string } }) {
  const post = getPost("racing", params.slug);
  if (!post) notFound();

  const sections = post.content
    .split(/\n---\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen pt-28 pb-32">
      <div className="mx-auto max-w-2xl px-6">

        {/* Back */}
        <Link
          href="/racing"
          className="back-link inline-flex items-center gap-2 font-mono text-[10px] tracking-widest mb-12"
        >
          ← RACING INDEX
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm"
              style={{ color: "#b86c2a", background: "rgba(184,108,42,0.08)", border: "1px solid rgba(184,108,42,0.2)" }}
            >
              {post.engine}
            </span>
            <span className="font-mono text-[10px]" style={{ color: "#555a68" }}>{post.date}</span>
            {post.sector && (
              <span className="font-mono text-[10px]" style={{ color: "#2e313a" }}>{post.sector}</span>
            )}
          </div>

          <h1
            className="font-hero font-semibold text-2xl sm:text-3xl leading-tight mb-6"
            style={{ color: "#e4e8f0" }}
          >
            {post.title}
          </h1>

          <div className="h-px w-12" style={{ background: "#b86c2a" }} />
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm"
                style={{ color: "#555a68", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <article className="prose-sarn">
          {sections.map((section, i) => (
            <Section key={i} text={section} />
          ))}
        </article>

        {/* Footer */}
        <div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <span className="h-px w-8" style={{ background: "#b86c2a" }} />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: "#2e313a" }}>
              SARN · {post.engine} Engine
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}

function Section({ text }: { text: string }) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="font-hero font-semibold text-lg mt-10 mb-4"
          style={{ color: "#b8bdc8" }}
        >
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={i}
          className="font-hero font-semibold text-xl mt-10 mb-4"
          style={{ color: "#e4e8f0" }}
        >
          {line.replace("# ", "")}
        </h1>
      );
    } else if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      elements.push(
        <p
          key={i}
          className="font-mono text-[11px] leading-relaxed mt-6"
          style={{ color: "#2e313a" }}
        >
          {line.replace(/^\*|\*$/g, "")}
        </p>
      );
    } else if (line.trim()) {
      elements.push(
        <p
          key={i}
          className="text-[15px] leading-[1.8] mb-5"
          style={{ color: "#8a8f9e" }}
        >
          {line}
        </p>
      );
    }
  }

  return <>{elements}</>;
}
