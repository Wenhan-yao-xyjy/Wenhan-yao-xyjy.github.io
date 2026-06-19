import { PageLayout } from "../components/PageLayout";

// ── Libra constellation — pixel-traced from reference image ──────────────────
//
// Exact shape from the reference photograph (portrait ~1:1 aspect ratio):
//
//            β (130, 22)          ← top-centre, BRIGHTEST
//           / \
//          /   \
//    γ(38,66)  θ(212,64)
//       |            \
//    α(25,128)     σ(232,104)     ← far-right, turns left here
//                        \
//                     ι(172,148)  ← left-and-down from σ
//                        |
//                     δ(172,200)  ← straight down
//
// Lines:  β→γ  ·  γ→α  ·  β→θ  ·  θ→σ  ·  σ→ι  ·  ι→δ
// Two arms from β: left arm (β→γ→α), right staircase arm (β→θ→σ→ι→δ).
// viewBox 260×240 preserves the nearly-square constellation aspect ratio.
function LibraConstellation() {
  const c = (op: number) => `rgba(68, 50, 34, ${op})`;

  // [cx, cy, fontSize, char, halo, haloR]
  type S = [number, number, number, string, boolean, number];
  const stars: S[] = [
    [130,  22, 13,   "*", true,  5.4], // β — topmost, brightest
    [ 38,  66,  9.5, "*", true,  3.6], // γ — upper-left arm
    [ 25, 128,  9,   "*", true,  3.3], // α — lower-left
    [212,  64,  9.5, "*", true,  3.5], // θ — upper-right arm
    [232, 104,  8.5, "*", true,  3.1], // σ — far-right (turns the staircase)
    [172, 148,  8,   "+", false, 0  ], // ι — lower-centre
    [172, 200,  7.5, "+", false, 0  ], // δ — bottom
  ];

  // Background scatter — distributed naturally around the field
  const dust: [number, number, number][] = [
    [ 12,  14, 0.65], [ 60,  10, 0.55], [100,   8, 0.50],
    [178,  10, 0.55], [230,  28, 0.60], [254,  54, 0.55],
    [256,  90, 0.50], [246, 136, 0.55], [210, 178, 0.50],
    [138, 186, 0.55], [ 72, 178, 0.50], [ 14, 160, 0.55],
    [  8,  88, 0.60], [ 50, 108, 0.45], [100,  50, 0.45],
    [160,  82, 0.45], [140, 120, 0.42],
  ];

  return (
    <svg
      width={260}
      height={240}
      viewBox="0 0 260 240"
      style={{ overflow: "visible", display: "block" }}
      aria-hidden="true"
    >
      {/* Dust field */}
      {dust.map(([cx, cy, r], i) => (
        <circle key={`d${i}`} cx={cx} cy={cy} r={r} fill={c(0.20)} />
      ))}

      {/* ── Constellation lines ── */}
      {/* Left arm: β → γ */}
      <line x1={130} y1={ 22} x2={ 38} y2={ 66} stroke={c(0.28)} strokeWidth="0.72" />
      {/* Left arm: γ → α */}
      <line x1={ 38} y1={ 66} x2={ 25} y2={128} stroke={c(0.26)} strokeWidth="0.68" />
      {/* Right arm: β → θ */}
      <line x1={130} y1={ 22} x2={212} y2={ 64} stroke={c(0.28)} strokeWidth="0.72" />
      {/* Right arm: θ → σ  (continues down-right) */}
      <line x1={212} y1={ 64} x2={232} y2={104} stroke={c(0.26)} strokeWidth="0.68" />
      {/* Right arm: σ → ι  (turns left-and-down) */}
      <line x1={232} y1={104} x2={172} y2={148} stroke={c(0.26)} strokeWidth="0.66" />
      {/* Right arm: ι → δ  (straight down) */}
      <line x1={172} y1={148} x2={172} y2={200} stroke={c(0.24)} strokeWidth="0.62" />

      {/* ── Stars ── */}
      {stars.map(([cx, cy, sz, ch, halo, hr], i) => (
        <g key={`s${i}`}>
          {i === 0 && (
            <circle cx={cx} cy={cy} r={hr + 3.5}
              fill="none" stroke={c(0.10)} strokeWidth="0.55" />
          )}
          {halo && (
            <circle cx={cx} cy={cy} r={hr}
              fill="none" stroke={c(0.22)} strokeWidth="0.58" />
          )}
          <circle cx={cx} cy={cy} r={i === 0 ? 1.8 : 1.0}
            fill={c(i === 0 ? 0.68 : 0.50)} />
          <text
            x={cx} y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Courier Prime', Courier, monospace"
            fontSize={sz}
            fill={c(i === 0 ? 0.70 : 0.48)}
          >{ch}</text>
        </g>
      ))}

      {/* Faint midpoint dots along each line segment */}
      {[
        [ 84,  44], [ 32,  97],        // left arm midpoints
        [171,  43], [222,  84], [202, 126], [172, 174], // right arm midpoints
      ].map(([x, y], i) => (
        <circle key={`m${i}`} cx={x} cy={y} r={0.55} fill={c(0.16)} />
      ))}
    </svg>
  );
}

export function ContactPage() {
  return (
    <PageLayout currentPage="/contact">
      <div
        style={{
          paddingTop: "44px",
          paddingBottom: "100px",
          display: "grid",
          // Desktop: text column capped at 560px, constellation gets 300px
          // Mobile: collapses to single column via pl-two-col
          gridTemplateColumns: "minmax(300px, 560px) 300px",
          gap: "56px",
          alignItems: "start",
        }}
        className="pl-two-col"
      >
        {/* ── Left: contact info ── */}
        <div>
          <p style={{
            fontFamily: "'Courier Prime', Courier, monospace",
            fontSize: "8.5px", letterSpacing: "0.22em", color: "#a09080",
            margin: "0 0 10px 0",
          }}>
            Contact
          </p>
          <div style={{
            width: "56px", height: "1px",
            background: "rgba(160,130,110,0.28)", marginBottom: "40px",
          }} />

          <p style={{
            fontFamily: "'Special Elite', 'Courier Prime', Courier, monospace",
            fontSize: "22px", lineHeight: "1.55", color: "#2a2218",
            letterSpacing: "0.01em", margin: "0 0 48px 0",
          }}>
            Thank you for finding your way here.
          </p>

          <div style={{
            display: "flex", flexDirection: "column",
            gap: "20px", marginBottom: "48px",
          }}>
            {[
              { key: "EMAIL",     val: "xyjy99@gmail.com" },
              { key: "INSTAGRAM", val: "@wenhanyao"        },
            ].map(({ key, val }) => (
              <div key={key} style={{ display: "flex", gap: "24px", alignItems: "baseline" }}>
                <span style={{
                  fontFamily: "'Courier Prime', Courier, monospace",
                  fontSize: "9px", letterSpacing: "0.16em",
                  color: "#a09080", minWidth: "80px", userSelect: "none",
                }}>
                  {key}
                </span>
                <span style={{
                  fontFamily: "'Courier Prime', Courier, monospace",
                  fontSize: "14px", letterSpacing: "0.03em", color: "#3a3028",
                }}>
                  {val}
                </span>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: "'Courier Prime', Courier, monospace",
            fontStyle: "italic", fontSize: "13px",
            lineHeight: "1.92", color: "#7a6e62",
            margin: "0 0 48px 0", maxWidth: "440px",
          }}>
            Open for collaborations, conversations, and quiet correspondence.
            I&rsquo;m likely somewhere looking at old photographs,
            but I will write back.
          </p>

          <div style={{
            width: "80px", height: "1px",
            background: "rgba(160,130,110,0.20)",
          }} />
          <p style={{
            fontFamily: "'Courier Prime', Courier, monospace",
            fontSize: "8px", letterSpacing: "0.12em",
            color: "rgba(140,110,90,0.34)",
            margin: "10px 0 0 0", userSelect: "none",
          }}>
            WENHAN YAO · VISUAL ARCHIVE · 2024
          </p>
        </div>

        {/* ── Right: constellation (desktop only sizing) ── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "38px",
        }}>
          <LibraConstellation />
        </div>
      </div>
    </PageLayout>
  );
}
