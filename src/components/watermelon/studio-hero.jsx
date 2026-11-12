import { Pencil, Megaphone, Sparkles, ArrowRight } from "lucide-react";
import { MorphingButton } from "./morphing-button.jsx";
import { HeroStrip } from "./hero-carousel.jsx";
import { PixelPress } from "./pixel-press.jsx";

const FEATURES = [
  { icon: Pencil, title: "Graphic design", detail: "Posters, marks, worlds" },
  { icon: Megaphone, title: "Marketing design", detail: "Campaigns that convert" },
  { icon: Sparkles, title: "Pixel & character", detail: "Hands on in Aseprite" },
];

export function StudioHero() {
  return (
    <section className="hero-u relative overflow-x-clip px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 z-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(20,19,17,0.07)_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      <div className="hero-u-grid relative z-10 mx-auto max-w-[1400px]">
        <div className="hero-u-copy">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d5ccbc] bg-[#fffaf2] px-3 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-[#3c3933] uppercase">
            <span className="size-1.5 rounded-full bg-[#1e4bff]" />
            Open for new work · Ulaanbaatar
          </span>
          <h1 className="hero-u-title">
            <span>I don’t just</span>
            <span>market projects.</span>
            <em>I help them</em>
            <em>become movements.</em>
          </h1>
          <p className="hero-u-meta">
            {FEATURES.map((item) => item.title).join(" · ")}
          </p>
          <p className="max-w-[25rem] text-[0.9rem] leading-relaxed text-[#3c3933]">
            Graphic design for startups — marks, posters, campaign systems, and the visual world a
            product lives in. Five-plus years of growth marketing: shipped brands, sold-out
            launches, and worlds people actually entered.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
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
        <div className="hero-u-art">
          <PixelPress bare />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <HeroStrip />
      </div>
    </section>
  );
}
