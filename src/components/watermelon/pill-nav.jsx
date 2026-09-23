import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/work.html", label: "Work", match: "/work" },
  { href: "/about.html", label: "About", match: "/about" },
  { href: "/contact.html", label: "Contact", match: "/contact" },
];

function isActive(match) {
  const path = window.location.pathname;
  return path === match || path.startsWith(`${match}.html`) || path.startsWith(`${match}/`);
}

export function PillNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-shell">
      <div className="pointer-events-auto w-full max-w-3xl">
        <div className="flex h-14 items-center justify-between gap-2 rounded-full border border-[#d5ccbc] bg-[#fffaf2]/90 pr-2 pl-5 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <a
            href="/"
            className="rounded-full px-2 py-1 font-[Syne,system-ui,sans-serif] text-[15px] font-extrabold tracking-tight text-[#141311] outline-none focus-visible:shadow-[0_0_0_2px_#1e4bff]"
          >
            Michael
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => {
              const active = isActive(link.match);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative rounded-full px-4 py-1.5 text-sm font-medium outline-none focus-visible:shadow-[0_0_0_2px_#1e4bff]"
                  style={{ color: active ? "#fff" : "#3c3933" }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-[#141311]"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-1">
            <a
              href="/contact.html"
              className="hidden rounded-full bg-[#1e4bff] px-4 py-2 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none focus-visible:shadow-[0_0_0_2px_#1e4bff] md:inline-flex"
            >
              Start a project
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="flex size-10 items-center justify-center rounded-full text-[#141311] md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="mt-2 rounded-[1.5rem] border border-[#d5ccbc] bg-[#fffaf2] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.1)] md:hidden">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#141311]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact.html"
              className="mt-1 flex items-center justify-center rounded-full bg-[#1e4bff] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Start a project
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
