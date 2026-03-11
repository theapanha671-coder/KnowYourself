import React, { useEffect, useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import { http } from "../api/http.js";
import { useI18n } from "../i18n/I18nContext.jsx";
import { formatPersonalityLabel, getCodeLabel } from "../utils/testResult.js";

const CODES = ["R", "I", "A", "S", "E", "C"];

function ScoreRing({ code, score, percent, label }) {
  const rawId = useId();
  const gid = `score-${code}-${String(rawId).replace(/:/g, "")}`;

  const r = 30;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(100, Number(percent) || 0));
  const dash = (c * p) / 100;

  const toneStops = {
    R: ["#34d399", "#22c55e"],
    I: ["#38bdf8", "#a78bfa"],
    A: ["#a78bfa", "#38bdf8"],
    S: ["#fb7185", "#a78bfa"],
    E: ["#fbbf24", "#f97316"],
    C: ["#94a3b8", "#cbd5e1"]
  };

  const [from, to] = toneStops[code] || toneStops.I;

  return (
    <div className="surface p-4">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 80 80" className="h-16 w-16">
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={from} />
                <stop offset="100%" stopColor={to} />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r={r} stroke="rgba(255,255,255,0.10)" strokeWidth="10" fill="none" />
            <circle
              cx="40"
              cy="40"
              r={r}
              stroke={`url(#${gid})`}
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${dash} ${c - dash}`}
              transform="rotate(-90 40 40)"
              style={{ transition: "stroke-dasharray 420ms ease" }}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div className="text-base font-extrabold leading-none text-slate-50">{code}</div>
            <div className="mt-1 text-[11px] font-semibold leading-none text-slate-200/80">{score}</div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-sky-200">
              {code}
            </span>
            <div className="truncate text-sm font-semibold text-slate-100">{label}</div>
          </div>
          <div className="mt-1 text-xs text-slate-200/70">{p}%</div>
        </div>
      </div>
    </div>
  );
}

export default function TestResultPage() {
  const i18n = useI18n();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    http
      .get("/test/me/latest")
      .then(({ data }) => setResult(data.result))
      .catch((e) => setError(e?.response?.data?.message || i18n.t("result.loadFail")));
  }, [i18n.lang]);

  const scoreRows = useMemo(() => {
    const scores = result?.scores || {};
    const rows = CODES.map((k) => [k, Number(scores[k] || 0)]);
    const total = rows.reduce((acc, [, v]) => acc + (Number(v) || 0), 0);
    return rows.map(([k, v]) => ({
      code: k,
      score: v,
      percent: total ? Math.round((v / total) * 100) : 0
    }));
  }, [result]);

  const topCodes = Array.isArray(result?.topCodes) ? result.topCodes : [];
  const label = formatPersonalityLabel(topCodes, i18n.lang) || result?.personalityLabel || "";

  function fmtDate(value) {
    if (!value) return "";
    try {
      const d = new Date(value);
      const locale = i18n.lang === "km" ? "km-KH" : "en-US";
      return d.toLocaleString(locale, { dateStyle: "medium", timeStyle: "short" });
    } catch {
      return "";
    }
  }

  if (error) {
    return (
      <Container>
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>
      </Container>
    );
  }

  if (!result) {
    return (
      <Container>
        <Card hover={false} className="card-3d">
          <div className="text-slate-200/70">{i18n.t("result.noResult")}</div>
          <div className="mt-3">
            <Link className="btn-primary press" to="/test">
              {i18n.t("result.goToTest")}
            </Link>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card hover={false} className="card-3d relative overflow-hidden bg-gradient-to-br from-sky-500/10 via-white/5 to-violet-500/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{i18n.t("result.title")}</h2>
            <p className="mt-1 text-slate-200/70">{i18n.t("result.subtitle")}</p>
            {result.createdAt ? <div className="mt-2 text-xs text-slate-200/60">{i18n.t("result.takenAt", { date: fmtDate(result.createdAt) })}</div> : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/dashboard" className="btn-secondary press">
              {i18n.t("result.openDashboard")}
            </Link>
            <Link to="/test" className="btn-ghost press">
              {i18n.t("result.retake")}
            </Link>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr,1.2fr]">
        <Card hover={false} className="card-3d">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-200">{i18n.t("result.personality")}</div>
            <div className="chip">{topCodes.join("")}</div>
          </div>

          <div className="mt-3 text-xl font-semibold text-slate-50">{label}</div>

          <div className="mt-4 flex flex-wrap gap-2">
            {topCodes.slice(0, 3).map((c) => (
              <span key={c} className="chip">
                <span className="text-sky-200">{c}</span>
                <span className="text-slate-200/80">{getCodeLabel(c, i18n.lang)}</span>
              </span>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/80">
            {i18n.t("result.topCodes")} <span className="font-semibold text-slate-100">{topCodes.join("")}</span>
          </div>
        </Card>

        <Card hover={false} className="card-3d">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-200">{i18n.t("result.scores")}</div>
              <div className="mt-1 text-xs text-slate-200/70">{i18n.t("result.scoresHint")}</div>
            </div>
            <div className="chip">RIASEC</div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {scoreRows.map((row) => (
              <ScoreRing key={row.code} code={row.code} score={row.score} percent={row.percent} label={getCodeLabel(row.code, i18n.lang)} />
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card hover={false} className="card-3d">
          <div className="text-sm font-semibold text-slate-200">{i18n.t("result.recommendedMajors")}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(result.recommendedMajors || []).map((m) => (
              <span key={m} className="chip">
                {m}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <Link className="btn-secondary press" to="/majors">
              {i18n.t("result.exploreMajors")}
            </Link>
          </div>
        </Card>

        <Card hover={false} className="card-3d">
          <div className="text-sm font-semibold text-slate-200">{i18n.t("result.recommendedCareers")}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(result.recommendedCareers || []).map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <Link className="btn-secondary press" to="/roadmaps">
              {i18n.t("result.exploreRoadmaps")}
            </Link>
          </div>
        </Card>
      </div>
    </Container>
  );
}

