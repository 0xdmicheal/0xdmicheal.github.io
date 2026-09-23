import { motion, useMotionValue } from "motion/react";
import { useState } from "react";

const WORK = [
  {
    id: 1,
    title: "Insomnus",
    tag: "Graphic",
    href: "/work/insomnus.html",
    image: "/img/insomnus/hero.jpg",
  },
  {
    id: 2,
    title: "Somnia",
    tag: "Identity",
    href: "/work/somnia.html",
    image: "/img/somnia/field.jpg",
  },
  {
    id: 3,
    title: "MegaETH",
    tag: "Brand",
    href: "/work/megaeth.html",
    image: "/img/megaeth/fluffey.png",
  },
  {
    id: 4,
    title: "Some Gorillas",
    tag: "Character",
    href: "/work/somegorillas.html",
    image: "/img/gorillas/gangsta.jpg",
  },
];

const MAX_DRAG = 120;

function Card({ children, onToss }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      style={{ x, y }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > MAX_DRAG || Math.abs(info.offset.y) > MAX_DRAG) {
          onToss();
        } else {
          x.set(0);
          y.set(0);
        }
      }}
      className="absolute inset-0 cursor-grab"
    >
      {children}
    </motion.div>
  );
}

export function RevealingWork() {
  const [cards, setCards] = useState(WORK);

  const toss = (id) => {
    setCards((prev) => {
      const next = [...prev];
      const index = next.findIndex((card) => card.id === id);
      const [card] = next.splice(index, 1);
      next.unshift(card);
      return next;
    });
  };

  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative h-[340px] w-[280px] sm:h-[400px] sm:w-[320px]">
        {cards.map((card, index) => (
          <Card key={card.id} onToss={() => toss(card.id)}>
            <motion.a
              href={card.href}
              animate={{
                rotateZ: -(cards.length - index - 1) * 8,
                scale: 1 + index * 0.06 - cards.length * 0.06,
              }}
              initial={false}
              transition={{ type: "spring", bounce: 0.12, duration: 0.5 }}
              className="flex size-full overflow-hidden rounded-[28px] bg-[#0e0d0b] shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
              style={{ transformOrigin: "50% 100%" }}
            >
              <img src={card.image} alt="" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="text-xs tracking-[0.16em] text-[#d6ff32] uppercase">{card.tag}</p>
                <p className="font-serif text-2xl text-[#f3eee4]">{card.title}</p>
              </div>
            </motion.a>
          </Card>
        ))}
      </div>
    </div>
  );
}
