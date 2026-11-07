import fox           from "@/assets/works/digital/fox.webp";
import heart         from "@/assets/works/digital/heart.webp";
import photoLife1    from "@/assets/works/digital/photo-life-1.webp";
import photoLife2    from "@/assets/works/digital/photo-life-2.webp";
import eagleMask     from "@/assets/works/handmade/eagle-mask.webp";
import tangledLogs   from "@/assets/works/handmade/tangled-logs.webp";
import farmerSnake   from "@/assets/works/handmade/farmer-and-snake.webp";
import mirrorPortrait from "@/assets/works/handmade/mirror-portrait.webp";
import hornedMask    from "@/assets/works/handmade/horned-mask.webp";
import bound         from "@/assets/works/handmade/bound.webp";
import rosesSill     from "@/assets/works/handwork/roses-at-the-sill.webp";
import theSitting    from "@/assets/works/handwork/the-sitting.webp";
import gildedScroll  from "@/assets/works/handwork/gilded-scroll.webp";
import yellowGround  from "@/assets/works/handwork/yellow-ground.webp";

export interface Work {
  title:  string;
  medium: string;
  desc:   string;
  src:    string;
  width:  number;
  height: number;
}

export interface WorkCategory {
  slug:     string;
  title:    string;
  intro:    string;
  coverArt: string;
  works:    Work[];
}

export const CATEGORIES: WorkCategory[] = [
  {
    slug: "digital",
    title: "Digital",
    intro: "painted on screen, from cold snow to high summer light.",
    coverArt: heart,
    works: [
      {
        title: "Fox", medium: "Digital painting", src: fox, width: 1600, height: 1600,
        desc: "A fox folds itself into a birdcage far too small for it, eyes closed, snow settling on its fur.",
      },
      {
        title: "Heart", medium: "Digital painting", src: heart, width: 1600, height: 1600,
        desc: "A face tips back into the dark, its throat wound with a thorned red vine that ends in a small heart.",
      },
      {
        title: "Photo Life I", medium: "Digital painting", src: photoLife1, width: 1190, height: 1600,
        desc: "A domed brick church beside a tree lit yellow-green, its shadows pooling violet on a pink path.",
      },
      {
        title: "Photo Life II", medium: "Digital painting", src: photoLife2, width: 1600, height: 1067,
        desc: "A small white rabbit sits in a tray with an egg and a packet of Pepero, a close study of everyday things.",
      },
    ],
  },
  {
    slug: "handmade",
    title: "Handmade",
    intro: "prints, collage and small constructions, cut and carved by hand.",
    coverArt: eagleMask,
    works: [
      {
        title: "Eagle Mask", medium: "Relief print on paper", src: eagleMask, width: 1091, height: 1600,
        desc: "A raptor's stare held inside a rounded mask, its feathers cut as sharp, radiating strokes.",
      },
      {
        title: "Tangled Logs", medium: "Linocut on paper", src: tangledLogs, width: 1121, height: 1600,
        desc: "A mushroom-capped figure winds its soft limbs through cut logs, pale against a speckled black ground.",
      },
      {
        title: "The Farmer and Snake", medium: "Cut-paper collage", src: farmerSnake, width: 1600, height: 1251,
        desc: "The fable told in cut paper and ransom-note letters, with the snake lying stiff at the water's edge.",
      },
      {
        title: "Mirror Portrait", medium: "Felt, foil, rope and crystals", src: mirrorPortrait, width: 1195, height: 1600,
        desc: "Inside a crumpled gold and silver frame, a felt figure's face is hidden behind a red shape bound with rope.",
      },
      {
        title: "Horned Mask", medium: "Carved relief in black and white", src: hornedMask, width: 1115, height: 1600,
        desc: "A horned guardian with ringed eyes and bared teeth, diamonds and beads running down its beard.",
      },
      {
        title: "Bound", medium: "Paint, modelled insects and red thread, framed", src: bound, width: 1254, height: 1600,
        desc: "Red thread ties two sculpted black insects to the quiet portrait held between them.",
      },
    ],
  },
  {
    slug: "handwork",
    title: "Handwork",
    intro: "acrylic and watercolour, painted slowly by hand.",
    coverArt: rosesSill,
    works: [
      {
        title: "Roses at the Sill", medium: "Acrylic", src: rosesSill, width: 1331, height: 1600,
        desc: "A figure in a white shirt sleeps against a ledge, fingers just reaching a spill of roses.",
      },
      {
        title: "The Sitting", medium: "Acrylic", src: theSitting, width: 1600, height: 1354,
        desc: "A seated figure in turquoise and orange looks away while a man in braces waits behind, beside a sketch on an easel.",
      },
      {
        title: "Gilded Scroll", medium: "Acrylic with gold", src: gildedScroll, width: 1363, height: 1600,
        desc: "A young figure in red and gold raises one hand before a vast stone face weeping a single red tear.",
      },
      {
        title: "Yellow Ground", medium: "Watercolour on paper", src: yellowGround, width: 1216, height: 1588,
        desc: "A close portrait in translucent washes, green hair running to violet against a grainy yellow field.",
      },
    ],
  },
];
