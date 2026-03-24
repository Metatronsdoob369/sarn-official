import { Metadata } from "next";
import CircuitClient from "./CircuitClient";

export const metadata: Metadata = {
  title: "From The Circuit — SARN",
  description: "Intelligence picked up from across the speed culture network.",
};

export const revalidate = 600; // 10 minutes

async function getCircuitData(q?: string, source?: string) {
  try {
    const params = new URLSearchParams({ limit: "48" });
    if (q)      params.set("q", q);
    if (source) params.set("source", source);

    const res = await fetch(
      `${process.env.NODEBASE_URL ?? "https://nodebase-tawny.vercel.app"}/api/circuit?${params}`,
      { next: { revalidate: 600 } }
    );
    if (!res.ok) return { articles: [], total: 0, sources: [] };
    return res.json();
  } catch {
    return { articles: [], total: 0, sources: [] };
  }
}

export default async function CircuitPage() {
  const data = await getCircuitData();
  return <CircuitClient initialData={data} />;
}
