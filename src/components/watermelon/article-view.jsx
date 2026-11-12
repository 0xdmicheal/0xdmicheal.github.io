import { useEffect, useMemo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { ARTICLES, articleHref, formatDate, getArticle, renderMarkdown } from "../../lib/articles.js";

export function ArticleView() {
  const slug = new URLSearchParams(window.location.search).get("p") || "";
  const article = getArticle(slug);
  const html = useMemo(() => (article ? renderMarkdown(article.body) : ""), [article]);

  const index = article ? ARTICLES.indexOf(article) : -1;
  const next = index >= 0 ? ARTICLES[index + 1] || ARTICLES[0] : null;

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} — Michael`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && article.summary) meta.setAttribute("content", article.summary);
  }, [article]);

  if (!article) {
    return (
      <section className="wrap" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
        <p className="kicker">Writing</p>
        <h1 className="font-serif text-[clamp(2.4rem,1.4rem+4vw,4.4rem)] leading-[0.95] tracking-tight text-[#141311]">
          Article not found.
        </h1>
        <a className="btn btn--ghost" href="/writing.html" style={{ marginTop: "1.5rem" }}>
          All writing
        </a>
      </section>
    );
  }

  return (
    <article className="wrap" style={{ paddingTop: "1.5rem", paddingBottom: "3rem" }}>
      <header className="article-head">
        <a href="/writing.html" className="article-back">
          <FaArrowLeft className="size-3" /> Writing
        </a>
        <p className="article-meta">
          {formatDate(article.date)}
          {article.tag && <> · {article.tag}</>} · {article.minutes} min read
          {article.draft && <span style={{ color: "#1e4bff" }}> · Draft</span>}
        </p>
        <h1 className="article-title">{article.title}</h1>
        {article.summary && <p className="article-summary">{article.summary}</p>}
      </header>

      <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

      {next && next !== article && (
        <div className="next-case article-next">
          <div>
            <span>Next</span>
            <br />
            <a href={articleHref(next.slug)}>
              <strong>
                {next.title} <FaArrowRight className="inline size-3.5" />
              </strong>
            </a>
          </div>
          <a className="btn btn--ghost" href="/writing.html">
            All writing
          </a>
        </div>
      )}
    </article>
  );
}
