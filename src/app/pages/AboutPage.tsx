import portraitImg from "@/imports/Screenshot_2026-06-18_at_16.42.21.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { PageLayout } from "../components/PageLayout";

function MoonPhases() {
  return (
    <div style={{ display:"flex", gap:"14px", alignItems:"center", marginTop:"36px" }}>
      {["○","◔","◑","◕","●","◕","◑","◔"].map((sym, i) => (
        <span key={i} style={{
          fontFamily:"'Courier Prime', Courier, monospace",
          fontSize:"13px", color:"rgba(185,145,125,0.44)",
          userSelect:"none", lineHeight:1,
        }}>{sym}</span>
      ))}
      <span style={{
        fontFamily:"'Courier Prime', Courier, monospace",
        fontSize:"7.5px", letterSpacing:"0.12em",
        color:"rgba(155,120,100,0.34)", marginLeft:"6px", userSelect:"none",
      }}>
        lunar archive
      </span>
    </div>
  );
}

function Portrait() {
  return (
    <div style={{
      width:"100%", aspectRatio:"4/5",
      border:"1px solid rgba(190,148,128,0.42)",
      position:"relative", overflow:"hidden",
    }}>
      {[
        { top:"10px", left:"10px"  }, { top:"10px",    right:"10px" },
        { bottom:"10px", left:"10px" }, { bottom:"10px", right:"10px" },
      ].map((pos, i) => (
        <span key={i} style={{
          position:"absolute", ...pos,
          fontFamily:"'Courier Prime', monospace", fontSize:"10px",
          color:"rgba(190,148,128,0.50)", lineHeight:1, userSelect:"none", zIndex:4, pointerEvents:"none",
        }}>+</span>
      ))}

      <ImageWithFallback
        src={portraitImg}
        alt="Wenhan's portrait with playful cat-ear and whisker doodles"
        style={{
          width:"100%", height:"100%", objectFit:"cover", display:"block",
          filter:"sepia(6%) contrast(0.97) brightness(0.99)",
        }}
      />

      {/* Grain */}
      <svg aria-hidden="true" style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        opacity:0.055, pointerEvents:"none", zIndex:1,
      }}>
        <filter id="portrait-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#portrait-grain)" fill="#5a3020"/>
      </svg>

      {/* Edge vignette */}
      <div aria-hidden="true" style={{
        position:"absolute", inset:0,
        background:"radial-gradient(ellipse 82% 82% at 50% 50%, transparent 50%, rgba(244,241,235,0.32) 100%)",
        pointerEvents:"none", zIndex:2,
      }} />

      {/* ASCII overlays over doodle lines */}
      <pre aria-hidden="true" style={{
        position:"absolute", top:"18%", left:"2%",
        fontFamily:"'Courier Prime', Courier, monospace", fontSize:"11px", lineHeight:"2.0",
        color:"rgba(195,128,108,0.60)",
        margin:0, padding:0, background:"transparent", border:"none",
        userSelect:"none", pointerEvents:"none", zIndex:3, whiteSpace:"pre",
      }}>{`(\n.\n(\n.\n/\n.\n(`}</pre>

      <pre aria-hidden="true" style={{
        position:"absolute", top:"18%", right:"2%",
        fontFamily:"'Courier Prime', Courier, monospace", fontSize:"11px", lineHeight:"2.0",
        color:"rgba(195,128,108,0.60)",
        margin:0, padding:0, background:"transparent", border:"none",
        userSelect:"none", pointerEvents:"none", zIndex:3, whiteSpace:"pre",
      }}>{`)\n.\n)\n.\n\\\n.\n)`}</pre>

      <pre aria-hidden="true" style={{
        position:"absolute", top:"60%", left:"3%",
        fontFamily:"'Courier Prime', Courier, monospace", fontSize:"9px", lineHeight:"1.45",
        color:"rgba(165,108,85,0.55)",
        margin:0, padding:0, background:"transparent", border:"none",
        userSelect:"none", pointerEvents:"none", zIndex:3, whiteSpace:"pre",
      }}>{`- . * -\n  . - .\n* - . *`}</pre>

      <pre aria-hidden="true" style={{
        position:"absolute", top:"60%", right:"3%", textAlign:"right",
        fontFamily:"'Courier Prime', Courier, monospace", fontSize:"9px", lineHeight:"1.45",
        color:"rgba(165,108,85,0.55)",
        margin:0, padding:0, background:"transparent", border:"none",
        userSelect:"none", pointerEvents:"none", zIndex:3, whiteSpace:"pre",
      }}>{`- * . -\n. - .\n. * - .`}</pre>

      <pre aria-hidden="true" style={{
        position:"absolute", top:"66%", left:"50%", transform:"translateX(-50%)", textAlign:"center",
        fontFamily:"'Courier Prime', Courier, monospace", fontSize:"9px", lineHeight:"1.45",
        color:"rgba(200,138,118,0.50)",
        margin:0, padding:0, background:"transparent", border:"none",
        userSelect:"none", pointerEvents:"none", zIndex:3, whiteSpace:"pre",
      }}>{`(.)\n 1 `}</pre>

      <span aria-hidden="true" style={{
        position:"absolute", top:"26%", left:"19%",
        fontFamily:"'Courier Prime', Courier, monospace", fontSize:"10px",
        color:"rgba(188,122,102,0.52)", userSelect:"none", pointerEvents:"none", zIndex:3,
      }}>/.
      </span>
    </div>
  );
}

export function AboutPage() {
  return (
    <PageLayout currentPage="/about">
      {/* Horizontal margins come from PageLayout's .pl-wrap — only set vertical here */}
      <div
        style={{
          paddingTop: "44px",
          paddingBottom: "100px",
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "64px",
        }}
        className="pl-two-col"
      >
        {/* ── Left: text ── */}
        <div>
          <p style={{
            fontFamily:"'Courier Prime', Courier, monospace",
            fontSize:"8.5px", letterSpacing:"0.22em", color:"#a09080",
            margin:"0 0 10px 0", textTransform:"uppercase",
          }}>About Me</p>
          <div style={{
            width:"56px", height:"1px",
            background:"rgba(160,130,110,0.28)", marginBottom:"36px",
          }} />

          <p style={{
            fontFamily:"'Special Elite', 'Courier Prime', Courier, monospace",
            fontSize:"15px", lineHeight:"1.92", color:"#2a2218",
            margin:"0 0 24px 0",
          }}>
            I&rsquo;m interested in the quiet space between emotion and
            image, where a line, a color, or a small detail can begin to
            tell a story. My work often grows from observation, memory,
            and imagination, shaped by a desire to create visuals that
            feel intimate, atmospheric, and alive.
          </p>
          <p style={{
            fontFamily:"'Special Elite', 'Courier Prime', Courier, monospace",
            fontSize:"15px", lineHeight:"1.92", color:"#2a2218",
            margin:0,
          }}>
            Through illustration, I continue to explore a visual language
            that feels personal, atmospheric, and emotionally honest.
          </p>

          <MoonPhases />

          <div style={{ marginTop:"44px", display:"flex", flexDirection:"column", gap:"12px" }}>
            {[
              ["PROGRAM",  "Illustration, Sheridan College"],
              ["MEDIUM",   "Drawing · Watercolour · Digital"],
              ["LANGUAGE", "English · 中文"],
              ["CONTACT",  "xyjy99@gmail.com"],
            ].map(([k, v]) => (
              <div key={k} style={{ display:"flex", gap:"16px", alignItems:"baseline" }}>
                <span style={{
                  fontFamily:"'Courier Prime', Courier, monospace",
                  fontSize:"8px", letterSpacing:"0.16em", color:"#a09080",
                  minWidth:"76px", userSelect:"none",
                }}>{k}</span>
                <span style={{
                  fontFamily:"'Courier Prime', Courier, monospace",
                  fontSize:"10px", letterSpacing:"0.05em", color:"#5a5048", lineHeight:"1.6",
                }}>{v}</span>
              </div>
            ))}
          </div>

          <pre style={{
            fontFamily:"'Courier Prime', Courier, monospace",
            fontSize:"10px", lineHeight:"1.55", color:"rgba(150,120,100,0.26)",
            margin:"48px 0 0 0", userSelect:"none",
            background:"transparent", border:"none",
          }}>{`    *          .\n        +                *\n  .          *      .\n        .         +`}</pre>
        </div>

        {/* ── Right: portrait ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
          <Portrait />
          <p style={{
            fontFamily:"'Courier Prime', Courier, monospace",
            fontStyle:"italic", fontSize:"11.5px", lineHeight:"1.85",
            color:"#9a8e82", margin:0,
          }}>
            &ldquo;I draw what lingers.&rdquo;
          </p>
          <span style={{
            fontFamily:"'Courier Prime', Courier, monospace",
            fontSize:"8px", letterSpacing:"0.1em",
            color:"rgba(140,110,90,0.38)", userSelect:"none",
          }}>43°51′N · 79°23′W</span>
        </div>
      </div>
    </PageLayout>
  );
}
