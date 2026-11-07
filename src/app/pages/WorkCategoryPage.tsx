import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { PageLayout } from "../components/PageLayout";
import { PlateMarks } from "../components/PlateMarks";
import { WorkLightbox } from "../components/WorkLightbox";
import { CATEGORIES, type Work } from "../data/works";

const MONO = "'Courier Prime', Courier, monospace";

function Plate({ work, number, onOpen }: { work: Work; number: number; onOpen: () => void }) {
  return (
    <figure style={{ margin:0 }}>
      <button
        type="button"
        className="wk-plate"
        aria-label={`View ${work.title} larger`}
        onClick={onOpen}
      >
        <PlateMarks />
        <img
          src={work.src}
          alt={work.desc}
          loading="lazy"
          width={work.width}
          height={work.height}
          style={{ display:"block", width:"100%", height:"auto" }}
        />
      </button>
      <figcaption style={{ paddingTop:"12px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:"12px", marginBottom:"3px" }}>
          <span style={{
            fontFamily:"'Special Elite', 'Courier Prime', Courier, monospace",
            fontSize:"14px", letterSpacing:"0.02em", color:"#2a2218",
          }}>{work.title}</span>
          <span style={{ fontFamily:MONO, fontSize:"9px", color:"#a09080", letterSpacing:"0.1em", whiteSpace:"nowrap" }}>
            pl. {String(number).padStart(2, "0")}
          </span>
        </div>
        <p style={{
          fontFamily:MONO, fontSize:"10px", color:"#8a7e72",
          letterSpacing:"0.04em", margin:"0 0 6px 0", lineHeight:"1.5",
        }}>{work.medium}</p>
        <p style={{
          fontFamily:MONO, fontStyle:"italic", fontSize:"12px",
          color:"#7a6e62", lineHeight:"1.7", letterSpacing:"0.02em", margin:0,
        }}>{work.desc}</p>
      </figcaption>
    </figure>
  );
}

export function WorkCategoryPage() {
  const { category: slug } = useParams();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const position = CATEGORIES.findIndex((c) => c.slug === slug);
  if (position === -1) return <Navigate to="/works" replace />;

  const category = CATEGORIES[position];
  const next     = CATEGORIES[(position + 1) % CATEGORIES.length];

  // Two works per row. Column widths follow each work's proportions, so a row shares one height.
  const rows: Work[][] = [];
  for (let i = 0; i < category.works.length; i += 2) rows.push(category.works.slice(i, i + 2));

  return (
    <PageLayout key={category.slug} currentPage="/works">
      <style>{`
        .wk-plate {
          position: relative; display: block; width: 100%; padding: 14px;
          background: rgba(242,238,230,0.65);
          border: 1px solid rgba(180,142,122,0.36);
          cursor: zoom-in; transition: border-color 0.25s ease;
        }
        .wk-plate:hover { border-color: rgba(150,104,86,0.7); }
        .wk-plate:focus-visible { outline: 1px solid rgba(42,34,24,0.4); outline-offset: 3px; }
        .wk-link { color: #8a7e72; text-decoration: none; transition: color 0.25s ease; }
        .wk-link:hover { color: #2a2218; }
      `}</style>

      <div style={{ paddingTop:"44px", paddingBottom:"100px" }}>
        <a className="wk-link" href="#/works" style={{ fontFamily:MONO, fontSize:"10px", letterSpacing:"0.18em" }}>
          ← WORKS
        </a>

        <div style={{ margin:"28px 0 48px 0" }}>
          <h1 style={{
            fontFamily:"'Special Elite', 'Courier Prime', Courier, monospace",
            fontSize:"24px", fontWeight:400, letterSpacing:"0.02em", color:"#2a2218",
            margin:"0 0 12px 0",
          }}>{category.title}</h1>
          <div style={{
            width:"56px", height:"1px",
            background:"rgba(160,130,110,0.28)", marginBottom:"14px",
          }} />
          <p style={{
            fontFamily:MONO, fontStyle:"italic", fontSize:"12px",
            color:"#7a6e62", letterSpacing:"0.04em", margin:0, lineHeight:"1.6",
          }}>{category.intro}</p>
        </div>

        {rows.map((row, r) => (
          <div
            key={r}
            className="pl-two-col"
            style={{
              display:"grid", gap:"40px", alignItems:"start", marginBottom:"56px",
              gridTemplateColumns: row.length === 2
                ? row.map((w) => `minmax(0, ${w.width / w.height}fr)`).join(" ")
                : "minmax(0, 3fr) minmax(0, 2fr)",
            }}
          >
            {row.map((work, i) => {
              const index = r * 2 + i;
              return <Plate key={work.src} work={work} number={index + 1} onOpen={() => setOpenIndex(index)} />;
            })}
          </div>
        ))}

        <a className="wk-link" href={`#/works/${next.slug}`} style={{ fontFamily:MONO, fontSize:"10px", letterSpacing:"0.18em" }}>
          NEXT: {next.title.toUpperCase()} →
        </a>
      </div>

      <WorkLightbox works={category.works} index={openIndex} onChange={setOpenIndex} />
    </PageLayout>
  );
}
