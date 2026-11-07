import * as Dialog from "@radix-ui/react-dialog";
import type { KeyboardEvent } from "react";
import type { Work } from "../data/works";

const MONO = "'Courier Prime', Courier, monospace";

interface WorkLightboxProps {
  works:    Work[];
  index:    number | null;
  onChange: (index: number | null) => void;
}

export function WorkLightbox({ works, index, onChange }: WorkLightboxProps) {
  const work = index === null ? null : works[index];
  const step = (delta: number) => {
    if (index !== null) onChange((index + delta + works.length) % works.length);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft")  step(-1);
    if (e.key === "ArrowRight") step(1);
  };

  return (
    <Dialog.Root open={work !== null} onOpenChange={(open) => { if (!open) onChange(null); }}>
      <Dialog.Portal>
        <Dialog.Overlay style={{ position:"fixed", inset:0, zIndex:50, background:"#f4f1eb" }} />
        {work && (
          <Dialog.Content className="wk-lightbox" onKeyDown={onKeyDown}>
            <style>{`
              .wk-lightbox {
                position: fixed; inset: 0; z-index: 51;
                display: grid; grid-template-rows: auto minmax(0, 1fr) auto;
                gap: 16px; padding: 22px clamp(16px, 4vw, 48px);
                outline: none;
                animation: wkFade 0.3s ease;
              }
              @keyframes wkFade { from { opacity: 0; } to { opacity: 1; } }
              .wk-lightbox button {
                background: none; border: none; padding: 8px; cursor: pointer;
                font-family: ${MONO}; font-size: 11px; letter-spacing: 0.14em; color: #7a6e62;
                transition: color 0.25s ease;
              }
              .wk-lightbox button:hover { color: #2a2218; }
              .wk-lightbox .wk-step { font-size: 18px; padding: 8px 12px; }
              .wk-lightbox button:focus-visible { outline: 1px solid rgba(42,34,24,0.4); }
            `}</style>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:MONO, fontSize:"10px", letterSpacing:"0.14em", color:"#8a7e72" }}>
                {index! + 1} / {works.length}
              </span>
              <Dialog.Close>[ close ]</Dialog.Close>
            </div>

            <div style={{ minHeight:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <img
                key={work.src}
                src={work.src}
                alt={work.desc}
                style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain", display:"block" }}
              />
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:"16px" }}>
              <button type="button" className="wk-step" aria-label="Previous work" onClick={() => step(-1)}>←</button>
              <div style={{ textAlign:"center", maxWidth:"560px" }}>
                <Dialog.Title style={{
                  fontFamily:"'Special Elite', 'Courier Prime', Courier, monospace",
                  fontSize:"15px", fontWeight:400, letterSpacing:"0.02em", color:"#2a2218", margin:"0 0 4px 0",
                }}>{work.title}</Dialog.Title>
                <Dialog.Description style={{
                  fontFamily:MONO, fontStyle:"italic", fontSize:"12px", lineHeight:"1.6",
                  color:"#7a6e62", margin:0,
                }}>{work.medium}</Dialog.Description>
              </div>
              <button type="button" className="wk-step" aria-label="Next work" onClick={() => step(1)}>→</button>
            </div>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
