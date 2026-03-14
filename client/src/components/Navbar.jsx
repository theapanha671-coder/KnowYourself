import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { useTheme } from "../state/ThemeContext.jsx";
import { useI18n } from "../i18n/I18nContext.jsx";
import Container from "./Container.jsx";

const navLinkClass = ({ isActive }) =>
  [
    "rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
    isActive ? "bg-white/10 text-slate-100 shadow-sm" : "text-slate-200 hover:bg-white/10"
  ].join(" ");

export default function Navbar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const i18n = useI18n();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 shadow-card backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight text-slate-100">
            <span className="text-slate-100">Know</span>
            <span className="text-sky-300">Yourself</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink className={navLinkClass} to="/test">
              {i18n.t("nav.selfTest")}
            </NavLink>
            <NavLink className={navLinkClass} to="/majors">
              {i18n.t("nav.majors")}
            </NavLink>
            <NavLink className={navLinkClass} to="/roadmaps">
              {i18n.t("nav.roadmaps")}
            </NavLink>
            <NavLink className={navLinkClass} to="/experiences">
              {i18n.t("nav.experiences")}
            </NavLink>
            <NavLink className={navLinkClass} to="/videos">
              {i18n.t("nav.videos")}
            </NavLink>
            <NavLink className={navLinkClass} to="/blog">
              {i18n.t("nav.blog")}
            </NavLink>
            <NavLink className={navLinkClass} to="/about">
              {i18n.t("nav.about")}
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <label className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-sm text-slate-200 md:flex">
              <span className="sr-only">{i18n.t("nav.language")}</span>
              <select
                value={i18n.lang}
                onChange={(e) => i18n.setLang(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                aria-label={i18n.t("nav.language")}
              >
                <option value="en">EN</option>
                <option value="km">ខ្មែរ</option>
              </select>
            </label>

            <button
              className="btn btn-ghost"
              onClick={theme.toggle}
              aria-label={i18n.t("theme.toggle")}
            >
              {theme.theme === "dark" ? i18n.t("theme.dark") : i18n.t("theme.light")}
            </button>

            <button
              className="btn btn-ghost md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Menu"
            >
              {open ? "Close" : "Menu"}
            </button>

            {auth.isAuthed ? (
              <>
                <button onClick={() => navigate("/dashboard")} className="btn btn-primary">
                  {i18n.t("nav.dashboard")}
                </button>
                <button onClick={() => auth.logout()} className="btn btn-ghost">
                  {i18n.t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <NavLink className={navLinkClass} to="/login">
                  {i18n.t("nav.login")}
                </NavLink>
                <button onClick={() => navigate("/register")} className="btn btn-primary">
                  {i18n.t("nav.register")}
                </button>
              </>
            )}
          </div>
        </div>

        {open ? (
          <div className="md:hidden">
            <nav className="surface fade-in mb-4 grid gap-1 p-2">
              <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/test">
                {i18n.t("nav.selfTest")}
              </NavLink>
              <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/majors">
                {i18n.t("nav.majors")}
              </NavLink>
              <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/roadmaps">
                {i18n.t("nav.roadmaps")}
              </NavLink>
              <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/experiences">
                {i18n.t("nav.experiences")}
              </NavLink>
              <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/videos">
                {i18n.t("nav.videos")}
              </NavLink>
              <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/blog">
                {i18n.t("nav.blog")}
              </NavLink>
              <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/about">
                {i18n.t("nav.about")}
              </NavLink>

              <div className="surface mt-2 flex items-center justify-between p-2">
                <div className="text-sm font-semibold text-slate-200">{i18n.t("nav.language")}</div>
                <select
                  value={i18n.lang}
                  onChange={(e) => i18n.setLang(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                >
                  <option value="en">EN</option>
                  <option value="km">ខ្មែរ</option>
                </select>
              </div>

              <div className="surface mt-2 flex items-center justify-between p-2">
                <div className="text-sm font-semibold text-slate-200">{i18n.t("theme.toggle")}</div>
                <button className="btn btn-ghost" onClick={theme.toggle}>
                  {theme.theme === "dark" ? i18n.t("theme.dark") : i18n.t("theme.light")}
                </button>
              </div>
            </nav>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
