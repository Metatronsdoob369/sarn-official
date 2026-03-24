/**
 * SarnPlus — renders "SARN+" with the + always in copper (#b86c2a).
 * The base "SARN" color is configurable — defaults to the hero gradient.
 * Exception: alternate livery wraps may override via the `plusColor` prop.
 */
interface SarnPlusProps {
  className?: string;
  color?: string;       // SARN text color — defaults to inherit
  plusColor?: string;   // + color — copper by default, overridable for alt liveries
  size?: string;        // font-size passthrough
}

export default function SarnPlus({
  className = "",
  color,
  plusColor = "#b86c2a",
  size,
}: SarnPlusProps) {
  return (
    <span
      className={className}
      style={{ fontSize: size, color: color ?? "inherit", fontWeight: "inherit" }}
    >
      SARN<span style={{ color: plusColor }}>+</span>
    </span>
  );
}
