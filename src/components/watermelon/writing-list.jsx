import { FaArrowRight } from "react-icons/fa6";
import { ARTICLES, articleHref, formatDate } from "../../lib/articles.js";

export function WritingList({ limit } = {}) {
  const items = limit ? ARTICLES.slice(0, limit) : ARTICLES;

  if (!items.length) {
    return (
      <p className="rounded-[1.4rem] border border-[#d5ccbc] bg-[#fffaf2] px-6 py-8 text-[#7a7368]">
        First notes are on the way.
      </p>
    );
  }

  return (
    <ul className="border-t border-[#d5ccbc]" style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
      {items.map((a) => (
        <li key={a.slug} className="border-b border-[#d5ccbc]">
          <a
            href={articleHref(a.slug)}
            className="group grid gap-2 py-6 outline-none sm:grid-cols-[9.5rem_1fr_auto] sm:items-baseline sm:gap-8 sm:py-8"
          >
            <span className="font-mono text-[11px] tracking-[0.12em] text-[#7a7368] uppercase">
              {formatDate(a.date)}
              {a.draft && <span className="ml-2 text-[#1e4bff]">Draft</span>}
            </span>
            <span className="min-w-0">
              <span className="block font-serif text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)] leading-[1.02] tracking-tight text-[#141311] transition-colors group-hover:text-[#3c3933]">
                {a.title}
              </span>
              {a.summary && (
                <span className="mt-2 block max-w-2xl text-[0.98rem] leading-relaxed text-[#3c3933]">{a.summary}</span>
              )}
            </span>
            <span className="flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-[#7a7368] uppercase">
              {a.tag && <span>{a.tag}</span>}
              <span>{a.minutes} min</span>
              <FaArrowRight className="hidden size-3.5 transition-transform group-hover:translate-x-1 sm:block" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
