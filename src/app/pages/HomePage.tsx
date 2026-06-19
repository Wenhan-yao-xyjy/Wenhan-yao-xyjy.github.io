import { useState, useEffect, useCallback } from "react";
import { AsciiMoon }  from "../components/AsciiMoon";
import { HeroText }   from "../components/HeroText";
import { Navigation } from "../components/Navigation";
import { StarField }  from "../components/StarField";

export function HomePage() {
  const [loaded,      setLoaded]      = useState(false);
  const [typingDone,  setTypingDone]  = useState(false);
  const [hoveredNav,  setHoveredNav]  = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleDone = useCallback(() => setTypingDone(true), []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#f4f1eb",
        overflow: "hidden",
        opacity:    loaded ? 1 : 0,
        transition: "opacity 1.2s ease",
      }}
    >
      {/* ── Responsive helpers ── */}
      <style>{`
        .hp-moon {
          position: absolute;
          right: -50px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
        }
        /* Title: clamp-based position stays naturally balanced at any screen width.
           On a 1440px screen left≈200px; on 1920px left≈250px — scales with viewport. */
        .hp-content {
          position: absolute;
          left: clamp(120px, 14vw, 280px);
          top: 50%;
          transform: translateY(-54%);
          z-index: 10;
          max-width: clamp(400px, 36vw, 560px);
        }
        @media (max-width: 1280px) {
          .hp-moon    { right: -110px; }
          .hp-content { left: clamp(80px, 10vw, 160px); max-width: clamp(360px, 40vw, 480px); }
        }
        @media (max-width: 1050px) {
          .hp-moon    { right: -180px; }
          .hp-content { left: 64px; max-width: 400px; }
        }
        @media (max-width: 820px) {
          .hp-moon    { display: none; }
          .hp-content { left: clamp(32px, 6vw, 72px); max-width: calc(100vw - 64px); top: 50%; }
        }
      `}</style>

      {/* ── Paper grain ── */}
      <svg aria-hidden="true" style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        opacity:0.038, pointerEvents:"none", zIndex:0,
      }}>
        <filter id="pg">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pg)" fill="#5a4030" />
      </svg>

      {/* ── Scanlines ── */}
      <div aria-hidden="true" style={{
        position:"absolute", inset:0,
        backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(42,34,24,0.018) 3px, rgba(42,34,24,0.018) 4px)",
        pointerEvents:"none", zIndex:0,
      }} />

      {/* ── Vignette ── */}
      <div aria-hidden="true" style={{
        position:"absolute", inset:0,
        background:"radial-gradient(ellipse 95% 90% at 50% 50%, transparent 45%, rgba(210,200,185,0.35) 100%)",
        pointerEvents:"none", zIndex:0,
      }} />

      {/* ── Star field — text zone protected ── */}
      <StarField loaded={loaded} hoveredNav={hoveredNav} />

      {/* ── Moon — right side, partially cropped ── */}
      <div className="hp-moon">
        <AsciiMoon loaded={loaded} hoveredNav={hoveredNav} />
      </div>

      {/* ── Main content ── */}
      <div className="hp-content">
        <HeroText loaded={loaded} onDone={handleDone} />
        <Navigation visible={typingDone} onHover={setHoveredNav} />
      </div>

      {/* ── Top-left name ── */}
      <div style={{
        position:"absolute", top:32, left:72, zIndex:10,
        fontFamily:"'Courier Prime', Courier, monospace",
        fontSize:"9px", letterSpacing:"0.14em", color:"#b0a090",
        opacity: loaded ? 0.8 : 0, transition:"opacity 1s ease 1s",
        userSelect:"none",
      }}>
        WENHAN YAO
      </div>

      {/* ── Bottom-right year ── */}
      <div style={{
        position:"absolute", bottom:30, right:48, zIndex:10,
        fontFamily:"'Courier Prime', Courier, monospace",
        fontSize:"9px", letterSpacing:"0.12em", color:"#b0a090",
        opacity: loaded ? 0.6 : 0, transition:"opacity 1s ease 1.5s",
        userSelect:"none",
      }}>
        © 2024
      </div>

      {/* ── Bottom-left subtitle ── */}
      <div style={{
        position:"absolute", bottom:30, left:72, zIndex:10,
        fontFamily:"'Courier Prime', Courier, monospace",
        fontSize:"9px", fontStyle:"italic", letterSpacing:"0.06em",
        color:"#c0b0a4",
        opacity: typingDone ? 0.7 : 0, transition:"opacity 1s ease 1.2s",
        userSelect:"none",
      }}>
        a soft place for sketches, dreams, and unfinished thoughts.
      </div>
    </div>
  );
}
