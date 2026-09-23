import { FaStar } from "react-icons/fa";
import { HiUsers, HiShoppingBag, HiCube } from "react-icons/hi2";

const stats = [
  {
    icon: HiUsers,
    iconColor: "#1e4bff",
    label: "Insomnus",
    sublabel: "Players",
    badgeBg: "rgba(30,75,255,0.1)",
    badgeBorder: "rgba(30,75,255,0.3)",
    badgeText: "#1638c9",
    metric: "195k",
    metricSuffix: "+",
    subtext: "Registered users",
    description: "A dark pixel roguelike I lead as Creative Asset & Marketing Lead — brand, posters, in-game art, community, and the growth engine behind it.",
    starColor: "text-[#1e4bff]",
    gradient:
      "repeating-linear-gradient(135deg, rgba(30,75,255,0.08) 0px, rgba(30,75,255,0.08) 1px, transparent 1px, transparent 6px, rgba(30,75,255,0.04) 6px, rgba(30,75,255,0.04) 7px, transparent 7px, transparent 12px)",
  },
  {
    icon: HiShoppingBag,
    iconColor: "#0e0d0b",
    label: "Team Alpha",
    sublabel: "Subscribers",
    badgeBg: "rgba(20,19,17,0.06)",
    badgeBorder: "rgba(20,19,17,0.18)",
    badgeText: "#141311",
    metric: "8.8k",
    metricSuffix: "+",
    subtext: "Web3 research community",
    description: "Built the community, the content, and the programs around airdrops, RWA, and new chains — including a $500k+ claim.",
    starColor: "text-[#141311]",
    gradient:
      "repeating-linear-gradient(135deg, rgba(20,19,17,0.06) 0px, rgba(20,19,17,0.06) 1px, transparent 1px, transparent 6px, rgba(20,19,17,0.03) 6px, rgba(20,19,17,0.03) 7px, transparent 7px, transparent 12px)",
  },
  {
    icon: HiCube,
    iconColor: "#c45a0a",
    label: "Mintpark",
    sublabel: "Marketplace",
    badgeBg: "rgba(196,90,10,0.08)",
    badgeBorder: "rgba(196,90,10,0.25)",
    badgeText: "#c45a0a",
    metric: "90k",
    metricSuffix: "+",
    subtext: "Registered · 10k MAU",
    description: "Bitcoin L2 marketplace I led as brand and partnerships — live on Hemi, Core, and Citrea. 90k+ registered, 10k monthly active.",
    starColor: "text-orange-500",
    gradient:
      "repeating-linear-gradient(135deg, rgba(196,90,10,0.08) 0px, rgba(196,90,10,0.08) 1px, transparent 1px, transparent 6px, rgba(196,90,10,0.04) 6px, rgba(196,90,10,0.04) 7px, transparent 7px, transparent 12px)",
  },
];

export function StatsGrid() {
  return (
    <div className="mx-auto max-w-6xl">
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2
          className="font-serif text-4xl tracking-tight text-[#141311] md:text-5xl"
          style={{ textAlign: "center" }}
        >
          Numbers the work actually made.
        </h2>
        <p
          className="text-[#3c3933]"
          style={{
            textAlign: "center",
            margin: "1rem auto 0",
            maxWidth: "32rem",
          }}
        >
          Players, registered users, monthly actives — graphic systems that had to perform in
          public, not sit in a pitch deck.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="group relative overflow-hidden rounded-[2rem] bg-[#fffaf2] p-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_8px_20px_rgba(0,0,0,0.08)]"
            style={{ backgroundImage: stat.gradient }}
          >
            <div className="flex h-full flex-col p-6 text-left">
              <div
                className="inline-flex w-fit items-center gap-3 rounded-xl px-3.5 py-2"
                style={{
                  backgroundColor: stat.badgeBg,
                  border: `1px solid ${stat.badgeBorder}`,
                }}
              >
                <stat.icon className="size-5 shrink-0" style={{ color: stat.iconColor }} />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-sm font-semibold" style={{ color: stat.badgeText }}>
                    {stat.label}
                  </span>
                  <span className="mt-0.5 font-mono text-[10px] tracking-widest text-[#7a7368] uppercase">
                    {stat.sublabel}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex items-baseline gap-0.5">
                <span className="font-serif text-6xl tracking-tight text-[#141311]">{stat.metric}</span>
                <span className="text-2xl font-medium text-[#7a7368]">{stat.metricSuffix}</span>
              </div>
              <p className="mt-5 text-sm font-semibold text-[#141311]">{stat.subtext}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3c3933]">{stat.description}</p>
              <div className="mt-auto flex gap-1 pt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className={`size-4 ${stat.starColor}`} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
