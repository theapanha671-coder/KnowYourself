import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import { useAuth } from "../state/AuthContext.jsx";
import { http, toAssetUrl } from "../api/http.js";
import { useI18n } from "../i18n/I18nContext.jsx";
import { formatPersonalityLabel, getCodeLabel } from "../utils/testResult.js";

const CODES = ["R", "I", "A", "S", "E", "C"];

function ScoreRing({ code, score, percent, label }) {
  const gid = `dash-${code}`;
  const r = 28;
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
        <div className="relative h-14 w-14 shrink-0">
          <svg viewBox="0 0 80 80" className="h-14 w-14">
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
            <div className="text-sm font-bold text-slate-50">{code}</div>
            <div className="mt-0.5 text-[11px] font-semibold text-slate-200/80">{score}</div>
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

function QuickLink({ to, title, subtitle, cta }) {
  return (
    <Link to={to} className="surface card-3d block p-4 hover-lift">
      <div className="text-sm font-semibold text-slate-100">{title}</div>
      {subtitle ? <div className="mt-1 text-xs text-slate-200/70">{subtitle}</div> : null}
      <div className="mt-3 text-xs text-sky-200">{cta}</div>
    </Link>
  );
}

export default function DashboardPage() {
  const auth = useAuth();
  const i18n = useI18n();
  const [latest, setLatest] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    http
      .get("/test/me/latest")
      .then(({ data }) => setLatest(data.result))
      .catch(() => setLatest(null));
  }, [i18n.lang]);

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview("");
      return;
    }
    const url = URL.createObjectURL(avatarFile);
    setAvatarPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  async function uploadAvatar() {
    if (!avatarFile) return;
    setUploadError("");
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", avatarFile);
      await http.post("/users/me/avatar", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setAvatarFile(null);
      if (auth.refresh) await auth.refresh();
    } catch (e) {
      setUploadError(e?.response?.data?.message || i18n.t("dash.uploadFail"));
    } finally {
      setUploading(false);
    }
  }

  const scores = latest?.scores || {};
  const totalScore = CODES.reduce((acc, code) => acc + (Number(scores[code]) || 0), 0);
  const scoreRows = CODES.map((code) => {
    const value = Number(scores[code]) || 0;
    return { code, value, percent: totalScore ? Math.round((value / totalScore) * 100) : 0 };
  });

  const topCodes = Array.isArray(latest?.topCodes) ? latest.topCodes : [];
  const personality = formatPersonalityLabel(topCodes, i18n.lang) || latest?.personalityLabel || "";
  const majors = latest?.recommendedMajors || [];
  const careers = latest?.recommendedCareers || [];

  const avatarUrl = avatarPreview || toAssetUrl(auth.user?.avatarUrl);
  const initials = (auth.user?.name || "S").trim().slice(0, 1).toUpperCase();

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

  const roleKey = auth.user?.role === "admin" ? "admin.role.admin" : auth.user?.role === "employee" ? "admin.role.employee" : "admin.role.student";

  return (
    <Container>
      <Card
        hover={false}
        className="card-3d relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-white/5 to-sky-500/10"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{i18n.t("dash.title")}</h2>
            <p className="mt-1 text-slate-200/70">{i18n.t("dash.subtitle")}</p>
            <div className="mt-2 text-sm text-slate-200/80">
              {i18n.t("dash.welcome", { name: auth.user?.name || i18n.t("common.student") })}
            </div>
            {latest?.createdAt ? (
              <div className="mt-2 text-xs text-slate-200/60">
                {i18n.t("dash.lastTaken", { date: fmtDate(latest.createdAt) })}
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {latest ? (
              <Link className="btn-secondary press" to="/test/result">
                {i18n.t("dash.viewResult")}
              </Link>
            ) : (
              <Link className="btn-primary press" to="/test">
                {i18n.t("dash.takeTest")}
              </Link>
            )}
            <Link className="btn-ghost press" to="/roadmaps">
              {i18n.t("dash.exploreRoadmaps")}
            </Link>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
        <Card hover={false} className="card-3d">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-semibold text-slate-200">{i18n.t("dash.latest")}</div>
            <div className="chip">{topCodes.join("") || "-"}</div>
          </div>

          {latest ? (
            <>
              <div className="mt-3 text-xl font-semibold text-slate-50">{personality}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {topCodes.slice(0, 3).map((code) => (
                  <span key={code} className="chip">
                    <span className="text-sky-200">{code}</span>
                    <span className="text-slate-200/80">{getCodeLabel(code, i18n.lang)}</span>
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-slate-200">{i18n.t("dash.recommendedMajors")}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {majors.length ? (
                    majors.map((m) => (
                      <span key={m} className="chip">
                        {m}
                      </span>
                    ))
                  ) : (
                    <div className="text-xs text-slate-200/60">{i18n.t("dash.none")}</div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-slate-200">{i18n.t("dash.recommendedCareers")}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {careers.length ? (
                    careers.map((c) => (
                      <span key={c} className="chip">
                        {c}
                      </span>
                    ))
                  ) : (
                    <div className="text-xs text-slate-200/60">{i18n.t("dash.none")}</div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Link className="btn-secondary press" to="/test/result">
                  {i18n.t("dash.viewResult")}
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="mt-3 text-sm text-slate-200/70">{i18n.t("dash.noLatest")}</div>
              <div className="mt-4">
                <Link className="btn-primary press" to="/test">
                  {i18n.t("dash.takeTest")}
                </Link>
              </div>
            </>
          )}
        </Card>

        <Card hover={false} className="card-3d">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-200">{i18n.t("dash.scoresTitle")}</div>
              <div className="mt-1 text-xs text-slate-200/70">{i18n.t("dash.scoresHint")}</div>
            </div>
            <div className="chip">RIASEC</div>
          </div>

          <div className="mt-4 grid gap-3">
            {latest ? (
              scoreRows.map((row) => (
                <ScoreRing
                  key={row.code}
                  code={row.code}
                  score={row.value}
                  percent={row.percent}
                  label={getCodeLabel(row.code, i18n.lang)}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/70">
                {i18n.t("dash.noScores")}
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card hover={false} className="card-3d">
          <div className="text-sm font-semibold text-slate-200">{i18n.t("dash.quick")}</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <QuickLink
              to="/majors"
              title={i18n.t("dash.exploreMajors")}
              subtitle={i18n.t("dash.quickMajors")}
              cta={i18n.t("dash.open")}
            />
            <QuickLink
              to="/roadmaps"
              title={i18n.t("dash.exploreRoadmaps")}
              subtitle={i18n.t("dash.quickRoadmaps")}
              cta={i18n.t("dash.open")}
            />
            <QuickLink
              to="/experiences"
              title={i18n.t("dash.shareExp")}
              subtitle={i18n.t("dash.quickExperiences")}
              cta={i18n.t("dash.open")}
            />
            <QuickLink
              to="/blog"
              title={i18n.t("dash.quickBlog")}
              subtitle={i18n.t("dash.quickBlogHint")}
              cta={i18n.t("dash.open")}
            />
          </div>
        </Card>

        <Card hover={false} className="card-3d">
          <div className="text-sm font-semibold text-slate-200">{i18n.t("dash.profile")}</div>

          <div className="mt-4 flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-white/5">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-lg font-bold text-slate-100">
                  {initials}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-100">{auth.user?.name || i18n.t("common.student")}</div>
              <div className="text-xs text-slate-200/70 truncate">{auth.user?.email || "-"}</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold text-slate-200">{i18n.t("dash.avatarTitle")}</div>
            <div className="mt-1 text-xs text-slate-200/70">{i18n.t("dash.avatarHint")}</div>
            <div className="mt-3 grid gap-2 md:grid-cols-[1fr,auto] md:items-end">
              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              />
              <button
                type="button"
                className="btn-secondary press"
                disabled={!avatarFile || uploading}
                onClick={uploadAvatar}
              >
                {uploading ? i18n.t("dash.uploading") : i18n.t("dash.upload")}
              </button>
            </div>
            {uploadError ? (
              <div className="mt-3 rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">
                {uploadError}
              </div>
            ) : null}
          </div>

          <div className="mt-4 grid gap-3 text-sm">
            <div className="surface flex items-center justify-between px-4 py-3">
              <span className="text-slate-200/70">{i18n.t("dash.name")}</span>
              <span className="font-semibold text-slate-100">{auth.user?.name || i18n.t("common.student")}</span>
            </div>
            <div className="surface flex items-center justify-between px-4 py-3">
              <span className="text-slate-200/70">{i18n.t("dash.email")}</span>
              <span className="font-semibold text-slate-100">{auth.user?.email || "-"}</span>
            </div>
            <div className="surface flex items-center justify-between px-4 py-3">
              <span className="text-slate-200/70">{i18n.t("dash.role")}</span>
              <span className="chip">{i18n.t(roleKey)}</span>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
