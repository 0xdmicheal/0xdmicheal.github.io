import { marked } from "marked";

// Every Markdown file in /writing becomes a published article.
// Files in /writing/drafts only load on the local dev server and are left out of the live build.
// Files starting with "_" (like _template.md) are ignored.
const published = import.meta.glob("../../writing/*.md", { query: "?raw", import: "default", eager: true });
const drafts = import.meta.env.DEV
  ? import.meta.glob("../../writing/drafts/*.md", { query: "?raw", import: "default", eager: true })
  : {};
const files = { ...published, ...drafts };

function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, "");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: text };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    if (value === "true") value = true;
    else if (value === "false") value = false;
    data[key] = value;
  }
  return { data, body: text.slice(match[0].length) };
}

function readTime(body) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export const ARTICLES = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop().replace(/\.md$/, "");
    const isDraft = path.includes("/writing/drafts/");
    const { data, body } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      summary: data.summary || "",
      tag: data.tag || "",
      draft: isDraft,
      minutes: readTime(body),
      body,
    };
  })
  .filter((a) => !a.slug.startsWith("_"))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getArticle(slug) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function renderMarkdown(body) {
  return marked.parse(body, { gfm: true, breaks: false });
}

export function articleHref(slug) {
  return `/article.html?p=${encodeURIComponent(slug)}`;
}
