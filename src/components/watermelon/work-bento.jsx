

const PROJECTS = [
  {
    id: "insomnus",
    href: "/work/insomnus.html",
    image: "/img/insomnus/kit/creation.jpg",
    alt: "Insomnus key art",
    tag: "Graphic · Campaign",
    title: "Insomnus",
    copy: "Art direction, campaign system, and growth — 195k+ registered users.",
  },
  {
    id: "somnia",
    href: "/work/somnia.html",
    image: "/img/somnia/field.jpg",
    alt: "Somnia field graphic",
    tag: "Identity",
    title: "Somnia Network",
    copy: "Design system — logomark, wordmark, token marks.",
  },
  {
    id: "megaeth",
    href: "/work/megaeth.html",
    image: "/img/megaeth/fluffey.png",
    alt: "MegaETH Fluffey mascot",
    tag: "Brand",
    title: "MegaETH",
    copy: "Wordmark, mascot, campaign graphic.",
  },
  {
    id: "gorillas",
    href: "/work/somegorillas.html",
    image: "/img/gorillas/kit/mage.jpg",
    alt: "Some Gorillas mage",
    tag: "Character",
    title: "Some Gorillas",
    copy: "Collection identity and characters.",
  },
  {
    id: "mintpark",
    href: "/work/mintpark.html",
    image: "/img/mintpark/kit/ice-mark.jpg",
    alt: "Mintpark ice mark",
    tag: "Product · Brand",
    title: "Mintpark",
    copy: "Bitcoin L2 marketplace. 90k+ registered, 10k MAU on Hemi, Core, and Citrea.",
  },
  {
    id: "ordinals",
    href: "/work/ordinals.html",
    image: "/img/pixel/punk.png",
    alt: "Ordinal punk character",
    tag: "Launch",
    title: "Ordinals",
    copy: "One of Mongolia’s first Bitcoin Ordinals collections.",
  },
  {
    id: "highball",
    href: "/work.html",
    image: "/img/highball/character.png",
    alt: "Highball pixel character",
    tag: "Pixel · UI",
    title: "Highball",
    copy: "Pixel character and game UI language.",
    pixel: true,
  },
  {
    id: "nomin",
    href: "/work.html",
    image: "/img/nomin/logo.jpg",
    alt: "Nomin Shaglaa mark",
    tag: "Identity",
    title: "Nomin Shaglaa",
    copy: "Mark work — mountain, moon, fire, Mongolian letterforms.",
  },
  {
    id: "insomnus-world",
    href: "/work/insomnus.html",
    image: "/img/insomnus/gameplay.gif",
    alt: "Insomnus pixel world",
    tag: "Pixel · World",
    title: "Insomnus world",
    copy: "Tiles, atmosphere, and the dungeon itself.",
  },
];

function Card({ project }) {
  return (
    <a
      href={project.href}
      className="group block rounded-[1.6rem] border border-[#d5ccbc] bg-[#fffaf2] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_10px_28px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-[#0e0d0b]">
        <img
          src={project.image}
          alt={project.alt}
          className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.04] ${
            project.pixel ? "object-contain p-10" : "object-cover"
          }`}
          style={project.pixel ? { imageRendering: "pixelated" } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0b] via-[#0e0d0b]/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-serif text-2xl leading-none text-[#f3eee4]">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-[#f3eee4]/75">{project.copy}</p>
        </div>
      </div>
    </a>
  );
}

export function WorkGallery({ home = false }) {
  const items = home ? PROJECTS.filter((p) => p.id !== "insomnus").slice(0, 6) : PROJECTS;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((project) => (
        <Card key={project.id} project={project} />
      ))}
    </div>
  );
}

export function WorkBento() {
  return <WorkGallery home />;
}
