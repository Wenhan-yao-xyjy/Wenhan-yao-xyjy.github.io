import { useState, useEffect, type CSSProperties } from "react";

interface HeroTextProps {
  loaded: boolean;
  onDone: () => void;
}

const SENTENCE = "Hi, welcome to Wenhan's sketchbook.";

export function HeroText({ loaded, onDone }: HeroTextProps) {
  const [charCount, setCharCount] = useState(0);
  const [cursorOn,  setCursorOn]  = useState(true);
  const [done,      setDone]      = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const start = setTimeout(() => setCharCount(1), 600);
    return () => clearTimeout(start);
  }, [loaded]);

  useEffect(() => {
    if (charCount === 0 || done) return;
    if (charCount < SENTENCE.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 68);
      return () => clearTimeout(t);
    } else {
      setDone(true);
      onDone();
    }
  }, [charCount, done, onDone]);

  useEffect(() => {
    const interval = setInterval(() => setCursorOn((v) => !v), 540);
    return () => clearInterval(interval);
  }, []);

  const displayed = SENTENCE.slice(0, charCount);

  return (
    <p style={sentenceStyle}>
      {displayed}
      <span
        style={{
          display:      "inline-block",
          width:        "10px",
          height:       "1px",
          background:   "#5a4e44",
          opacity:      cursorOn ? 0.75 : 0,
          verticalAlign:"middle",
          marginLeft:   "2px",
          marginBottom: "3px",
          transition:   "opacity 0.08s",
          borderBottom: "2px solid #5a4e44",
        }}
      />
    </p>
  );
}

// Special Elite — distressed vintage typewriter with authentic ink-bleed texture
const sentenceStyle: CSSProperties = {
  fontFamily:    "'Special Elite', 'Courier Prime', Courier, monospace",
  fontSize:      "21px",
  fontWeight:    400,
  color:         "#2a2218",
  lineHeight:    "1.55",
  letterSpacing: "0.01em",
  margin:        0,
  padding:       0,
};
