import { useState, useEffect } from "react";

interface NavigationProps {
  visible:  boolean;
  onHover:  (item: string | null) => void;
}

// Hash-based hrefs work with HashRouter without needing react-router's <Link>
const NAV_ITEMS = [
  { label: "ABOUT ME", href: "#/about"   },
  { label: "WORKS",    href: "#/works"   },
  { label: "CONTACT",  href: "#/contact" },
];

export function Navigation({ visible, onHover }: NavigationProps) {
  const [shownCount, setShownCount] = useState(0);
  const [hovered,    setHovered]    = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    NAV_ITEMS.forEach((_, i) => {
      setTimeout(
        () => setShownCount((prev) => Math.max(prev, i + 1)),
        i * 320
      );
    });
  }, [visible]);

  return (
    <nav style={{ display:"flex", gap:"36px", alignItems:"center", marginTop:"44px" }}>
      {NAV_ITEMS.map((item, i) => {
        const isHov   = hovered === item.label;
        const isShown = i < shownCount;
        return (
          <a
            key={item.label}
            href={item.href}
            onMouseEnter={() => { setHovered(item.label); onHover(item.label); }}
            onMouseLeave={() => { setHovered(null);       onHover(null);       }}
            style={{
              fontFamily:    "'Courier Prime', Courier, monospace",
              fontSize:      "11px",
              letterSpacing: "0.2em",
              color:         isHov ? "#2a2218" : "#8a7e72",
              textDecoration:"none",
              opacity:       isShown ? 1 : 0,
              transition:    "opacity 0.5s ease, color 0.25s ease, border-color 0.25s ease",
              borderBottom:  isHov
                ? "1px solid rgba(42,34,24,0.5)"
                : "1px solid transparent",
              paddingBottom: "1px",
              display:       "flex",
              alignItems:    "center",
              gap:           "5px",
              userSelect:    "none",
            }}
          >
            {isHov && (
              <span style={{
                fontFamily: "'Courier Prime', Courier, monospace",
                fontSize:   "10px",
                color:      "#b08878",
                lineHeight: 1,
              }}>
                →
              </span>
            )}
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
