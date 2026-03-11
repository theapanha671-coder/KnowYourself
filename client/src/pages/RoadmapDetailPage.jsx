import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import { http, toAssetUrl } from "../api/http.js";
import { useI18n } from "../i18n/I18nContext.jsx";

function clampProgressArray(value, length) {
  const out = new Array(length).fill(false);
  if (!Array.isArray(value)) return out;
  for (let i = 0; i < Math.min(length, value.length); i += 1) out[i] = Boolean(value[i]);
  return out;
}

export default function RoadmapDetailPage() {
  const { slug } = useParams();
  const i18n = useI18n();
  const [career, setCareer] = useState(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState([]);
  const [copied, setCopied] = useState(false);

  const storageKey = useMemo(() => `ky_rm_progress_${slug}`, [slug]);

  useEffect(() => {
    http
      .get(`/careers/${slug}`, { params: { lang: i18n.lang } })
      .then(({ data }) => setCareer(data.career))
      .catch(() => setError(i18n.t("notFound")));
  }, [slug, i18n.lang]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      const len = career?.roadmap?.length || 0;
      setDone(clampProgressArray(parsed, len));
    } catch {
      const len = career?.roadmap?.length || 0;
      setDone(new Array(len).fill(false));
    }
  }, [storageKey, career?.roadmap?.length]);

  const progress = useMemo(() => {
    const total = career?.roadmap?.length || 0;
    const completed = (done || []).filter(Boolean).length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pct };
  }, [career?.roadmap?.length, done]);

  function setDoneAndPersist(next) {
    setDone(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  function toggleStep(index) {
    const next = (done || []).slice();
    next[index] = !next[index];
    setDoneAndPersist(next);
  }

  function resetProgress() {
    const len = career?.roadmap?.length || 0;
    const next = new Array(len).fill(false);
    setDoneAndPersist(next);
  }

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

  if (!career) return <Container>{i18n.t("protected.loading")}</Container>;

  return (
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-start gap-4">
  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
    {career.imageUrl ? (
      <img
        src={toAssetUrl(career.imageUrl)}
        alt={career.title}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    ) : (
      <span className="text-sm font-semibold text-slate-100">{String(career.title || "?").slice(0, 1)}</span>
    )}
  </div>
  <div className="min-w-0">
    <h2 className="text-2xl font-semibold">{career.title}</h2>
    <p className="mt-1 text-slate-200/70">{career.description}</p>
  </div>
</div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="btn-ghost" onClick={copyLink}>
            {i18n.t("roadmap.copyLink")}
          </button>
          <Link className="btn-secondary" to="/roadmaps">
            {i18n.t("roadmap.back")}
          </Link>
        </div>
      </div>

      {copied ? (
        <div className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">
          {i18n.t("roadmap.copied")}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-200">{i18n.t("roadmap.progress")}</div>
              <div className="mt-1 text-sm text-slate-200/70">
                {progress.completed}/{progress.total} ({progress.pct}%)
              </div>
            </div>
            <button type="button" className="btn-ghost" onClick={resetProgress}>
              {i18n.t("roadmap.reset")}
            </button>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" style={{ width: `${progress.pct}%` }} />
          </div>
        </Card>

        <Card>
          <div className="text-sm font-semibold text-slate-200">{i18n.t("roadmap.skillsBuild")}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(career.skills || []).map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <div className="text-sm font-semibold text-slate-200">{i18n.t("roadmap.steps")}</div>
          <ol className="mt-3 grid gap-3">
            {(career.roadmap || []).map((r, idx) => {
              const isDone = Boolean(done?.[idx]);
              return (
                <li key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" checked={isDone} onChange={() => toggleStep(idx)} />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-200">{i18n.t("roadmap.step", { n: idx + 1 })}</div>
                      <div className={isDone ? "mt-1 font-semibold text-slate-100 line-through opacity-70" : "mt-1 font-semibold text-slate-100"}>
                        {r.step}
                      </div>
                      {r.details ? <div className="mt-1 text-sm text-slate-200/70">{r.details}</div> : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>
      </div>
    </Container>
  );
}



