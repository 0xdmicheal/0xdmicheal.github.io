const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const year = document.querySelector("[data-year]");

if (year) year.textContent = new Date().getFullYear();

if (toggle && header) {
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const here = location.pathname.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
document.querySelectorAll(".nav a[href]").forEach((link) => {
  const href = new URL(link.getAttribute("href"), location.origin).pathname
    .replace(/index\.html$/, "")
    .replace(/\/$/, "") || "/";
  if (href === here) link.classList.add("is-active");
});

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((b) => b.classList.toggle("is-on", b === btn));
    document.querySelectorAll("[data-tags]").forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      card.style.display = value === "all" || tags.includes(value) ? "" : "none";
    });
  });
});

const jobs = document.querySelectorAll(".job");
if (jobs.length) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    jobs.forEach((job) => job.classList.add("is-in"));
  } else {
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    jobs.forEach((job, i) => {
      job.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
      io.observe(job);
    });
  }
}

const form = document.querySelector("#project-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const kind = String(data.get("kind") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`${kind || "Project"} — ${name || "New inquiry"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nNeed: ${kind}\n\n${message}`);
    window.location.href = `mailto:decentralizedmicheal@gmail.com?subject=${subject}&body=${body}`;
    const notice = document.querySelector(".notice");
    if (notice) notice.classList.add("is-on");
  });
}
