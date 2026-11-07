import { PageLayout } from "../components/PageLayout";
import { WorkCover } from "../components/WorkCover";
import { WORK_COVERS } from "../data/workCovers";
import { CATEGORIES } from "../data/works";

const MONO = "'Courier Prime', Courier, monospace";

// Uneven top offsets, matching the loose, hand-placed feel of the rest of the site.
const OFFSETS = ["0px", "40px", "16px"];

export function WorksPage() {
  return (
    <PageLayout currentPage="/works">
      <style>{`
        .wk-card { display: block; text-decoration: none; color: inherit; }
        .wk-card:focus-visible { outline: 1px solid rgba(42,34,24,0.4); outline-offset: 6px; }
        .wk-cover-art {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          opacity: 0; transition: opacity 0.6s ease;
        }
        .wk-card:hover .wk-cover-art, .wk-card:focus-visible .wk-cover-art { opacity: 1; }
        .wk-card-more { transition: color 0.25s ease; }
        .wk-card:hover .wk-card-more { color: #2a2218; }
        @media (max-width: 800px) {
          .wk-card { margin-top: 0 !important; }
        }
      `}</style>

      {/* Horizontal margins from PageLayout's .pl-wrap — only vertical padding here */}
      <div style={{ paddingTop:"44px", paddingBottom:"100px" }}>

        <div style={{ marginBottom:"48px" }}>
          <p style={{
            fontFamily:MONO, fontSize:"8.5px", letterSpacing:"0.22em", color:"#a09080",
            margin:"0 0 10px 0",
          }}>Works</p>
          <div style={{
            width:"56px", height:"1px",
            background:"rgba(160,130,110,0.28)", marginBottom:"14px",
          }} />
          <p style={{
            fontFamily:MONO, fontStyle:"italic", fontSize:"12px",
            color:"#9a8e82", letterSpacing:"0.04em",
            margin:0, lineHeight:"1.6",
          }}>a selection of ongoing and completed work</p>
        </div>

        <div
          className="pl-two-col"
          style={{ display:"grid", gridTemplateColumns:"repeat(3, minmax(0, 1fr))", gap:"40px", alignItems:"start" }}
        >
          {CATEGORIES.map((category, i) => (
            <a
              key={category.slug}
              className="wk-card"
              href={`#/works/${category.slug}`}
              style={{ marginTop:OFFSETS[i] }}
            >
              <WorkCover layers={WORK_COVERS[category.slug]} art={category.coverArt} />
              <div style={{ paddingTop:"14px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"6px" }}>
                  <span style={{
                    fontFamily:"'Special Elite', 'Courier Prime', Courier, monospace",
                    fontSize:"18px", letterSpacing:"0.02em", color:"#2a2218",
                  }}>{category.title}</span>
                  <span className="wk-card-more" style={{
                    fontFamily:MONO, fontSize:"10px", color:"#8a7e72", letterSpacing:"0.1em",
                  }}>{category.works.length} works →</span>
                </div>
                <p style={{
                  fontFamily:MONO, fontStyle:"italic", fontSize:"12px",
                  color:"#7a6e62", lineHeight:"1.6", letterSpacing:"0.02em", margin:0,
                }}>{category.intro}</p>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop:"56px", display:"flex", gap:"28px", alignItems:"center" }}>
          {["RA 06h–22h", "Dec ±30°", "epoch 2024.0"].map((m) => (
            <span key={m} style={{
              fontFamily:MONO, fontSize:"8px", letterSpacing:"0.1em",
              color:"rgba(140,110,90,0.30)", userSelect:"none",
            }}>{m}</span>
          ))}
          <span style={{ color:"rgba(140,110,90,0.18)", fontSize:"9px", userSelect:"none" }}>
            · · · · · · · · ·
          </span>
        </div>
      </div>
    </PageLayout>
  );
}
