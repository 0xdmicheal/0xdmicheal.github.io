import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";

const CARDS = [
  { id: 0, value: "195k+", label: "Registered players on Insomnus" },
  { id: 1, value: "8.8k+", label: "Team Alpha research community" },
  { id: 2, value: "$500k+", label: "Airdrop a community actually claimed" },
  { id: 3, value: "10–12", label: "Web3 projects taken to market" },
];

const DRAG_BUFFER = 60;
const VELOCITY_THRESHOLD = 500;

function WigglingCard({ card, i, x, cardWidth, gap }) {
  const center = -(i * (cardWidth + gap));
  const distance = useTransform(x, (v) => v - center);
  const rotate = useTransform(distance, [-cardWidth, 0, cardWidth], [10, 0, -10]);
  const blur = useTransform(distance, [-cardWidth, 0, cardWidth], [4, 0, 4]);
  const opacity = useTransform(distance, [-cardWidth, 0, cardWidth], [0.2, 1, 0.2]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{ opacity, rotate, filter, minWidth: cardWidth }}
      className="relative flex h-64 flex-col justify-between rounded-[32px] border border-[#d5ccbc] bg-[#fffaf2] p-6"
    >
      <p className="font-serif text-5xl tracking-tight text-[#141311]">{card.value}</p>
      <p className="text-lg text-[#3c3933]">{card.label}</p>
    </motion.div>
  );
}

export function WigglingProof() {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(280);
  const gap = 48;
  const x = useMotionValue(0);

  useEffect(() => {
    const update = () => setCardWidth(window.innerWidth < 640 ? 260 : 300);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="flex flex-col items-center py-6">
      <div style={{ width: cardWidth }} className="relative overflow-visible">
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{
            left: -(CARDS.length - 1) * (cardWidth + gap),
            right: 0,
          }}
          style={{ x, gap: `${gap}px` }}
          animate={{ x: -(index * (cardWidth + gap)) }}
          transition={{ type: "spring", stiffness: 300, damping: 40 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -DRAG_BUFFER || info.velocity.x < -VELOCITY_THRESHOLD) {
              setIndex((prev) => Math.min(prev + 1, CARDS.length - 1));
            } else if (info.offset.x > DRAG_BUFFER || info.velocity.x > VELOCITY_THRESHOLD) {
              setIndex((prev) => Math.max(prev - 1, 0));
            }
          }}
        >
          {CARDS.map((card, i) => (
            <WigglingCard
              key={card.id}
              card={card}
              i={i}
              x={x}
              cardWidth={cardWidth}
              gap={gap}
            />
          ))}
        </motion.div>
      </div>
      <div className="mt-6 flex gap-2">
        {CARDS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show stat ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-[#141311]" : "bg-[#d5ccbc]"}`}
          />
        ))}
      </div>
    </div>
  );
}
