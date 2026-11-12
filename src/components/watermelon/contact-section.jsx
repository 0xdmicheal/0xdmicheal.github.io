import { FaCircle } from "react-icons/fa";
import { IoMail, IoPaperPlane, IoLogoTwitter, IoCall, IoLogoLinkedin } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";

const CHANNELS = [
  {
    id: "email",
    icon: IoMail,
    title: "Email",
    handle: "decentralizedmicheal@gmail.com",
    href: "mailto:decentralizedmicheal@gmail.com",
    note: "I read everything myself.",
  },
  {
    id: "telegram",
    icon: IoPaperPlane,
    title: "Telegram",
    handle: "@oxdmicheal",
    href: "https://t.me/oxdmicheal",
    note: "Fastest if the launch is already moving.",
  },
  {
    id: "x",
    icon: IoLogoTwitter,
    title: "X",
    handle: "@MichealOnChain",
    href: "https://x.com/MichealOnChain",
    note: "Work in public. DMs open.",
  },
  {
    id: "linkedin",
    icon: IoLogoLinkedin,
    title: "LinkedIn",
    handle: "michealnumads",
    href: "https://www.linkedin.com/in/michealnumads",
    note: "For longer conversations.",
  },
  {
    id: "phone",
    icon: IoCall,
    title: "Phone",
    handle: "+976 6610 6688",
    href: "tel:+97666106688",
    note: "Ulaanbaatar time. Also +976 8918 1776.",
  },
];

export function ContactSection() {
  return (
    <section className="relative overflow-hidden px-[var(--space,1.5rem)] pt-6 pb-8">
      <div className="pointer-events-none absolute inset-0 z-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(20,19,17,0.07)_1px,transparent_0)] [background-size:22px_22px] [mask-image:radial-gradient(circle_at_center,black_0%,transparent_72%)]" />
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="mb-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8e0d2] px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-[#3c3933] uppercase">
            <FaCircle className="animate-pulse text-[6px] text-[#1e4bff]" />
            Open for new work
          </span>
          <h1 className="mt-4 font-serif text-[clamp(2.6rem,1.3rem+5vw,5.2rem)] leading-[0.92] tracking-tight text-[#141311]">
            Start a project.
          </h1>
          <p className="mt-4 max-w-xl text-[1.08rem] leading-relaxed text-[#3c3933]">
            Brand, campaign, art direction, pixel worlds. If you need a creative who can also grow
            the thing, write. I read everything myself.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <ul className="space-y-5 text-[#3c3933]" style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
              <li>
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#1e4bff] uppercase">Where</p>
                <p className="mt-1 text-lg font-medium text-[#141311]">Ulaanbaatar · remote-ready</p>
                <p className="text-sm">Songinokhairkhan. UTC+8. I work async with teams anywhere.</p>
              </li>
              <li>
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#1e4bff] uppercase">What to send</p>
                <p className="mt-1 text-lg font-medium text-[#141311]">The brief, the date, what good looks like</p>
                <p className="text-sm">A link, a folder, a paragraph. Enough to know if I should jump on a call.</p>
              </li>
              <li>
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#1e4bff] uppercase">Reply</p>
                <p className="mt-1 text-lg font-medium text-[#141311]">A few days, usually faster</p>
                <p className="text-sm">Telegram if the window is already closing. Email for the proper brief.</p>
              </li>
            </ul>
          </div>

          <ul
            className="overflow-hidden rounded-[1.75rem] border border-[#d5ccbc] bg-[#fffaf2] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_16px_40px_rgba(0,0,0,0.06)]"
            style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}
          >
            {CHANNELS.map((ch, i) => (
              <li key={ch.id} className={i ? "border-t border-[#e6dece]" : undefined}>
                <a
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#f3eee4] sm:px-6"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f3eee4] text-[#141311] group-hover:bg-[#e8e0d2]">
                    <ch.icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[#141311]">{ch.title}</span>
                    <span className="block font-mono text-[11px] break-words text-[#3c3933]">{ch.handle}</span>
                    <span className="mt-0.5 block text-xs text-[#7a7368]">{ch.note}</span>
                  </span>
                  <FaArrowRight className="size-3.5 shrink-0 text-[#7a7368] transition-transform group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
