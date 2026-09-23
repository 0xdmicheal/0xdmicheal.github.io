import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const spring = { type: "spring", stiffness: 240, damping: 18, mass: 1.1 };

export function MorphingButton({
  buttonText = "Start a project",
  placeholder = "Your email",
  onSubmit,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isExpanded && inputRef.current) inputRef.current.focus();
  }, [isExpanded]);

  const go = () => {
    if (!email) return;
    onSubmit?.(email);
    setIsExpanded(false);
    setEmail("");
  };

  return (
    <div ref={containerRef} className="relative h-11 w-[9.75rem] shrink-0">
      <motion.div
        layout
        transition={spring}
        style={{ borderRadius: 9999, overflow: "hidden" }}
        className={`absolute top-0 left-0 z-20 flex h-11 items-center rounded-full border border-[#141311] ${
          isExpanded ? "bg-[#fffaf2] p-1" : "bg-[#1e4bff]"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {isExpanded && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex h-9 flex-1 items-center rounded-full px-4"
            >
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="h-9 w-52 rounded-full bg-transparent text-sm font-semibold text-[#141311] outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") go();
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          layout
          type="button"
          onClick={(e) => {
            if (!isExpanded) {
              e.stopPropagation();
              setIsExpanded(true);
            } else {
              go();
            }
          }}
          transition={spring}
          style={{ borderRadius: 9999 }}
          className={`relative flex items-center justify-center rounded-full bg-[#1e4bff] px-5 text-sm font-semibold whitespace-nowrap text-white outline-none ${
            isExpanded ? "h-9" : "h-11"
          }`}
        >
          <motion.span layout="position">{isExpanded ? "Send" : buttonText}</motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}
