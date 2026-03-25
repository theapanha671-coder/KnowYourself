import React, { useEffect, useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card.jsx";
import { http } from "../../api/http.js";
import { useI18n } from "../../i18n/I18nContext.jsx";

function StatRing({ label, value, percent, tone = "sky", hint }) {
  const rawId = useId();
  const gid = `ring-${String(rawId).replace(/:/g, "")}`;
  const r = 34;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(100, Number(percent) || 0));
  const dash = (c * p) / 100;

  const toneStops = {
    sky: ["#38bdf8", "#a78bfa"],
    emerald: ["#34d399", "#22c55e"],
    amber: ["#fbbf24", "#f97316"],
    rose: ["#fb7185", "#a78bfa"],
    violet: ["#a78bfa", "#38bdf8"],
    slate: ["#94a3b8", "#cbd5e1"]
  };

  const [from, to] = toneStops[tone] || toneStops.sky;

  return (
    <div className="surface p-4">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 80 80" className="h-20 w-20">
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
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-lg font-bold leading-none text-slate-50">{value ?? "-"}</div>
              <div className="mt-1 text-[11px] leading-none text-slate-200/70">{p}%</div>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-100">{label}</div>
          {hint ? <div className="mt-1 text-xs text-slate-200/70">{hint}</div> : null}
        </div>
      </div>
    </div>
  );
}

function StatLink({ to, title, subtitle, count, icon, chipLabel }) {
  return (
    <Link to={to} className="surface card-3d block p-4 hover-lift">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-100">{title}</div>
          {subtitle ? <div className="mt-1 text-xs text-slate-200/70">{subtitle}</div> : null}
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-sky-200">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tight text-slate-50">{count ?? "-"}</div>
        <div className="chip">{chipLabel}</div>
      </div>
    </Link>
  );
}

function IconBook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4.5h12a2 2 0 0 1 2 2V19a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2V6.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M7 7h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18V6l6-2v12l-6 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M3 6l6 2v12l-6-2V6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M15 4l6 2v12l-6-2V4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 12h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 16h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconVideo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="m17 10 3-2v8l-3-2v-4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.5-5A8 8 0 1 1 21 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 19c0-2.5-1.8-4-4-4s-4 1.5-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M20 19c0-1.6-1-2.8-2.4-3.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M17.5 6.8A2.6 2.6 0 0 1 18 12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AdminDashboard() {
  const i18n = useI18n();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    http
      .get("/admin/stats")
      .then(({ data: res }) => {
        if (!alive) return;
        setData(res || null);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e?.response?.data?.message || i18n.t("admin.stats.loadFail"));
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [i18n.lang]);

  const counts = data?.counts || {};
  const khmerCoverage = data?.khmerCoverage || null;
  const latest = data?.latest || {};

  const maxCount = useMemo(() => {
    const values = [
      counts.majors,
      counts.careers,
      counts.posts,
      counts.videos,
      counts.experiences,
      counts.users,
      counts.testResults
    ]
      .map((n) => Number(n) || 0)
      .filter((n) => n >= 0);
    return values.length ? Math.max(...values) : 0;
  }, [counts]);

  function pctForCount(n) {
    const v = Number(n) || 0;
    if (!maxCount) return 0;
    return Math.round((v / maxCount) * 100);
  }

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

  return (
    <div className="grid gap-4">
      <Card hover={false} className="card-3d">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-2xl font-semibold">{i18n.t("admin.panelTitle")}</div>
            <div className="mt-2 text-sm text-slate-200/70">{i18n.t("admin.panelSubtitle")}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="btn-secondary press" to="/admin/majors">
              {i18n.t("admin.majors")}
            </Link>
            <Link className="btn-secondary press" to="/admin/careers">
              {i18n.t("admin.careers")}
            </Link>
            <Link className="btn-secondary press" to="/admin/posts">
              {i18n.t("admin.posts")}
            </Link>
          </div>
        </div>
        {error ? (
          <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1.4fr,1fr]">
        <Card hover={false} className="card-3d">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-200">{i18n.t("admin.stats.title")}</div>
              <div className="mt-1 text-xs text-slate-200/70">{i18n.t("admin.stats.subtitle")}</div>
            </div>
            <div className="chip">{loading ? i18n.t("admin.stats.loading") : i18n.t("admin.stats.ready")}</div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="surface grid place-items-center p-5">
              <div className="text-center">
                <div className="text-xs font-semibold text-slate-200">{i18n.t("admin.stats.khmerCoverage")}</div>
                <div className="mt-3">
                  <div className="mx-auto w-fit">
                    <StatRing
                      label={i18n.t("admin.stats.content")}
                      value={khmerCoverage ? `${khmerCoverage.khmer}/${khmerCoverage.total}` : "-"}
                      percent={khmerCoverage ? khmerCoverage.pct : 0}
                      tone="violet"
                      hint={i18n.t("admin.stats.khmerCoverageHint")}
                    />
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-200/70">{i18n.t("admin.tipText")}</div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <StatRing
                label={i18n.t("admin.majors")}
                value={loading ? null : counts.majors}
                percent={pctForCount(counts.majors)}
                tone="sky"
              />
              <StatRing
                label={i18n.t("admin.careers")}
                value={loading ? null : counts.careers}
                percent={pctForCount(counts.careers)}
                tone="emerald"
              />
              <StatRing
                label={i18n.t("admin.posts")}
                value={loading ? null : counts.posts}
                percent={pctForCount(counts.posts)}
                tone="amber"
              />
              <StatRing
                label={i18n.t("admin.videos")}
                value={loading ? null : counts.videos}
                percent={pctForCount(counts.videos)}
                tone="rose"
              />
              <StatRing
                label={i18n.t("admin.experiences")}
                value={loading ? null : counts.experiences}
                percent={pctForCount(counts.experiences)}
                tone="slate"
              />
              <StatRing
                label={i18n.t("admin.users")}
                value={loading ? null : counts.users}
                percent={pctForCount(counts.users)}
                tone="violet"
                hint={loading ? "" : i18n.t("admin.stats.admins", { n: counts.admins ?? 0 })}
              />              <StatRing
                label={i18n.t("admin.testResults")}
                value={loading ? null : counts.testResults}
                percent={pctForCount(counts.testResults)}
                tone="sky"
              />
            </div>
          </div>
        </Card>

        <Card hover={false} className="card-3d">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-200">{i18n.t("admin.stats.manage")}</div>
            <div className="chip">{i18n.t("admin.stats.quick")}</div>
          </div>

          <div className="mt-4 grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <StatLink to="/admin/majors" title={i18n.t("admin.majors")} count={counts.majors} icon={<IconBook />} chipLabel={i18n.t("admin.stats.manageChip")} />
              <StatLink to="/admin/careers" title={i18n.t("admin.careers")} count={counts.careers} icon={<IconMap />} chipLabel={i18n.t("admin.stats.manageChip")} />
              <StatLink to="/admin/posts" title={i18n.t("admin.posts")} count={counts.posts} icon={<IconFile />} chipLabel={i18n.t("admin.stats.manageChip")} />
              <StatLink to="/admin/videos" title={i18n.t("admin.videos")} count={counts.videos} icon={<IconVideo />} chipLabel={i18n.t("admin.stats.manageChip")} />
              <StatLink to="/admin/experiences" title={i18n.t("admin.experiences")} count={counts.experiences} icon={<IconChat />} chipLabel={i18n.t("admin.stats.manageChip")} />
              <StatLink to="/admin/users" title={i18n.t("admin.users")} count={counts.users} icon={<IconUsers />} chipLabel={i18n.t("admin.stats.manageChip")} />
            </div>

            <div className="surface p-4">
              <div className="text-sm font-semibold text-slate-200">{i18n.t("admin.stats.latest")}</div>
              <div className="mt-3 grid gap-2 text-sm text-slate-200/80">
                {latest?.major ? (
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate">
                      <span className="chip">{i18n.t("admin.majors")}</span> <span className="ml-2">{latest.major.title}</span>
                    </div>
                    <div className="shrink-0 text-xs text-slate-200/60">{fmtDate(latest.major.updatedAt)}</div>
                  </div>
                ) : null}
                {latest?.career ? (
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate">
                      <span className="chip">{i18n.t("admin.careers")}</span> <span className="ml-2">{latest.career.title}</span>
                    </div>
                    <div className="shrink-0 text-xs text-slate-200/60">{fmtDate(latest.career.updatedAt)}</div>
                  </div>
                ) : null}
                {latest?.post ? (
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate">
                      <span className="chip">{i18n.t("admin.posts")}</span> <span className="ml-2">{latest.post.title}</span>
                    </div>
                    <div className="shrink-0 text-xs text-slate-200/60">{fmtDate(latest.post.updatedAt)}</div>
                  </div>
                ) : null}
                {latest?.video ? (
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate">
                      <span className="chip">{i18n.t("admin.videos")}</span> <span className="ml-2">{latest.video.title}</span>
                    </div>
                    <div className="shrink-0 text-xs text-slate-200/60">{fmtDate(latest.video.updatedAt)}</div>
                  </div>
                ) : null}
                {latest?.experience ? (
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate">
                      <span className="chip">{i18n.t("admin.experiences")}</span> <span className="ml-2">{latest.experience.title}</span>
                    </div>
                    <div className="shrink-0 text-xs text-slate-200/60">{fmtDate(latest.experience.updatedAt)}</div>
                  </div>
                ) : null}
                {latest?.user ? (
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate">
                      <span className="chip">{i18n.t("admin.users")}</span> <span className="ml-2">{latest.user.email}</span>
                    </div>
                    <div className="shrink-0 text-xs text-slate-200/60">{fmtDate(latest.user.createdAt || latest.user.updatedAt)}</div>
                  </div>
                ) : null}
                {!latest?.major && !latest?.career && !latest?.post && !latest?.video && !latest?.experience && !latest?.user ? (
                  <div className="text-sm text-slate-200/60">{i18n.t("admin.stats.noData")}</div>
                ) : null}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}