import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import { http, toAssetUrl } from "../api/http.js";
import { useI18n } from "../i18n/I18nContext.jsx";

function uniqSorted(list) {
  return Array.from(new Set((list || []).filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

export default function BlogPage() {
  const i18n = useI18n();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    http
      .get("/posts", { params: { lang: i18n.lang } })
      .then(({ data }) => setPosts(data.posts || []))
      .catch(() => setError(i18n.t("blog.loadError")));
  }, [i18n.lang]);

  const allTags = useMemo(() => {
    return uniqSorted(posts.flatMap((p) => p.tags || []));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (posts || []).filter((p) => {
      const matchesTag = !tag || (p.tags || []).includes(tag);
      if (!matchesTag) return false;
      if (!q) return true;
      const hay = `${p.title || ""} ${p.excerpt || ""} ${(p.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, query, tag]);

  const featured = filtered[0] || null;
  const rest = featured ? filtered.slice(1) : [];

  const fmtDate = useMemo(() => {
    const locale = i18n.lang === "km" ? "km-KH" : "en";
    try {
      return new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
    } catch {
      return new Intl.DateTimeFormat("en", { dateStyle: "medium" });
    }
  }, [i18n.lang]);

  function clearFilters() {
    setQuery("");
    setTag("");
  }

  return (
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">{i18n.t("blog.title")}</h2>
          <p className="mt-1 text-slate-200/70">{i18n.t("blog.subtitle")}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-12">
        <div className="md:col-span-9">
          <input
            className="input w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={i18n.t("blog.searchPh")}
          />
        </div>
        <div className="md:col-span-3">
          <button onClick={clearFilters} className="btn-ghost w-full" type="button">
            {i18n.t("blog.clear")}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={!tag ? "chip border-sky-400/40 bg-sky-500/10 text-sky-100" : "chip"}
          onClick={() => setTag("")}
        >
          {i18n.t("blog.allTags")}
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            className={t === tag ? "chip border-sky-400/40 bg-sky-500/10 text-sky-100" : "chip"}
            onClick={() => setTag(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100">{error}</div>
      ) : null}

      <div className="mt-4 text-sm text-slate-200/70">{i18n.t("blog.showing", { n: filtered.length })}</div>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/70">
          {i18n.t("blog.noResults")}
        </div>
      ) : null}

      {featured ? (
        <div className="mt-6">
          <Link to={`/blog/${featured.slug}`}>
            <Card hover={false} className="card-3d">
              {featured.coverImageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <div className="aspect-[21/9]">
                    <img
                      src={toAssetUrl(featured.coverImageUrl)}
                      alt={featured.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : null}

              <div className={featured.coverImageUrl ? "mt-4" : ""}>
                {featured.createdAt ? (
                  <div className="text-xs text-slate-200/60">{fmtDate.format(new Date(featured.createdAt))}</div>
                ) : null}
                <div className="mt-1 text-xl font-semibold">{featured.title}</div>
                <div className="mt-2 text-sm text-slate-200/70">{featured.excerpt}</div>
              </div>

              {featured.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </Card>
          </Link>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`}>
            <Card hover={false} className="card-3d">
              {p.coverImageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <div className="aspect-[16/9]">
                    <img
                      src={toAssetUrl(p.coverImageUrl)}
                      alt={p.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : null}

              <div className={p.coverImageUrl ? "mt-4" : ""}>
                {p.createdAt ? (
                  <div className="text-xs text-slate-200/60">{fmtDate.format(new Date(p.createdAt))}</div>
                ) : null}
                <div className="mt-1 text-lg font-semibold">{p.title}</div>
                <div className="mt-2 text-sm text-slate-200/70 ">{p.excerpt}</div>
              </div>

              {p.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}

