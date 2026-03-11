import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import { http } from "../api/http.js";
import { toAssetUrl } from "../api/http.js";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function MajorsPage() {
  const i18n = useI18n();
  const [majors, setMajors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    http
      .get("/majors", { params: { lang: i18n.lang } })
      .then(({ data }) => setMajors(data.majors || []))
      .catch(() => setError(i18n.t("majors.loadError")));
  }, [i18n.lang]);

  return (
    <Container>
      <h2 className="text-2xl font-semibold">{i18n.t("majors.title")}</h2>
      <p className="mt-1 text-slate-200/70">{i18n.t("majors.subtitle")}</p>

      {error ? (
        <div className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100">
          {error}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {majors.map((m) => (
          <Link key={m.slug} to={`/majors/${m.slug}`} data-aos="fade-up">
            <Card>
              {m.imageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <div className="aspect-[16/9]">
                    <img
                      src={toAssetUrl(m.imageUrl)}
                      alt={m.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : null}
              <div className={m.imageUrl ? "mt-4 text-lg font-semibold" : "text-lg font-semibold"}>
                {m.title}
              </div>
              <div className="mt-2 text-sm text-slate-200/70">{m.description}</div>
              <div className="mt-3 text-sm text-slate-200/70">
                {i18n.t("majors.skills")}{" "}
                <span className="text-slate-100">{(m.skills || []).slice(0, 4).join(", ")}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
