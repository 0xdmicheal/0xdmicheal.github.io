import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "motion/react";

const SLIDES = [
  { id: 1, img: "/img/insomnus/hero.jpg", title: "Insomnus", href: "/work/insomnus.html" },
  { id: 2, img: "/img/gorillas/kit/mage.jpg", title: "Some Gorillas", href: "/work/somegorillas.html" },
  { id: 3, img: "/img/mintpark/kit/ice-mark.jpg", title: "Mintpark", href: "/work/mintpark.html" },
  { id: 4, img: "/img/gorillas/kit/dracula.jpg", title: "Cast", href: "/work/somegorillas.html" },
  { id: 5, img: "/img/somnia/field.jpg", title: "Somnia", href: "/work/somnia.html" },
  { id: 6, img: "/img/gorillas/kit/criminal.jpg", title: "Characters", href: "/work/somegorillas.html" },
  { id: 7, img: "/img/mintpark/kit/hemi.jpg", title: "Hemi", href: "/work/mintpark.html" },
  { id: 8, img: "/img/gorillas/kit/prison.jpg", title: "Prison", href: "/work/somegorillas.html" },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 160 : -160,
    scale: 0.9,
    opacity: 0,
    rotate: direction > 0 ? 12 : -12,
  }),
  center: { x: 0, scale: 1, opacity: 1, rotate: -1.5, zIndex: 5 },
  exit: (direction) => ({
    x: direction > 0 ? -160 : 160,
    scale: 0.9,
    opacity: 0,
    rotate: direction > 0 ? -12 : 12,
    zIndex: 0,
  }),
};

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 200], [-10, 10]);
  const slide = SLIDES[index];
  const dragged = useRef(false);
  const prev = SLIDES[(index - 1 + SLIDES.length) % SLIDES.length];
  const next = SLIDES[(index + 1) % SLIDES.length];

  const paginate = (dir) => {
    setDirection(dir);
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="relative mx-auto aspect-[4/5] w-[230px] sm:w-[290px] lg:w-[320px]">
        <div className="absolute top-5 left-[-18%] z-0 h-[88%] w-full -rotate-[11deg] overflow-hidden rounded-[26px] border-[5px] border-[#fffaf2] bg-[#0e0d0b] shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
          <img src={prev.img} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute top-7 right-[-18%] z-0 h-[88%] w-full rotate-[12deg] overflow-hidden rounded-[26px] border-[5px] border-[#fffaf2] bg-[#0e0d0b] shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
          <img src={next.img} alt="" className="h-full w-full object-cover" />
        </div>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slide.id}
            role="link"
            tabIndex={0}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", bounce: 0.16, duration: 0.45 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ rotate, x: dragX }}
            onDragStart={() => {
              dragged.current = true;
            }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -90) paginate(1);
              else if (info.offset.x > 90) paginate(-1);
              setTimeout(() => {
                dragged.current = false;
              }, 0);
            }}
            onClick={() => {
              if (!dragged.current) window.location.href = slide.href;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") window.location.href = slide.href;
            }}
            className="absolute inset-0 z-10 cursor-grab overflow-hidden rounded-[26px] border-[6px] border-[#fffaf2] bg-[#0e0d0b] shadow-[0_24px_50px_rgba(0,0,0,0.28)] active:cursor-grabbing"
          >
            <img src={slide.img} alt="" draggable={false} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0e0d0b] to-transparent p-4">
              <p className="font-serif text-2xl text-[#f3eee4]">{slide.title}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-5 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={s.title}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-[#141311]" : "bg-[#d5ccbc]"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroStrip() {
  const frames = [...SLIDES, ...SLIDES, ...SLIDES];
  return (
    <div className="relative mt-8 h-24 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex h-24 w-max gap-3"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {frames.map((s, i) => (
          <a
            key={`${s.id}-${i}`}
            href={s.href}
            className="block h-24 w-36 shrink-0 overflow-hidden rounded-xl border-[3px] border-[#fffaf2] bg-[#0e0d0b] shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
          >
            <img src={s.img} alt={s.title} className="h-full w-full object-cover" />
          </a>
        ))}
      </motion.div>
    </div>
  );
}
