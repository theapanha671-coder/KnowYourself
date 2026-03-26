import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Container from "../../components/Container.jsx";
import { useAuth } from "../../state/AuthContext.jsx";
import { useI18n } from "../../i18n/I18nContext.jsx";

const linkClass = ({ isActive }) =>
  `rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? "bg-white/10 text-white" : "text-slate-200 hover:bg-white/10"
  }`;

function canAccess(user, permission) {
  if (!user) return false;
  if (user.role === "admin") return true;
  const perms = Array.isArray(user.permissions) ? user.permissions : [];
  if (perms.includes(permission)) return true;
  if (permission.endsWith(":read")) {
    const writePerm = permission.replace(":read", ":write");
    if (perms.includes(writePerm)) return true;
  }
  return false;
}

export default function AdminLayout() {
  const auth = useAuth();
  const i18n = useI18n();
  const user = auth.user;
  return (
    <Container>
      <div className="grid gap-4 md:grid-cols-[240px,1fr]">
        <aside className="surface p-3">
          <div className="px-2 py-2 text-sm font-semibold text-slate-100">{i18n.t("admin.title")}</div>
          <div className="px-2 pb-3 text-xs text-slate-200/70">{user?.email}</div>
          <nav className="grid gap-1">
            {canAccess(user, "stats:read") ? (
              <NavLink className={linkClass} to="/admin">
                {i18n.t("admin.overview")}
              </NavLink>
            ) : null}
            {canAccess(user, "majors:read") ? (
              <NavLink className={linkClass} to="/admin/majors">
                {i18n.t("admin.majors")}
              </NavLink>
            ) : null}
            {canAccess(user, "careers:read") ? (
              <NavLink className={linkClass} to="/admin/careers">
                {i18n.t("admin.careers")}
              </NavLink>
            ) : null}
            {canAccess(user, "posts:read") ? (
              <NavLink className={linkClass} to="/admin/posts">
                {i18n.t("admin.posts")}
              </NavLink>
            ) : null}
            {canAccess(user, "videos:read") ? (
              <NavLink className={linkClass} to="/admin/videos">
                {i18n.t("admin.videos")}
              </NavLink>
            ) : null}
            {canAccess(user, "experiences:read") ? (
              <NavLink className={linkClass} to="/admin/experiences">
                {i18n.t("admin.experiences")}
              </NavLink>
            ) : null}
            {canAccess(user, "users:read") ? (
              <NavLink className={linkClass} to="/admin/users">
                {i18n.t("admin.users")}
              </NavLink>
            ) : null}
          </nav>
        </aside>

        <section className="page-enter">
          <Outlet />
        </section>
      </div>
    </Container>
  );
}
