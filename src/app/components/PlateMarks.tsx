const POSITIONS = [
  { top:"5px",    left:"6px"  }, { top:"5px",    right:"6px" },
  { bottom:"5px", left:"6px"  }, { bottom:"5px", right:"6px" },
];

/** The small "+" registration marks in the corners of a framed plate. */
export function PlateMarks() {
  return (
    <>
      {POSITIONS.map((pos, i) => (
        <span key={i} aria-hidden="true" style={{
          position:"absolute", ...pos, zIndex:2,
          fontFamily:"'Courier Prime', Courier, monospace", fontSize:"9px",
          color:"rgba(180,142,122,0.55)", lineHeight:1, userSelect:"none", pointerEvents:"none",
        }}>+</span>
      ))}
    </>
  );
}
