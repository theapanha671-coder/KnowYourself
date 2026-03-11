import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import { http, toAssetUrl } from "../api/http.js";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function BlogPostPage() {
  const { slug } = useParams();
  const i18n = useI18n();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    http
      .get(`/posts/${slug}`, { params: { lang: i18n.lang } })
      .then(({ data }) => setPost(data.post))
      .catch(() => setError(i18n.t("notFound")));
  }, [slug, i18n.lang]);

  const fmtDate = useMemo(() => {
    const locale = i18n.lang === "km" ? "km-KH" : "en";
    try {
      return new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
    } catch {
      return new Intl.DateTimeFormat("en", { dateStyle: "medium" });
    }
  }, [i18n.lang]);

  async function copyLink() {
    setCopied(false);
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  if (error) {
    return (
      <Container>
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>
      </Container>
    );
  }

  if (!post) return <Container>{i18n.t("protected.loading")}</Container>;

  return (
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <p className="mt-1 text-slate-200/70">{post.excerpt}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="btn-ghost" onClick={copyLink}>
            {i18n.t("blog.copyLink")}
          </button>
          <Link className="btn-secondary" to="/blog">
            {i18n.t("blog.back")}
          </Link>
        </div>
      </div>

      {copied ? (
        <div className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">
          {i18n.t("blog.copied")}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-200/60">
        {post.createdAt ? <span>{fmtDate.format(new Date(post.createdAt))}</span> : null}
        {post.tags?.length ? <span>•</span> : null}
        {(post.tags || []).map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      {post.coverImageUrl ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="aspect-[21/9]">
            <img src={toAssetUrl(post.coverImageUrl)} alt={post.title} className="h-full w-full object-cover" />
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <Card hover={false} className="card-3d">
          <div className="whitespace-pre-wrap text-sm leading-6 text-slate-100/90">{post.content}</div>
        </Card>
      </div>
    </Container>
  );
}
