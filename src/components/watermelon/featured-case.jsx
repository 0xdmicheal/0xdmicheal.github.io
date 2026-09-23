import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const layoutId = "featured-insomnus";

export function FeaturedCase() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-[1180px] px-[var(--space,1.5rem)] py-6">
        <motion.button
          type="button"
          layoutId={layoutId}
          onClick={() => setOpen(true)}
          className="group relative w-full cursor-pointer overflow-hidden rounded-[1.75rem] border border-[#d5ccbc] bg-[#0e0d0b] text-left shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
        >
          <motion.div layoutId={`${layoutId}-media`} className="relative h-[22rem] w-full sm:h-[28rem]">
            <motion.img
              layoutId={`${layoutId}-img`}
              src="/img/insomnus/hero.jpg"
              alt="Insomnus key art"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0b] via-[#0e0d0b]/25 to-transparent" />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <motion.p
              layoutId={`${layoutId}-kicker`}
              className="font-mono text-[10px] tracking-[0.18em] text-[#d6ff32] uppercase"
            >
              Featured · 2025–now
            </motion.p>
            <motion.h2 layoutId={`${layoutId}-title`} className="mt-1 font-serif text-4xl text-[#f3eee4] sm:text-5xl">
              Insomnus
            </motion.h2>
            <p className="mt-2 max-w-xl text-sm text-[#f3eee4]/75">
              195,000+ registered users. Click to open the case.
            </p>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-[#0e0d0b]/70 backdrop-blur-md"
            />
            <motion.div
              layoutId={layoutId}
              className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-[#d5ccbc] bg-[#fffaf2] shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-20 flex size-8 items-center justify-center rounded-full bg-[#0e0d0b]/50 text-[#f3eee4]"
                aria-label="Close"
              >
                ×
              </button>
              <motion.div layoutId={`${layoutId}-media`} className="relative h-56 shrink-0 sm:h-72">
                <motion.img
                  layoutId={`${layoutId}-img`}
                  src="/img/insomnus/hero.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <div className="overflow-y-auto p-6 sm:p-8">
                <motion.p
                  layoutId={`${layoutId}-kicker`}
                  className="font-mono text-[10px] tracking-[0.18em] text-[#1e4bff] uppercase"
                >
                  Featured · 2025–now
                </motion.p>
                <motion.h2 layoutId={`${layoutId}-title`} className="mt-1 font-serif text-4xl text-[#141311]">
                  Insomnus
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-4 text-[#3c3933]"
                >
                  <p>
                    A dark pixel roguelike I lead as Creative Asset & Marketing Lead — brand, posters,
                    in-game art, community, and growth. Legal partnership with Somnia. MegaETH grants.
                    Gate Labs as technical advisor. 195,000+ registered users.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Art direction", "Campaign design", "Pixel art", "Growth"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#d5ccbc] px-3 py-1 font-mono text-[10px] tracking-wider text-[#3c3933] uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="/work/insomnus.html"
                    className="inline-flex rounded-full bg-[#141311] px-5 py-2.5 text-sm font-semibold text-[#f3eee4]"
                  >
                    Read the case
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
