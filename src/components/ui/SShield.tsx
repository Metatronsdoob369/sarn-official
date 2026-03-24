/**
 * SShield — SARN S-shield brand mark.
 * Matches the chrome shield in the brand design assets:
 * clean downward-pointing shield, inner bevel, bold geometric S.
 *
 * color defaults to copper (#b86c2a) for on-brand use.
 * Pass color="url(#chrome)" for the chrome/silver variant (nav lockup).
 */

interface SShieldProps {
  size?: string | number;
  color?: string;
  className?: string;
  chrome?: boolean; // silver/chrome gradient variant
}

export default function SShield({
  size = "1em",
  color = "#b86c2a",
  className = "",
  chrome = false,
}: SShieldProps) {
  const id = chrome ? "chrome-grad" : "copper-grad";

  return (
    <svg
      viewBox="0 0 56 66"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
      }}
    >
      <defs>
        {chrome ? (
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#e4e8f0" />
            <stop offset="40%"  stopColor="#b8bdc8" />
            <stop offset="100%" stopColor="#6e7380" />
          </linearGradient>
        ) : (
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#d4914a" />
            <stop offset="50%"  stopColor="#b86c2a" />
            <stop offset="100%" stopColor="#8a4e1c" />
          </linearGradient>
        )}
      </defs>

      {/* ── Outer shield ───────────────────────────────────────── */}
      {/*
        Shape: flat top, gentle inward taper on sides,
        converges to a soft rounded point at the bottom.
        Matches the design asset: wider at shoulders, clean point.
      */}
      <path
        d="
          M 4,4
          H 52
          C 53.1,4 54,4.9 54,6
          V 36
          C 54,48 28,62 28,62
          C 28,62 2,48 2,36
          V 6
          C 2,4.9 2.9,4 4,4
          Z
        "
        fill="none"
        stroke={chrome ? `url(#${id})` : color}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* ── Inner bevel ────────────────────────────────────────── */}
      <path
        d="
          M 9,9
          H 47
          C 48,9 49,9.8 49,11
          V 35
          C 49,45 28,57 28,57
          C 28,57 7,45 7,35
          V 11
          C 7,9.8 8,9 9,9
          Z
        "
        fill="none"
        stroke={chrome ? `url(#${id})` : color}
        strokeWidth="0.8"
        strokeLinejoin="round"
        opacity="0.4"
      />

      {/* ── S glyph ─────────────────────────────────────────────── */}
      {/*
        Bold geometric S. Two arcs meeting at center.
        Top arc: right → left (concave down)
        Bottom arc: left → right (concave up)
        Stroke-based, round caps, heavy weight.
      */}
      <path
        d="
          M 36,19
          C 36,13  20,13  20,22
          C 20,28  36,28  36,34
          C 36,43  20,43  20,37
        "
        fill="none"
        stroke={chrome ? `url(#${id})` : color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top terminal bar */}
      <line
        x1="22" y1="19" x2="36" y2="19"
        stroke={chrome ? `url(#${id})` : color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Bottom terminal bar */}
      <line
        x1="20" y1="37" x2="34" y2="37"
        stroke={chrome ? `url(#${id})` : color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
