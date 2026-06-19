import { type ReactNode } from "react";
import { StarField } from "./StarField";

interface PageLayoutProps {
  children:    ReactNode;
  currentPage: string;
}

const NAV = [
  { label: "ABOUT ME", href: "#/about",   path: "/about"   },
  { label: "WORKS",    href: "#/works",   path: "/works"   },
  { label: "CONTACT",  href: "#/contact", path: "/contact" },
];

function Textures() {
  return (
    <>
      <svg aria-hidden="true" style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        opacity:0.038, pointerEvents:"none", zIndex:0,
      }}>
        <filter id="pg-inner">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pg-inner)" fill="#5a4030" />
      </svg>
      <div aria-hidden="true" style={{
        position:"absolute", inset:0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(42,34,24,0.016) 3px, rgba(42,34,24,0.016) 4px)",
        pointerEvents:"none", zIndex:0,
      }} />
      <div aria-hidden="true" style={{
        position:"absolute", inset:0,
        background: "radial-gradient(ellipse 95% 90% at 50% 50%, transparent 45%, rgba(205,195,178,0.28) 100%)",
        pointerEvents:"none", zIndex:0,
      }} />
    </>
  );
}

export function PageLayout({ children, currentPage }: PageLayoutProps) {
  return (
    <div style={{
      position:"relative", width:"100%", minHeight:"100vh",
      background:"#f4f1eb", overflow:"hidden",
      animation:"pageIn 0.55s ease forwards",
    }}>
      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        /* Shared centred container — all page regions align to this */
        .pl-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(40px, 5.5vw, 88px);
        }
        /* Collapse two-column grids on narrow viewports */
        @media (max-width: 800px) {
          .pl-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Textures />
      <StarField loaded sparse hoveredNav={null} />

      {/* ── Top navigation bar ── */}
      <div style={{ position:"absolute", top:32, left:0, right:0, zIndex:10 }}>
        <div className="pl-wrap" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          {/* Home link — clean Courier Prime, same weight as homepage nav */}
          <a href="#/" style={{
            fontFamily:    "'Courier Prime', Courier, monospace",
            fontSize:      "10px",
            letterSpacing: "0.18em",
            color:         "#a09080",
            textDecoration:"none",
          }}>
            WENHAN YAO
          </a>

          {/* Page nav — Courier Prime, not Special Elite, consistent with homepage */}
          <nav style={{ display:"flex", gap:"28px" }}>
            {NAV.map((item) => {
              const active = currentPage === item.path;
              return (
                <a key={item.label} href={item.href} style={{
                  fontFamily:    "'Courier Prime', Courier, monospace",
                  fontSize:      "10px",
                  letterSpacing: "0.18em",
                  color:         active ? "#2a2218" : "#a09080",
                  textDecoration:"none",
                  borderBottom:  active ? "1px solid rgba(42,34,24,0.4)" : "1px solid transparent",
                  paddingBottom: "1px",
                  transition:    "color 0.25s ease, border-color 0.25s ease",
                  cursor:        "pointer",
                }}>
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Page content (responsive, centred) ── */}
      <div style={{ paddingTop:"80px", paddingBottom:"20px" }}>
        <div className="pl-wrap">
          {children}
        </div>
      </div>

      {/* ── Bottom rule ── */}
      <div style={{ position:"absolute", bottom:56, left:0, right:0, zIndex:5 }}>
        <div className="pl-wrap">
          <div style={{
            width:"120px", height:"1px",
            background:"linear-gradient(to right, rgba(140,120,100,0.18), transparent)",
          }} />
        </div>
      </div>

      {/* ── Bottom labels ── */}
      <div style={{ position:"absolute", bottom:28, left:0, right:0, zIndex:5 }}>
        <div className="pl-wrap" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <span style={{
            fontFamily:"'Courier Prime', Courier, monospace",
            fontSize:"9px", fontStyle:"italic",
            letterSpacing:"0.05em", color:"#b0a090", userSelect:"none",
          }}>
            a soft place for sketches, dreams, and unfinished thoughts.
          </span>
          <span style={{
            fontFamily:"'Courier Prime', Courier, monospace",
            fontSize:"9px", letterSpacing:"0.12em",
            color:"#a09080", userSelect:"none",
          }}>
            © 2024
          </span>
        </div>
      </div>
    </div>
  );
}
