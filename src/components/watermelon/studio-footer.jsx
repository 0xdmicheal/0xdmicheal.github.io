import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa6";

const columns = [
  {
    title: "Work",
    links: [
      { label: "Insomnus", href: "/work/insomnus.html" },
      { label: "Somnia", href: "/work/somnia.html" },
      { label: "MegaETH", href: "/work/megaeth.html" },
      { label: "All work", href: "/work.html" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "/about.html" },
      { label: "Contact", href: "/contact.html" },
      { label: "Start a project", href: "/contact.html" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "X", href: "https://x.com/MichealOnChain" },
      { label: "Telegram", href: "https://t.me/oxdmicheal" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/michealnumads" },
      { label: "Email", href: "mailto:decentralizedmicheal@gmail.com" },
    ],
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.6, bounce: 0 },
  },
};

export function StudioFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full overflow-hidden rounded-t-[2.5rem] bg-[#0e0d0b] md:rounded-t-[3rem]">
      <motion.div
        variants={stagger}
        initial={false}
        animate="visible"
        className="px-6 pt-10 pb-0 sm:px-10 sm:pt-14 lg:px-14 lg:pt-16"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 lg:flex-row lg:gap-16">
          <motion.div variants={rise} className="flex shrink-0 flex-col gap-5 lg:max-w-[260px]">
            <span className="text-lg font-medium tracking-wide text-[#e8e0cc] uppercase">Michael</span>
            <p className="text-sm leading-[1.6] font-light text-[#a8a08c]">
              Graphic designer and creative director. Marks, posters, and campaign systems for startups.
            </p>
            <motion.a
              href="/contact.html"
              whileTap={{ scale: 0.96 }}
              className="group mt-1 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#d6ff32] py-0.5 pr-1 pl-5"
            >
              <span className="text-sm font-medium" style={{ color: "#0e0d0b" }}>Start a project</span>
              <span className="flex size-10 items-center justify-center rounded-full bg-[#141311]">
                <FaArrowRight className="size-4 text-[#f3eee4] transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
            <p className="text-xs text-[#7a7368]">© {year} Khureltulga Gantsetseg</p>
          </motion.div>
          <nav
            aria-label="Footer"
            className="grid w-full max-w-[540px] grid-cols-2 gap-y-8 sm:grid-cols-3"
          >
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[#e8e0cc]">{col.title}</h3>
                <ul className="mt-3 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm"
                        style={{ color: "#e8e0cc" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: "spring", duration: 1.1, bounce: 0 }}
        className="relative flex items-end justify-center overflow-hidden px-4 pt-10 md:pt-16"
      >
        <svg
          className="h-auto w-full translate-y-2 select-none md:translate-y-4"
          viewBox="0 0 900 110"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Michael"
        >
          <text
            x="50%"
            y="100%"
            dominantBaseline="alphabetic"
            textAnchor="middle"
            textLength="95%"
            lengthAdjust="spacing"
            fill="#e8e0cc"
            fontSize="150"
            fontFamily="Syne, system-ui, sans-serif"
            fontWeight="700"
          >
            MICHAEL
          </text>
        </svg>
      </motion.div>
    </footer>
  );
}
