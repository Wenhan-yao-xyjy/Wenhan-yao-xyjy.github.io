#!/usr/bin/env python3
"""Regenerates the Works page assets from the originals in digital/, hand-drawn/ and Handmade/.

  - src/assets/works/<category>/<slug>.webp   web-sized copy of every artwork
  - src/app/data/workCovers.ts                ASCII category covers, drawn from one artwork each

Needs Pillow and numpy. Run from the repo root: python3 scripts/build_work_assets.py
"""
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "src/assets/works"
COVERS_TS = ROOT / "src/app/data/workCovers.ts"
MAX_EDGE = 1600

WORKS = {
    "digital": {
        "fox": "digital/Fox.jpg",
        "heart": "digital/Heart.jpg",
        "photo-life-1": "digital/Photo Life.jpeg",
        "photo-life-2": "digital/Photo Life.png",
    },
    "handmade": {
        "eagle-mask": "Handmade/Wenhan Yao_Masks_3.jpg",
        "tangled-logs": "Handmade/Wenhan-Yao-Lino-Final_1.jpg",
        "farmer-and-snake": "Handmade/Wenhan_Yao_P3FINAL_1.jpg",
        "mirror-portrait": "Handmade/Yao-Wenhan-CollageFinal.pdf_1.jpg",
        "horned-mask": "Handmade/扫描全能王 2025-11-10 18.37_1.jpg",
        "bound": "Handmade/扫描全能王 2026-4-14 11.01_1.jpg",
    },
    "handwork": {
        "roses-at-the-sill": "hand-drawn/Acrylic paint 2.JPG",
        "the-sitting": "hand-drawn/Acrylic paint 3.jpg",
        "gilded-scroll": "hand-drawn/Acrylic paint.JPG",
        "yellow-ground": "hand-drawn/Water Colour.jpg",
    },
}

# Same grid logic as AsciiMoon: a Courier cell is about half as wide as it is tall,
# so 104 x 65 cells fill a 4:5 frame.
COLS, ROWS = 104, 65
RAMP = " .:-+*/(01#"
DUST = ".,+*:."

# box: crop (left, top, right, bottom) as fractions of the artwork, 4:5 once in pixels.
# black/white: tone levels mapped to full / no wash. wash: strength of that wash, kept pale.
# edge_lo/edge_hi: contrast steps mapped to no line / full line.
# warm: darkens warm colours, to lift a warm subject off a cool backdrop of similar brightness.
COVERS = {
    "digital": dict(src="digital/Heart.jpg", box=(0.2, 0.0, 1.0, 1.0), black=0.14, white=0.62, wash=0.62, edge_lo=0.05, edge_hi=0.16, warm=1.2),
    "handmade": dict(src="Handmade/Wenhan Yao_Masks_3.jpg", box=(0.0, 0.0, 1.0, 0.91), black=0.3, white=0.95, wash=1.0, edge_lo=0.3, edge_hi=0.6, warm=0.0),
    "handwork": dict(src="hand-drawn/Acrylic paint 2.JPG", box=(0.42, 0.08, 1.0, 0.68), black=0.1, white=0.72, wash=0.62, edge_lo=0.05, edge_hi=0.16, warm=0.0),
}


def rand(n: float) -> float:
    x = math.sin(n * 9301 + 49297) * 233280
    return x - math.floor(x)


def load(rel: str) -> Image.Image:
    return ImageOps.exif_transpose(Image.open(ROOT / rel))


def export_work(category: str, slug: str, rel: str) -> None:
    img = load(rel)
    icc = img.info.get("icc_profile")
    img = img.convert("RGB")
    img.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
    out = OUT_DIR / category / f"{slug}.webp"
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "WEBP", quality=84, method=6, icc_profile=icc)


def ink_map(spec: dict) -> np.ndarray:
    """Ink density per cell, 0 = bare paper, 1 = darkest: a pale tonal wash with contour lines on top."""
    img = load(spec["src"]).convert("RGB")
    w, h = img.size
    l, t, r, b = spec["box"]
    img = img.crop((int(l * w), int(t * h), int(r * w), int(b * h)))

    fine = np.asarray(img.resize((COLS * 3, ROWS * 3), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2)), dtype=np.float32) / 255
    tone = fine @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    tone = tone - spec["warm"] * np.clip(fine[..., 0] - fine[..., 2], 0, 1)

    gy, gx = np.gradient(tone)
    edges = np.hypot(gx, gy).reshape(ROWS, 3, COLS, 3).max(axis=(1, 3))
    edges = np.clip((edges - spec["edge_lo"]) / (spec["edge_hi"] - spec["edge_lo"]), 0, 1)

    wash = tone.reshape(ROWS, 3, COLS, 3).mean(axis=(1, 3))
    wash = 1 - np.clip((wash - spec["black"]) / (spec["white"] - spec["black"]), 0, 1)
    return np.maximum(wash * spec["wash"], edges)


def ascii_cover(spec: dict, seed: int) -> list[str]:
    """Returns one text layer per ink band (light, mid, dark), all on the same grid."""
    ink = ink_map(spec)
    layers = [[[" "] * COLS for _ in range(ROWS)] for _ in range(3)]
    for row in range(ROWS):
        for col in range(COLS):
            # Elliptical falloff in cell units, so the picture dissolves like the moon's rim.
            dx = (col - (COLS - 1) / 2) / (COLS / 2)
            dy = (row - (ROWS - 1) / 2) / (ROWS / 2)
            fade = min(1.0, max(0.0, (1.12 - math.hypot(dx, dy)) / 0.22))
            i = seed * 10000 + row * COLS + col
            v = ink[row, col] * fade
            if v < 0.07:
                if rand(i) < 0.012:
                    layers[0][row][col] = DUST[int(rand(i + 7) * len(DUST))]
            elif rand(i + 3) < 0.5 + v * 2:
                level = round(v * (len(RAMP) - 1) + (rand(i + 11) - 0.5))
                band = 0 if v < 0.34 else 1 if v < 0.68 else 2
                layers[band][row][col] = RAMP[min(len(RAMP) - 1, max(1, level))]
    return ["\n".join("".join(r).rstrip() for r in layer) for layer in layers]


def main() -> None:
    for category, works in WORKS.items():
        for slug, rel in works.items():
            export_work(category, slug, rel)

    body = "".join(
        f"  {key}: [\n" + "".join(f"    String.raw`{layer}`,\n" for layer in ascii_cover(spec, n + 1)) + "  ],\n"
        for n, (key, spec) in enumerate(COVERS.items())
    )
    COVERS_TS.write_text(
        "// Generated by scripts/build_work_assets.py. Edit that script, not this file.\n"
        f"export const COVER_COLS = {COLS};\n"
        f"export const COVER_ROWS = {ROWS};\n\n"
        "// One entry per category: light, mid and dark ink layers, stacked on the same grid.\n"
        f"export const WORK_COVERS: Record<string, string[]> = {{\n{body}}};\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
