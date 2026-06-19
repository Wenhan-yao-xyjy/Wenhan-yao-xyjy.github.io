import { useState, useEffect, useMemo } from "react";

interface StarFieldProps {
  loaded:    boolean;
  hoveredNav: string | null;
  sparse?:   boolean;   // true = fewer stars for inner pages
}

function sr(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

type StarType = "dot" | "small" | "medium" | "bright" | "large";

interface Star {
  id: number;
  x: number;
  y: number;
  type: StarType;
  size: number;
  opacity: number;
  flickerDur:   number;
  flickerDelay: number;
  hasGhost: boolean;
  ghostDx:  number;
  ghostDy:  number;
}

// Text-zone boundaries in SVG viewBox (0 0 1440 900) space.
// The homepage title lives roughly here — stars must not land inside.
const TEXT_X1 = 120, TEXT_X2 = 740;
const TEXT_Y1 = 270, TEXT_Y2 = 660;

function inTextZone(x: number, y: number): boolean {
  return x > TEXT_X1 && x < TEXT_X2 && y > TEXT_Y1 && y < TEXT_Y2;
}

function makeStars(count: number): Star[] {
  const types: StarType[] = [
    "dot", "dot", "small", "small", "small",
    "medium", "medium", "bright", "large",
  ];

  return Array.from({ length: count }, (_, i) => {
    const typeIdx = Math.floor(sr(i * 13 + 6) * types.length);
    const zone    = sr(i * 13 + 11);   // which zone this star belongs to

    let x: number, y: number;

    if (zone < 0.48) {
      // Right-side cluster — near the moon
      x = 810 + sr(i * 13 + 1) * 630;
      y = sr(i * 13 + 2) * 900;
    } else if (zone < 0.66) {
      // Top band (full width, above text area)
      x = sr(i * 13 + 1) * 1440;
      y = sr(i * 13 + 2) * 240;
    } else if (zone < 0.84) {
      // Bottom band (full width, below text area)
      x = sr(i * 13 + 1) * 1440;
      y = 680 + sr(i * 13 + 2) * 220;
    } else {
      // Far-left strip
      x = sr(i * 13 + 1) * 100;
      y = sr(i * 13 + 2) * 900;
    }

    // Safety: if a star still lands in the text zone, push it right
    if (inTextZone(x, y)) {
      x = 820 + sr(i * 13 + 12) * 620;
      y = 30  + sr(i * 13 + 13) * 840;
    }

    return {
      id: i,
      x,
      y,
      type:         types[typeIdx],
      size:         0.65 + sr(i * 13 + 3) * 0.70,
      opacity:      0.18 + sr(i * 13 + 4) * 0.44,
      flickerDur:   4    + sr(i * 13 + 5) * 11,
      flickerDelay: sr(i * 13 + 7) * 7,
      hasGhost:     sr(i * 13 + 8) < 0.15,
      ghostDx:      (sr(i * 13 + 9)  - 0.5) * 9,
      ghostDy:      (sr(i * 13 + 10) - 0.5) * 5,
    };
  });
}

function rayPath(cx: number, cy: number, r: number): string {
  const c30 = 0.866, s30 = 0.5;
  return [
    `M${cx},${cy - r} L${cx},${cy + r}`,
    `M${cx - r * c30},${cy - r * s30} L${cx + r * c30},${cy + r * s30}`,
    `M${cx + r * c30},${cy - r * s30} L${cx - r * c30},${cy + r * s30}`,
  ].join(" ");
}

function StarShape({ star, ghost = false }: { star: Star; ghost?: boolean }) {
  const s  = star.size * (ghost ? 0.65 : 1);
  const op = ghost ? star.opacity * 0.28 : star.opacity;
  const cx = star.x + (ghost ? star.ghostDx : 0);
  const cy = star.y + (ghost ? star.ghostDy : 0);
  const ink = `rgba(30, 20, 12, ${op})`;

  if (star.type === "dot") return <circle cx={cx} cy={cy} r={s} fill={ink} />;

  if (star.type === "small") {
    const r = s * 3.2;
    return (
      <g>
        <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={ink} strokeWidth="0.65" />
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={ink} strokeWidth="0.65" />
      </g>
    );
  }

  if (star.type === "medium") {
    return <path d={rayPath(cx, cy, s * 4.6)} stroke={ink} strokeWidth="0.72" fill="none" />;
  }

  if (star.type === "bright") {
    const r = s * 5.0;
    return (
      <g>
        <path d={rayPath(cx, cy, r)} stroke={ink} strokeWidth="0.82" fill="none" />
        <circle cx={cx} cy={cy} r={s * 1.1} fill={ink} />
      </g>
    );
  }

  const rO = s * 6.2;
  return (
    <g>
      <circle cx={cx} cy={cy} r={rO} fill="none" stroke={ink} strokeWidth="0.72" />
      <path d={rayPath(cx, cy, rO * 1.28)} stroke={ink} strokeWidth="0.62" fill="none" />
      <circle cx={cx} cy={cy} r={s * 1.2} fill={ink} />
    </g>
  );
}

export function StarField({ loaded, hoveredNav, sparse = false }: StarFieldProps) {
  const [visible, setVisible] = useState(false);
  const count  = sparse ? 32 : 58;
  const stars  = useMemo(() => makeStars(count), [count]);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setVisible(true), 350);
    return () => clearTimeout(t);
  }, [loaded]);

  const worksHov = hoveredNav === "WORKS";

  return (
    <>
      <style>{`
        @keyframes gentleFlicker {
          0%, 100% { opacity: 1; }
          38%       { opacity: 0.48; }
          68%       { opacity: 0.84; }
        }
      `}</style>

      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0, width: "100%", height: "100%",
          zIndex: 1, pointerEvents: "none",
          opacity:    visible ? 1 : 0,
          transition: "opacity 3s ease",
        }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {stars.map((star) => {
          const baseOp = Math.min(0.80, star.opacity * (worksHov ? 1.5 : 1));
          return (
            <g
              key={star.id}
              opacity={baseOp}
              style={{
                animation: `gentleFlicker ${star.flickerDur}s ease-in-out ${star.flickerDelay}s infinite`,
              }}
            >
              {star.hasGhost && <StarShape star={star} ghost />}
              <StarShape star={star} />
            </g>
          );
        })}

        {/* Faint dashed chart lines — old cartography */}
        {[192, 388, 576, 748].map((y) => (
          <line
            key={`hl-${y}`}
            x1={0} y1={y} x2={1440} y2={y}
            stroke="rgba(40,30,18,0.020)"
            strokeWidth="0.5"
            strokeDasharray="4 44"
          />
        ))}
      </svg>
    </>
  );
}
