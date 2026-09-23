import {
  HiPencil,
  HiSpeakerphone,
  HiColorSwatch,
  HiSparkles,
  HiLightningBolt,
  HiUserGroup,
} from "react-icons/hi";

const inset =
  "flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_6px_0_rgba(0,0,0,0.07)]";
const chip =
  "inline-flex items-center rounded-md bg-white/80 px-2 py-1 text-[10px] font-medium text-[#3c3933] shadow-[inset_0px_2px_0_2px_rgba(255,255,255,1),0_1px_4px_0_rgba(0,0,0,0.05)]";
const card =
  "flex h-full flex-col rounded-3xl bg-[#e8e0d2]/50 p-6 transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]";

const ITEMS = [
  {
    icon: HiPencil,
    color: "text-orange-500",
    title: "Graphic design",
    copy: "Posters, key art, marks, and the visual world a product lives in. The thing people screenshot.",
    chip: "Photoshop · Illustrator · Aseprite",
  },
  {
    icon: HiSpeakerphone,
    color: "text-purple-500",
    title: "Marketing design",
    copy: "Launch kits, social systems, landing narratives, KOL packs. Creative that has to perform in a four-week window.",
    chip: "Discord · X · drop windows",
  },
  {
    icon: HiColorSwatch,
    color: "text-green-600",
    title: "Creative direction",
    copy: "Story, positioning, partnerships, and craft aligned so the brand doesn’t look like one thing and sell like another.",
    chip: "From first sketch to live campaign",
  },
  {
    icon: HiSparkles,
    color: "text-pink-500",
    title: "Pixel & character",
    copy: "Sprites, portraits, collection identity. Hands on in Aseprite — not just directed.",
    chip: "Aseprite · Tiled",
  },
  {
    icon: HiLightningBolt,
    color: "text-[#1e4bff]",
    title: "Launch systems",
    copy: "Whitepapers, Gitbook, decks, and the visual kit a drop actually ships with.",
    chip: "Story · assets · KOLs",
  },
  {
    icon: HiUserGroup,
    color: "text-amber-600",
    title: "Partnerships",
    copy: "Legal deals, grants, and co-marketing that sit next to the pictures — Somnia, MegaETH, Gate Labs, Marathon.",
    chip: "Startups · public companies",
  },
];

export function FeatureGrid() {
  return (
    <div className="flex w-full flex-col items-center">
      <header
        className="mb-10 w-full max-w-2xl"
        style={{ textAlign: "center", marginBottom: "2.5rem" }}
      >
        <h2
          className="font-serif text-3xl leading-[1.15] text-[#141311] md:text-5xl"
          style={{ textAlign: "center" }}
        >
          Graphic design first.
          <br />
          Growth attached.
        </h2>
        <p
          className="text-[#3c3933]"
          style={{ textAlign: "center", margin: "0.9rem auto 0", maxWidth: "28rem" }}
        >
          One seat for the pictures and the plan. That’s how the work ships.
        </p>
      </header>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item) => (
          <article key={item.title} className={card}>
            <div className="mb-3 size-fit rounded-lg bg-[#d5ccbc]/40 p-px">
              <div className={inset}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
            </div>
            <h3 className="text-lg font-medium text-[#141311]">{item.title}</h3>
            <p className="mb-4 flex-1 text-sm text-[#3c3933]">{item.copy}</p>
            <span className={chip}>{item.chip}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
