import { useState } from "react";
import { motion } from "motion/react";

export function FluidTabs({ tabs, defaultActive, onChange }) {
  const [active, setActive] = useState(defaultActive ?? tabs[0]?.id);

  const handleChange = (id) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div className="relative inline-flex items-center gap-1 rounded-full border border-[#d5ccbc] bg-[#fffaf2] px-1 py-1">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleChange(tab.id)}
            className="group relative rounded-full px-4 py-2.5 outline-none"
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                transition={{ type: "spring", stiffness: 280, damping: 25, mass: 0.8 }}
                className="absolute inset-0 rounded-full bg-[#141311]"
              />
            )}
            <span
              className={`relative z-10 text-sm font-semibold tracking-tight ${
                isActive ? "text-[#f3eee4]" : "text-[#3c3933]"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
