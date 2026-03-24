import { Metadata } from "next";
import SignalClient from "./SignalClient";

export const metadata: Metadata = {
  title: "Signal — SARN",
  description: "Live intelligence feed from the TORCS engine.",
};

// Revalidate every 5 minutes — signal runs on a 6h cadence but approval can happen anytime
export const revalidate = 300;

async function getLatestSignal() {
  try {
    const res = await fetch(
      `${process.env.NODEBASE_URL ?? "https://nodebase-tawny.vercel.app"}/api/signal/latest`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.runs?.[0] ?? null;
  } catch {
    return null;
  }
}

export default async function SignalPage() {
  const signal = await getLatestSignal();
  return <SignalClient signal={signal} />;
}
