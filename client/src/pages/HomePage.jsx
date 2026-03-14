import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import { http } from "../api/http.js";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function HomePage() {
  const i18n = useI18n();
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    http
      .get("/careers")
      .then(({ data }) => setCareers(data.careers?.slice(0, 3) || []))
      .catch(() => setCareers([]));
  }, [i18n.lang]);

  return (
    <Container>
      <div className="page-enter">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 fade-in" style={{ animationDelay: "40ms" }}>
              <span className="chip">FindYourPath</span>
              <span className="chip">Cambodia</span>
            </div>
            <h1
              className="text-4xl font-semibold tracking-tight md:text-5xl fade-in"
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
      </div>
    </Container>
  );
}
