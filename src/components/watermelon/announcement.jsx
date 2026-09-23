import { useState } from "react";
import { X } from "lucide-react";
import { HiRocketLaunch } from "react-icons/hi2";

export function Announcement({
  badge = "Open",
  message = "Taking graphic and campaign work for startups, games, and launches.",
  href = "/contact.html",
  cta = "Start a project",
}) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="flex w-full items-center justify-between border-b border-[#1e4bff] bg-[#f3eee4] px-4 py-2">
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <span className="shrink-0 rounded-md bg-[#1e4bff] px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase">
          {badge}
        </span>
        <p className="truncate text-[#3c3933]">{message}</p>
        <a
          href={href}
          className="group hidden items-center gap-1 sm:flex"
        >
          <span className="relative font-medium text-[#1e4bff] before:absolute before:-bottom-0.5 before:left-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:bg-[#1e4bff] before:transition-transform before:duration-300 group-hover:before:origin-left group-hover:before:scale-x-100">
            {cta}
          </span>
          <HiRocketLaunch className="h-4 w-4 text-[#1e4bff] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setOpen(false)}
        className="ml-3 cursor-pointer rounded-lg p-1 text-[#1e4bff] hover:text-[#1638c9]"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
