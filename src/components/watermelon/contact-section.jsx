import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { IoMail, IoPaperPlane, IoLogoTwitter, IoCall, IoLogoLinkedin } from "react-icons/io5";
import { MdPerson, MdMailOutline } from "react-icons/md";

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
  const [sent, setSent] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const kind = String(data.get("kind") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`${kind || "Project"} — ${name || "New inquiry"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nNeed: ${kind}\n\n${message}`);
    window.location.href = `mailto:decentralizedmicheal@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

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
            <ul className="space-y-5 text-[#3c3933]">
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

          <form
            onSubmit={onSubmit}
            className="rounded-[1.75rem] border border-[#d5ccbc] bg-[#fffaf2] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_16px_40px_rgba(0,0,0,0.06)] sm:p-8"
          >
            {sent && (
              <p className="mb-4 rounded-xl bg-[#dbe3ff] px-4 py-3 text-sm text-[#1638c9]">
                Your mail app should open with the brief filled in. If it doesn’t, email me directly.
              </p>
            )}
            <label className="mb-4 block">
              <span className="mb-1.5 block font-mono text-[10px] tracking-[0.16em] text-[#7a7368] uppercase">
                Name
              </span>
              <span className="relative block">
                <MdPerson className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#7a7368]" />
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="h-12 w-full rounded-xl border border-[#d5ccbc] bg-[#f3eee4] pr-4 pl-10 text-[#141311] outline-none focus:border-[#1e4bff] focus:shadow-[0_0_0_3px_rgba(30,75,255,0.15)]"
                />
              </span>
            </label>
            <label className="mb-4 block">
              <span className="mb-1.5 block font-mono text-[10px] tracking-[0.16em] text-[#7a7368] uppercase">
                Email
              </span>
              <span className="relative block">
                <MdMailOutline className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#7a7368]" />
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@studio.com"
                  className="h-12 w-full rounded-xl border border-[#d5ccbc] bg-[#f3eee4] pr-4 pl-10 text-[#141311] outline-none focus:border-[#1e4bff] focus:shadow-[0_0_0_3px_rgba(30,75,255,0.15)]"
                />
              </span>
            </label>
            <label className="mb-4 block">
              <span className="mb-1.5 block font-mono text-[10px] tracking-[0.16em] text-[#7a7368] uppercase">
                What do you need
              </span>
              <select
                name="kind"
                className="h-12 w-full rounded-xl border border-[#d5ccbc] bg-[#f3eee4] px-4 text-[#141311] outline-none focus:border-[#1e4bff] focus:shadow-[0_0_0_3px_rgba(30,75,255,0.15)]"
              >
                <option>Graphic design / campaign</option>
                <option>Art direction / brand</option>
                <option>Marketing design / launch</option>
                <option>Pixel art / game world</option>
                <option>Something else</option>
              </select>
            </label>
            <label className="mb-6 block">
              <span className="mb-1.5 block font-mono text-[10px] tracking-[0.16em] text-[#7a7368] uppercase">
                The brief
              </span>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="What you’re building, when it ships, and what good looks like."
                className="w-full resize-y rounded-xl border border-[#d5ccbc] bg-[#f3eee4] px-4 py-3 text-[#141311] outline-none focus:border-[#1e4bff] focus:shadow-[0_0_0_3px_rgba(30,75,255,0.15)]"
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#1e4bff] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] outline-none sm:w-auto sm:px-8"
            >
              Send the brief
            </button>
          </form>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((ch) => (
            <a
              key={ch.id}
              href={ch.href}
              className="group flex flex-col rounded-[1.4rem] border border-[#d5ccbc] bg-[#fffaf2] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,1)] transition-transform hover:-translate-y-0.5"
            >
              <span className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-[#f3eee4] text-[#141311]">
                <ch.icon className="size-5" />
              </span>
              <span className="text-sm font-semibold text-[#141311]">{ch.title}</span>
              <span className="mt-0.5 font-mono text-[11px] break-words text-[#3c3933]">{ch.handle}</span>
              <span className="mt-2 text-xs text-[#7a7368]">{ch.note}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
