import axios from "axios";

const apiBase = import.meta.env.VITE_API_URL || "https://knowyourself-3x1r.onrender.com/api";
export const apiOrigin = apiBase.replace(/\/api\/?$/, "");

export const http = axios.create({
  baseURL: apiBase,
  timeout: 15000
});

export function toAssetUrl(url) {
  if (!url) return "";
  const s = String(url);
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/uploads/")) return `${apiOrigin}${s}`;
  return s;
}

export function setAuthToken(token) {
  if (token) http.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete http.defaults.headers.common.Authorization;
}
