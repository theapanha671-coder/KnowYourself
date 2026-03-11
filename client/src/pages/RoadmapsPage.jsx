import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import { http, toAssetUrl } from "../api/http.js";
import { useI18n } from "../i18n/I18nContext.jsx";

function uniqSorted(list) {
  return Array.from(new Set((list || []).filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

export default function RoadmapsPage() {
  const i18n = useI18n();
  const [careers, setCareers] = useState([]);
  const [query, setQuery] = useState("");
  const [skill, setSkill] = useState("");
  const [skillOpen, setSkillOpen] = useState(false);
  const [error, setError] = useState("");

  const skillBoxRef = useRef(null);
  const skillOpenRef = useRef(false);

  useEffect(() => {
    skillOpenRef.current = skillOpen;
  }, [skillOpen]);

  useEffect(() => {
    function onMouseDown(e) {
      if (!skillOpenRef.current) return;
      const el = skillBoxRef.current;
      if (!el) return;
      if (!el.contains(e.target)) setSkillOpen(false);
    }

    function onKeyDown(e) {
      if (e.key === "Escape") setSkillOpen(false);
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    http
      .get("/careers", { params: { lang: i18n.lang } })
      .then(({ data }) => setCareers(data.careers || []))
      .catch(() => setError(i18n.t("roadmaps.loadError")));
  }, [i18n.lang]);

  const allSkills = useMemo(() => {
    return uniqSorted(careers.flatMap((c) => c.skills || []));
  }, [careers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (careers || []).filter((c) => {
      const matchesSkill = !skill || (c.skills || []).includes(skill);
      if (!matchesSkill) return false;
      if (!q) return true;
      const hay = `${c.title || ""} ${c.description || ""} ${(c.skills || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [careers, query, skill]);

  function clearFilters() {
    setQuery("");
    setSkill("");
    setSkillOpen(false);
  }

  function pickSkill(nextSkill) {
    setSkill(nextSkill);
    setSkillOpen(false);
  }

  return (
    <Container>
      <h2 className="text-2xl font-semibold">{i18n.t("roadmaps.title")}</h2>
      <p className="mt-1 text-slate-200/70">{i18n.t("roadmaps.subtitle")}</p>

      <div className="mt-5 grid gap-3 md:grid-cols-12">
        <div className="md:col-span-7">
          <input
            className="input w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={i18n.t("roadmaps.searchPh")}
          />
        </div>

        <div className="md:col-span-4" ref={skillBoxRef}>
          <div className="relative">
            <button
              type="button"
              className="input flex w-full items-center justify-between gap-3"
              onClick={() => setSkillOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={skillOpen}
              aria-label={i18n.t("roadmaps.filterSkill")}
            >
              <span className={skill ? "text-slate-100" : "text-slate-300"}>
                {skill || i18n.t("roadmaps.allSkills")}
              </span>
              <svg
                className={skillOpen ? "h-4 w-4 text-slate-300 transition-transform rotate-180" : "h-4 w-4 text-slate-300 transition-transform"}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.1 1.02l-4.24 4.5a.75.75 0 01-1.1 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {skillOpen ? (
              <div
                className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-md shadow-card"
                role="listbox"
              >
                <button
                  type="button"
                  className={
                    !skill
                      ? "flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm bg-white/10"
                      : "flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm hover:bg-white/10"
                  }
                  onClick={() => pickSkill("")}
                  role="option"
                  aria-selected={!skill}
                >
                  <span>{i18n.t("roadmaps.allSkills")}</span>
                  {!skill ? <span className="text-sky-200">✓</span> : null}
                </button>

                <div className="max-h-60 overflow-auto py-1">
                  {allSkills.map((s) => {
                    const selected = s === skill;
                    return (
                      <button
                        key={s}
                        type="button"
                        className={
                          selected
                            ? "flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm bg-white/10"
                            : "flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm hover:bg-white/10"
                        }
                        onClick={() => pickSkill(s)}
                        role="option"
                        aria-selected={selected}
                      >
                        <span className="truncate">{s}</span>
                        {selected ? <span className="text-sky-200">✓</span> : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="md:col-span-1">
          <button onClick={clearFilters} className="btn-ghost w-full" type="button">
            {i18n.t("roadmaps.clear")}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100">{error}</div>
      ) : null}

      <div className="mt-4 text-sm text-slate-200/70">{i18n.t("roadmaps.showing", { n: filtered.length })}</div>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/70">
          {i18n.t("roadmaps.noResults")}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((c) => (
          <Link key={c.slug} to={`/roadmaps/${c.slug}`}>
            <Card>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {c.imageUrl ? (
                    <img
                      src={toAssetUrl(c.imageUrl)}
                      alt={c.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-slate-100">{String(c.title || "?").slice(0, 1)}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-lg font-semibold">{c.title}</div>
                  <div className="mt-2 text-sm text-slate-200/70">{c.description}</div>
                  <div className="mt-3 text-sm text-slate-200/70">
                    {i18n.t("roadmaps.skills")}{" "}
                    <span className="text-slate-100">{(c.skills || []).slice(0, 5).join(", ")}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}






