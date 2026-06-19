import { PageLayout } from "../components/PageLayout";

interface Work {
  id: number; title: string; year: string; medium: string; desc: string; aspect: string;
}

const WORKS: Work[] = [
  { id:1, title:"A Sunday Afternoon", year:"2024", medium:"Graphite and watercolour on paper", desc:"Studies of morning light on quiet surfaces.", aspect:"16/10" },
  { id:2, title:"Soft Room",          year:"2023", medium:"Digital illustration",               desc:"Domestic interiors, soft geometry, and colour fields.", aspect:"3/4" },
  { id:3, title:"Before the Rain",    year:"2023", medium:"Watercolour on paper",               desc:"The weight of waiting, painted in pale washes.", aspect:"3/4" },
  { id:4, title:"Memory Trace",       year:"2024", medium:"Mixed media on paper",               desc:"Fragments of what was half-remembered.", aspect:"4/3" },
  { id:5, title:"Quiet Hours",        year:"2022", medium:"Ink on paper",                       desc:"Slow observations, careful marks, uneven silences.", aspect:"4/3" },
  { id:6, title:"Untitled Study",     year:"2024", medium:"Pencil on vellum",                   desc:"An unfinished sentence that felt complete.", aspect:"3/4" },
];

function WorkPlaceholder({ work, style }: { work: Work; style?: React.CSSProperties }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", ...style }}>
      <div style={{
        width:"100%", aspectRatio:work.aspect,
        border:"1px solid rgba(180,142,122,0.36)",
        background:"rgba(242,238,230,0.65)",
        position:"relative", overflow:"hidden",
      }}>
        {[
          { top:"8px", left:"8px"  }, { top:"8px",    right:"8px" },
          { bottom:"8px", left:"8px" }, { bottom:"8px", right:"8px" },
        ].map((pos, i) => (
          <span key={i} style={{
            position:"absolute", ...pos,
            fontFamily:"Courier Prime, monospace", fontSize:"9px",
            color:"rgba(180,142,122,0.42)", lineHeight:1, userSelect:"none",
          }}>+</span>
        ))}
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.03, pointerEvents:"none" }}>
          <filter id={`wg-${work.id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter={`url(#wg-${work.id})`} fill="#5a3020"/>
        </svg>
        <div style={{
          position:"absolute", inset:0,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <span style={{
            fontFamily:"'Courier Prime', Courier, monospace",
            fontStyle:"italic", fontSize:"10px",
            color:"rgba(155,118,98,0.42)", letterSpacing:"0.05em", userSelect:"none",
          }}>[ {work.medium.toLowerCase()} ]</span>
        </div>
      </div>

      <div style={{ paddingTop:"12px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"3px" }}>
          <span style={{
            fontFamily:"'Special Elite', 'Courier Prime', Courier, monospace",
            fontSize:"13px", letterSpacing:"0.02em", color:"#2a2218",
          }}>{work.title}</span>
          <span style={{
            fontFamily:"'Courier Prime', Courier, monospace",
            fontSize:"9px", color:"#a09080", letterSpacing:"0.1em",
          }}>{work.year}</span>
        </div>
        <p style={{
          fontFamily:"'Courier Prime', Courier, monospace",
          fontSize:"9px", color:"#9a8e82",
          letterSpacing:"0.04em", margin:"0 0 3px 0", lineHeight:"1.5",
        }}>{work.medium}</p>
        <p style={{
          fontFamily:"'Courier Prime', Courier, monospace",
          fontStyle:"italic", fontSize:"10px",
          color:"#7a6e62", lineHeight:"1.7",
          letterSpacing:"0.02em", margin:0,
        }}>{work.desc}</p>
      </div>
    </div>
  );
}

export function WorksPage() {
  return (
    <PageLayout currentPage="/works">
      {/* Horizontal margins from PageLayout's .pl-wrap — only vertical padding here */}
      <div style={{ paddingTop:"44px", paddingBottom:"100px" }}>

        <div style={{ marginBottom:"48px" }}>
          <p style={{
            fontFamily:"'Courier Prime', Courier, monospace",
            fontSize:"8.5px", letterSpacing:"0.22em", color:"#a09080",
            margin:"0 0 10px 0",
          }}>Works</p>
          <div style={{
            width:"56px", height:"1px",
            background:"rgba(160,130,110,0.28)", marginBottom:"14px",
          }} />
          <p style={{
            fontFamily:"'Courier Prime', Courier, monospace",
            fontStyle:"italic", fontSize:"12px",
            color:"#9a8e82", letterSpacing:"0.04em",
            margin:0, lineHeight:"1.6",
          }}>a selection of ongoing and completed work</p>
        </div>

        {/* Row 1: wide + tall portrait */}
        <div style={{
          display:"grid", gridTemplateColumns:"3fr 2fr",
          gap:"40px", marginBottom:"48px", alignItems:"start",
        }}
          className="pl-two-col"
        >
          <WorkPlaceholder work={WORKS[0]} />
          <WorkPlaceholder work={WORKS[1]} style={{ marginTop:"40px" }} />
        </div>

        {/* Row 2: mirrored */}
        <div style={{
          display:"grid", gridTemplateColumns:"2fr 3fr",
          gap:"40px", marginBottom:"48px", alignItems:"start",
        }}
          className="pl-two-col"
        >
          <WorkPlaceholder work={WORKS[2]} style={{ marginTop:"20px" }} />
          <WorkPlaceholder work={WORKS[3]} />
        </div>

        {/* Row 3: equal, slightly inset */}
        <div style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:"40px", alignItems:"start",
        }}
          className="pl-two-col"
        >
          <WorkPlaceholder work={WORKS[4]} />
          <WorkPlaceholder work={WORKS[5]} style={{ marginTop:"28px" }} />
        </div>

        <div style={{ marginTop:"56px", display:"flex", gap:"28px", alignItems:"center" }}>
          {["RA 06h–22h", "Dec ±30°", "epoch 2024.0"].map((m) => (
            <span key={m} style={{
              fontFamily:"'Courier Prime', Courier, monospace",
              fontSize:"8px", letterSpacing:"0.1em",
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
