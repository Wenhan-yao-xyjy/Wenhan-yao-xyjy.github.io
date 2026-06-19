import { useState, useEffect, useMemo } from "react";

interface AsciiMoonProps {
  loaded: boolean;
  hoveredNav: string | null;
}

function sr(n: number): number {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// ── Grid constants ─────────────────────────────────────────────────────────────
// Courier Prime 11px: charW ≈ 6.6px, lineH (×1.4) ≈ 15.4px
// DX_CORR = charW / lineH ≈ 0.43  (circles appear circular in pixels)
const COLS     = 88;
const ROWS     = 40;
const CX       = COLS / 2;   // 44
const CY       = ROWS / 2;   // 20
const R        = 13.0;        // radius in row-units → ~200px visual radius
const DX_CORR  = 0.43;
const CHAR_W   = 6.6;
const LINE_H   = 15.4;

const POOL = "#*+-.:/(\\)01";
const DUST = ".,+*:.";

// ── Thin-rim density curve ─────────────────────────────────────────────────────
// The ASCII forms a delicate, fading rim only.
// Center (ef < 0.72) is completely empty.
// The visible band lives at ef 0.85–1.00.
// A very sparse outer dust trail (ef 1.00–1.20).
function charProb(ef: number): number {
  if (ef < 0.72) return 0;        // empty centre
  if (ef < 0.82) return 0.04;     // the faintest whisper
  if (ef < 0.90) return 0.18;     // building toward the surface
  if (ef < 0.96) return 0.46;     // the main delicate rim
  if (ef < 1.00) return 0.58;     // surface edge — densest
  if (ef < 1.12) return 0.13;     // outer faint scatter
  if (ef < 1.24) return 0.03;     // dust
  return 0;
}

// Opacity — deliberately delicate so chars feel like a watercolour wash
function charOpacity(ef: number, seed: number): number {
  const jitter = sr(seed + 50) * 0.10;
  if (ef < 0.82) return 0.07 + jitter;
  if (ef < 0.90) return 0.14 + jitter;
  if (ef < 1.00) return 0.26 + jitter;  // max 0.36 — never opaque
  if (ef < 1.12) return 0.09 + jitter;
  return 0.03 + jitter * 0.4;
}

// ── Build grids once at module load ────────────────────────────────────────────
const MOON_GRID: string[][] = Array.from({ length: ROWS }, () =>
  Array<string>(COLS).fill(" ")
);
const EF_GRID: number[][] = Array.from({ length: ROWS }, () =>
  Array<number>(COLS).fill(0)
);

(() => {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const dx   = (col - CX) * DX_CORR;
      const dy   = row - CY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ef   = dist / R;
      const seed = row * COLS + col;
      EF_GRID[row][col] = ef;
      const prob = charProb(ef);
      if (prob > 0 && sr(seed) < prob) {
        const pool = ef >= 1.0 ? DUST : POOL;
        MOON_GRID[row][col] = pool[Math.floor(sr(seed + 77) * pool.length)];
      }
    }
  }
})();

const MOON_ART = MOON_GRID.map((r) => r.join("")).join("\n");

// ── Per-character animation data ───────────────────────────────────────────────
interface CharInfo { delay: number; opacity: number; }

const ROW_LEN = COLS + 1;
const CHAR_INFO: CharInfo[] = MOON_ART.split("").map((ch, flatIdx) => {
  if (ch === "\n") return { delay: 0, opacity: 0 };
  const row = Math.floor(flatIdx / ROW_LEN);
  const col = flatIdx % ROW_LEN;
  const ef  = EF_GRID[row]?.[col] ?? 0;
  const idx = row * COLS + col;
  return {
    delay:   sr(idx) * 2800,
    opacity: ch.trim() ? charOpacity(ef, idx) : 0,
  };
});

// ── Component ──────────────────────────────────────────────────────────────────
export function AsciiMoon({ loaded, hoveredNav }: AsciiMoonProps) {
  const [glowVisible, setGlowVisible] = useState(false);
  const [charsOn,     setCharsOn]     = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const t1 = setTimeout(() => setGlowVisible(true), 400);
    const t2 = setTimeout(() => setCharsOn(true),     1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [loaded]);

  const isAboutHov  = hoveredNav === "ABOUT ME";
  const glowOpacity = glowVisible ? (isAboutHov ? 0.52 : 0.36) : 0;

  const chars = useMemo(() => MOON_ART.split(""), []);

  return (
    <div
      style={{
        position: "relative",
        width:  `${COLS * CHAR_W}px`,   // ~581px
        height: `${ROWS * LINE_H}px`,   // ~616px
      }}
    >
      {/* ── Dusty pink glow ── */}
      <div
        style={{
          position:     "absolute",
          left:         "50%",
          top:          "50%",
          transform:    "translate(-50%, -50%)",
          width:        "500px",
          height:       "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,148,148,0.76) 0%, rgba(214,140,138,0.40) 34%, rgba(208,132,130,0.10) 58%, transparent 74%)",
          filter:    "blur(30px)",
          opacity:   glowOpacity,
          transition:"opacity 2s ease",
          pointerEvents: "none",
        }}
      />

      {/* ── ASCII rim characters ── */}
      <pre
        style={{
          position:   "relative",
          zIndex:     1,
          fontFamily: "'Courier Prime', Courier, monospace",
          fontSize:   "11px",
          lineHeight: "1.4",
          margin:     0,
          padding:    0,
          background: "transparent",
          border:     "none",
          userSelect: "none",
          whiteSpace: "pre",
        }}
      >
        {chars.map((char, i) => {
          if (char === "\n") return <br key={i} />;
          const info    = CHAR_INFO[i];
          const isSpace = char === " ";
          return (
            <span
              key={i}
              style={{
                color:      `rgba(58, 38, 32, ${info.opacity})`,
                opacity:    charsOn && !isSpace ? 1 : 0,
                transition: isSpace
                  ? undefined
                  : `opacity 1.0s ease ${info.delay}ms`,
              }}
            >
              {char}
            </span>
          );
        })}
      </pre>

      {/* ── Coordinate annotation ── */}
      <div
        style={{
          position:      "absolute",
          bottom:        "-22px",
          left:          "50%",
          transform:     "translateX(-50%)",
          fontFamily:    "'Courier Prime', Courier, monospace",
          fontSize:      "8px",
          letterSpacing: "0.1em",
          color:         "rgba(160,130,118,0.48)",
          whiteSpace:    "nowrap",
          opacity:       charsOn ? 1 : 0,
          transition:    "opacity 1s ease 3.5s",
          userSelect:    "none",
        }}
      >
        14h 29m · +02° 10′
      </div>
    </div>
  );
}
