const STEPS = [
  {
    n: "01",
    title: "Adopt",
    line: "Steal the problem first.",
    copy: "The brief walks in messy — a Discord, a four-week window, a game that isn’t a game yet. I take it as it is. No moodboard before the thing has a name.",
  },
  {
    n: "02",
    title: "Learn",
    line: "Play it. Watch who stays.",
    copy: "I sit in the mechanic until I can draw it. UI/UX only matters when someone can actually tap it. Until then the poster has to teach, or the drop dies quiet.",
  },
  {
    n: "03",
    title: "Shift",
    line: "Kill the pretty that doesn’t convert.",
    copy: "If it’s alive and it works, we don’t freeze a deck. We redraw. Then we spend. Design that can’t take a punch doesn’t get a campaign.",
  },
  {
    n: "04",
    title: "Develop",
    line: "Lock it. Then grow it.",
    copy: "Marks, surfaces, the kit a launch actually ships with. Marketing is the last lock — not the first slide. That’s when it becomes a movement.",
  },
];

export function ProcessFlow() {
  return (
    <div>
      <header style={{ textAlign: "center", marginBottom: "2.75rem" }}>
        <p
          className="font-mono text-[11px] tracking-[0.16em] text-[#1e4bff] uppercase"
          style={{ textAlign: "center" }}
        >
          The job, in order
        </p>
        <h2
          className="mt-3 font-serif text-3xl leading-[1.08] text-[#141311] md:text-5xl"
          style={{ textAlign: "center" }}
        >
          I don’t start with a deck.
          <br />
          <em className="text-[#1e4bff]">I start with the thing.</em>
        </h2>
        <p
          className="text-[#3c3933]"
          style={{ textAlign: "center", margin: "1rem auto 0", maxWidth: "34rem" }}
        >
          Adopt the brief. Learn the mechanic. Shift the pictures if they live. Develop the campaign
          last — when the product can hold it.
        </p>
      </header>
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <article
            key={step.n}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#fffaf2] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.06)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 -right-2 font-serif text-[7rem] leading-none text-[#141311]/6 select-none"
            >
              {step.n}
            </span>
            <span className="relative font-mono text-[11px] tracking-[0.18em] text-[#1e4bff]">
              {step.n}
            </span>
            <h3 className="relative mt-4 font-serif text-3xl text-[#141311]">{step.title}</h3>
            <p className="relative mt-1 text-sm font-medium text-[#141311] italic">{step.line}</p>
            <p className="relative mt-3 flex-1 text-sm leading-relaxed text-[#3c3933]">{step.copy}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
