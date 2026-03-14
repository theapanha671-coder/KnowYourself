import React from "react";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import { useI18n } from "../i18n/I18nContext.jsx";

function Icon({ children }) {
  return <div className="surface grid h-10 w-10 place-items-center">{children}</div>;
}

export default function AboutPage() {
  const i18n = useI18n();

  const problemBullets = [
    i18n.t("about.problem.b1"),
    i18n.t("about.problem.b2"),
    i18n.t("about.problem.b3"),
    i18n.t("about.problem.b4")
  ];

  const objectives = [
    i18n.t("about.objectives.b1"),
    i18n.t("about.objectives.b2"),
    i18n.t("about.objectives.b3"),
    i18n.t("about.objectives.b4")
  ];

  const users = [i18n.t("about.users.b1"), i18n.t("about.users.b2"), i18n.t("about.users.b3")];

  const features = [
    { title: i18n.t("about.features.f1.title"), text: i18n.t("about.features.f1.text") },
    { title: i18n.t("about.features.f2.title"), text: i18n.t("about.features.f2.text") },
    { title: i18n.t("about.features.f3.title"), text: i18n.t("about.features.f3.text") },
    { title: i18n.t("about.features.f4.title"), text: i18n.t("about.features.f4.text") },
    { title: i18n.t("about.features.f5.title"), text: i18n.t("about.features.f5.text") },
    { title: i18n.t("about.features.f6.title"), text: i18n.t("about.features.f6.text") }
  ];

  const howSteps = [
    i18n.t("about.how.s1"),
    i18n.t("about.how.s2"),
    i18n.t("about.how.s3"),
    i18n.t("about.how.s4")
  ];

  const future = [i18n.t("about.future.b1"), i18n.t("about.future.b2"), i18n.t("about.future.b3")];

  return (
    <Container>
      <div className="grid gap-4">
        <Card>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip">KnowYourself</span>
                <span className="chip">Cambodia</span>
                <span className="chip">
                  {i18n.lang === "km" ? "ខ្មែរ" : "EN"} + {i18n.lang === "km" ? "English" : "ខ្មែរ"}
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">{i18n.t("about.title")}</h2>
              <p className="mt-2 max-w-2xl text-slate-200/75">{i18n.t("about.text")}</p>
            </div>

            <div className="grid gap-3 md:w-[360px]">
              <div className="surface p-4">
                <div className="text-sm font-semibold text-slate-200">{i18n.t("about.mission.title")}</div>
                <div className="mt-2 text-sm text-slate-200/70">{i18n.t("about.mission.text")}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="surface p-4 text-center">
                  <div className="text-xs text-slate-200/70">{i18n.t("about.stats.s1")}</div>
                </div>
                <div className="surface p-4 text-center">
                  <div className="text-xs text-slate-200/70">{i18n.t("about.stats.s2")}</div>
                </div>
                <div className="surface p-4 text-center">
                  <div className="text-xs text-slate-200/70">{i18n.t("about.stats.s3")}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="flex items-start gap-3">
              <Icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    stroke="rgba(56,189,248,.95)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Icon>
              <div>
                <div className="text-lg font-semibold">{i18n.t("about.problem.title")}</div>
                <ul className="mt-3 grid gap-2 text-sm text-slate-200/75">
                  {problemBullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/80" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-3">
              <Icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 12h6l2-7 2 14 2-7h4"
                    stroke="rgba(167,139,250,.95)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Icon>
              <div>
                <div className="text-lg font-semibold">{i18n.t("about.objectives.title")}</div>
                <ul className="mt-3 grid gap-2 text-sm text-slate-200/75">
                  {objectives.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300/80" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex items-start gap-3">
            <Icon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                  stroke="rgba(52,211,153,.95)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M11 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                  stroke="rgba(52,211,153,.95)"
                  strokeWidth="2"
                />
                <path
                  d="M22 21v-2a4 4 0 0 0-3-3.87"
                  stroke="rgba(52,211,153,.95)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M16 3.13a4 4 0 0 1 0 7.75"
                  stroke="rgba(52,211,153,.95)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Icon>
            <div className="flex-1">
              <div className="text-lg font-semibold">{i18n.t("about.users.title")}</div>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                {users.map((u) => (
                  <div key={u} className="surface p-4 text-sm text-slate-200/80">
                    {u}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-lg font-semibold">{i18n.t("about.features.title")}</div>
              <div className="mt-1 text-sm text-slate-200/70">{i18n.t("about.stats.title")}</div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="surface p-4 hover-lift">
                <div className="text-sm font-semibold text-slate-100">{f.title}</div>
                <div className="mt-2 text-sm text-slate-200/70">{f.text}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="text-lg font-semibold">{i18n.t("about.how.title")}</div>
            <ol className="mt-4 grid gap-3">
              {howSteps.map((s, idx) => (
                <li key={s} className="surface flex items-start gap-3 rounded-xl p-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-200">
                    {idx + 1}
                  </div>
                  <div className="text-sm text-slate-200/80">{s}</div>
                </li>
              ))}
            </ol>
          </Card>

          <Card>
            <div className="text-lg font-semibold">{i18n.t("about.future.title")}</div>
            <ul className="mt-4 grid gap-2 text-sm text-slate-200/75">
              {future.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/80" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  );
}
