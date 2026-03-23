import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import { http } from "../api/http.js";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function HomePage() {
  const i18n = useI18n();
  const [careers, setCareers] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    http
      .get("/careers")
      .then(({ data }) => setCareers(data.careers?.slice(0, 3) || []))
      .catch(() => setCareers([]));
  }, [i18n.lang]);

  const tutorialSteps = useMemo(
    () => [
      {
        title: i18n.t("home.tutorial.step1.title"),
        text: i18n.t("home.tutorial.step1.text")
      },
      {
        title: i18n.t("home.tutorial.step2.title"),
        text: i18n.t("home.tutorial.step2.text")
      },
      {
        title: i18n.t("home.tutorial.step3.title"),
        text: i18n.t("home.tutorial.step3.text")
      },
      {
        title: i18n.t("home.tutorial.step4.title"),
        text: i18n.t("home.tutorial.step4.text")
      }
    ],
    [i18n.lang]
  );

  function addPoint(x, y) {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setPoints((prev) => {
      const next = [...prev, { id, x, y }];
      return next.length > 40 ? next.slice(next.length - 40) : next;
    });
    setTimeout(() => {
      setPoints((prev) => prev.filter((p) => p.id !== id));
    }, 700);
  }

  return (
    <Container>
      <div
        className="relative"
        onPointerDown={(event) => {
          setDragging(true);
          addPoint(event.clientX, event.clientY);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
        onPointerMove={(event) => {
          if (!dragging) return;
          addPoint(event.clientX, event.clientY);
        }}
      >
        <div className="home-video-bg" aria-hidden>
          <video className="home-video-media" autoPlay muted loop playsInline>
            <source src="/videos/bg.mp4" type="video/mp4" />
          </video>
          <div className="home-video-overlay" />
        </div>

        <div className="pointer-events-none fixed inset-0 z-10">
          {points.map((point) => (
            <span
              key={point.id}
              className="light-trail-dot"
              style={{ left: point.x, top: point.y }}
            />
          ))}
        </div>

        <div className="relative z-20 page-enter">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 fade-in" style={{ animationDelay: "40ms" }}>
                <span className="chip">FindYourPath</span>
                <span className="chip">Cambodia</span>
              </div>
              <h1
                className="text-4xl font-semibold tracking-tight md:text-5xl fade-in bg-gradient-to-r from-sky-300 via-indigo-300 to-emerald-200 bg-clip-text text-transparent"
                style={{ animationDelay: "120ms" }}
              >
                {i18n.t("home.title")}
              </h1>
              <p className="text-slate-200/80 fade-in" style={{ animationDelay: "180ms" }}>
                {i18n.t("home.subtitle")}
              </p>
              <div className="flex flex-wrap gap-3 fade-in" style={{ animationDelay: "240ms" }}>
                <Link to="/test" className="btn-primary press">
                  {i18n.t("home.startTest")}
                </Link>
                <Link to="/majors" className="btn-secondary press">
                  {i18n.t("home.exploreMajors")}
                </Link>
              </div>
            </div>

            <Card className="fade-in" style={{ animationDelay: "200ms" }}>
              <div className="text-sm font-semibold text-slate-200">{i18n.t("home.featuredCareers")}</div>
              <div className="mt-3 grid gap-3">
                {careers.length ? (
                  careers.map((c) => {
                    const title = i18n.lang === "km" ? c.titleKm || c.title : c.title;
                    const description = i18n.lang === "km" ? c.descriptionKm || c.description : c.description;
                    return (
                      <Link
                        key={c.slug}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
                        to={`/roadmaps/${c.slug}`}
                      >
                        <div className="font-semibold text-slate-100">{title}</div>
                        <div className="mt-1 text-sm text-slate-200/70">{description}</div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="text-sm text-slate-200/70">{i18n.t("home.seedHint")}</div>
                )}
              </div>
            </Card>
          </div>

          <Card className="card-3d mt-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{i18n.t("home.tutorialTitle")}</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-200/75">
                  {i18n.t("home.tutorialSubtitle")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="chip">{i18n.t("home.tutorialSteps", { n: tutorialSteps.length })}</span>
                <span className="chip">{i18n.t("home.tutorialTag")}</span>
              </div>
            </div>

            <div className="ai-flow">
              <div className="ai-flow-track">
                {tutorialSteps.map((step, idx) => (
                  <div key={step.title} className="ai-flow-node hover-lift">
                    <div className="ai-flow-index float-slow" style={{ animationDelay: `${idx * 0.18}s` }}>
                      {idx + 1}
                    </div>
                    <div className="text-base font-semibold text-slate-100">{step.title}</div>
                    <div className="text-sm text-slate-200/75">{step.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
