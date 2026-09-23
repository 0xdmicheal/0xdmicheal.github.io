import { FiArrowRight } from "react-icons/fi";
import { FaStar, FaCircle } from "react-icons/fa";

const AVATARS = [
  { src: "/img/insomnus/hero.jpg", alt: "Insomnus" },
  { src: "/img/megaeth/fluffey.png", alt: "MegaETH" },
  { src: "/img/gorillas/gangsta.jpg", alt: "Gorillas" },
  { src: "/img/pixel/punk.png", alt: "Punk" },
];

export function CtaBlock() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.12)_1px,transparent_0)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" />
      <div className="relative z-10 w-full max-w-3xl px-6 py-16 text-center sm:px-16 sm:py-20">
        <div className="mb-7 flex justify-center">
          <span className="flex items-center gap-1.5 rounded-full bg-[#e8e0d2] px-3 py-1 text-[10px] font-medium tracking-widest text-[#3c3933] uppercase">
            <FaCircle className="animate-pulse text-[6px] text-[#1e4bff]" />
            Open for new work
          </span>
        </div>
        <h2 className="mb-5 font-serif text-4xl leading-[1.08] tracking-tight text-[#141311] sm:text-5xl md:text-6xl">
          Need a creative who
          <br />
          can also <span className="text-[#1e4bff]/80 italic">grow the thing?</span>
        </h2>
        <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-[#3c3933]">
          Graphic design, brand, and campaign work for startups, games, and launches that have to move people.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="/contact.html"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#141311] px-6 py-3 text-sm font-semibold text-[#f3eee4] shadow-[inset_0_0.5px_0px_rgba(255,255,255,0.35),inset_0_-0.5px_0px_rgba(0,0,0,0.3)] sm:w-auto"
          >
            Start a project
            <FiArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="/work.html"
            className="inline-flex w-full items-center justify-center rounded-md bg-[#fffaf2] px-6 py-3 text-sm font-medium text-[#3c3933] shadow-[inset_0_0.5px_0px_rgba(255,255,255,0.8),0_0_0_1px_rgba(0,0,0,0.08)] sm:w-auto"
          >
            See selected work
          </a>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2.5 text-xs text-[#7a7368]">
          <div className="flex items-center">
            {AVATARS.map((a, i) => (
              <img
                key={a.alt}
                src={a.src}
                alt=""
                className={`h-7 w-7 rounded-full border-2 border-[#f3eee4] object-cover ${i ? "-ml-2" : ""}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-[2px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="text-[11px] text-yellow-400" />
            ))}
          </div>
          <span>Five-plus years of shipped brand work</span>
        </div>
      </div>
    </section>
  );
}
