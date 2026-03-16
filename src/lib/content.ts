import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface Post {
  slug: string;
  sector: string;
  title: string;
  date: string;
  engine: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export function getPostsByEngine(engine: string): Post[] {
  const dir = path.join(CONTENT_ROOT, engine.toLowerCase());
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      const lines = content.split("\n").filter((l) => l.trim());
      const excerpt = lines.slice(0, 2).join(" ").slice(0, 180) + "…";
      const date = data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date ?? "");
      return { slug, ...data, date, excerpt, content } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(engine: string, slug: string): Post | null {
  const filePath = path.join(CONTENT_ROOT, engine.toLowerCase(), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const date = data.date instanceof Date
    ? data.date.toISOString().slice(0, 10)
    : String(data.date ?? "");
  return { slug, ...data, date, content } as Post;
}
