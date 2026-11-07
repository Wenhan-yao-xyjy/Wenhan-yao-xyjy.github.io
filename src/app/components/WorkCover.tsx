import { COVER_COLS, COVER_ROWS } from "../data/workCovers";
import { PlateMarks } from "./PlateMarks";

// Courier Prime at 10 units: each cell is 6 wide and 12 tall.
const CELL_W = 6;
const CELL_H = 12;

// Ink for the light, mid and dark layers of a cover.
const INKS = ["rgba(176,136,120,0.55)", "rgba(150,104,86,0.78)", "#4a3428"];

interface WorkCoverProps {
  layers: string[];
  art:    string;
}

/**
 * An ASCII moon drawn from one of the category's works; the work itself fades in on hover.
 * The text is SVG rather than <pre> so it scales with the card, below any browser minimum font size.
 */
export function WorkCover({ layers, art }: WorkCoverProps) {
  return (
    <div style={{
      position:"relative", width:"100%", aspectRatio:"4/5", overflow:"hidden",
      border:"1px solid rgba(180,142,122,0.36)",
      background:"rgba(242,238,230,0.65)",
    }}>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${COVER_COLS * CELL_W} ${COVER_ROWS * CELL_H}`}
        style={{
          position:"absolute", inset:0, width:"100%", height:"100%",
          fontFamily:"'Courier Prime', Courier, monospace", fontSize:10,
          fontKerning:"none", textRendering:"geometricPrecision",
        }}
      >
        {layers.map((layer, band) => (
          <g key={band} fill={INKS[band]}>
            {layer.split("\n").map((line, row) => line && (
              <text key={row} y={(row + 1) * CELL_H - 2.5} style={{ whiteSpace:"pre" }}>{line}</text>
            ))}
          </g>
        ))}
      </svg>
      <img className="wk-cover-art" src={art} alt="" loading="lazy" />
      <PlateMarks />
    </div>
  );
}
