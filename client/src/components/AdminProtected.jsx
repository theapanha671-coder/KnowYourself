import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function AdminProtected({ children }) {
  const auth = useAuth();
  const loc = useLocation();
  const i18n = useI18n();

  if (auth.loading) return <div className="p-6 text-slate-300">{i18n.t("protected.loading")}</div>;
  if (!auth.isAuthed) return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  if (!["admin", "employee"].includes(auth.user?.role)) return <Navigate to="/" replace />;
  return children;
}

