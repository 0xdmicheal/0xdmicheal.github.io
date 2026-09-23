import { Pencil, Megaphone, Sparkles, ArrowRight } from "lucide-react";
import { MorphingButton } from "./morphing-button.jsx";
import { HeroCarousel, HeroStrip } from "./hero-carousel.jsx";

const FEATURES = [
  { icon: Pencil, title: "Graphic design", detail: "Posters, marks, worlds" },
  { icon: Megaphone, title: "Marketing design", detail: "Campaigns that convert" },
  { icon: Sparkles, title: "Pixel & character", detail: "Hands on in Aseprite" },
];

export function StudioHero() {
  return (
    <section className="relative px-[var(--space,1.5rem)] pt-4 pb-10">
      <div className="pointer-events-none absolute inset-0 z-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(20,19,17,0.07)_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-[#1e4bff] uppercase">
            Graphic designer · Creative director
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2rem,1.1rem+3.2vw,3.7rem)] leading-[1.08] tracking-tight text-[#141311]">
            I don’t just market projects.
            <br />
            <em className="text-[#1e4bff]">I help them become movements.</em>
          </h1>
          <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-[#3c3933]">
            Graphic design for startups — marks, posters, campaign systems, and the visual world a
            product lives in. Five-plus years of growth marketing: shipped brands, sold-out
            launches, and worlds people actually entered.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="/work.html"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-[#141311] bg-[#fffaf2] px-5 text-sm font-semibold text-[#141311]"
            >
              See selected work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <MorphingButton
              onSubmit={(email) => {
                window.location.href = `mailto:decentralizedmicheal@gmail.com?subject=${encodeURIComponent("Project")}&body=${encodeURIComponent(email)}`;
              }}
            />
          </div>
        </div>
        <div className="flex min-h-[420px] items-center justify-center py-6">
          <HeroCarousel />
        </div>
      </div>
      <div className="relative z-10 mx-auto mt-6 flex max-w-[1180px] flex-wrap gap-6 sm:gap-10">
        {FEATURES.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#fffaf2] text-[#141311] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08)]">
              <item.icon className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#141311]">{item.title}</span>
              <span className="block text-xs text-[#7a7368]">{item.detail}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <HeroStrip />
      </div>
    </section>
  );
}
