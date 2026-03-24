import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Network — SARN",
  description: "The SARN intelligence network.",
};

export default function NetworkPage() {
  return (
    <main className="min-h-screen pt-28 pb-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex items-center gap-3 mb-12">
          <span className="h-px w-8" style={{ background: "#b86c2a" }} />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "#b86c2a" }}>
            Network
          </span>
        </div>
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: "#23252e" }}>
          Sector routing — coming online
        </p>
      </div>
    </main>
  );
}
