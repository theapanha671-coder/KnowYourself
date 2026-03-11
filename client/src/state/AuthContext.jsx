import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { http, setAuthToken } from "../api/http.js";

const AuthContext = createContext(null);
const TOKEN_KEY = "ky_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useEffect(() => {
    async function loadMe() {
      if (!token) return;
      try {
        const { data } = await http.get("/users/me");
        setUser(data.user);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      }
    }

    setLoading(true);
    loadMe().finally(() => setLoading(false));
  }, [token]);

  const value = useMemo(() => {
    return {
      token,
      user,
      loading,
      isAuthed: Boolean(token && user),
      async login(email, password) {
        const { data } = await http.post("/auth/login", { email, password });
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
      },
      async register(name, email, password) {
        const { data } = await http.post("/auth/register", { name, email, password });
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
      },
      async refresh() {
        if (!token) return;
        const { data } = await http.get("/users/me");
        setUser(data.user);
      },
      logout() {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
        setAuthToken(null);
      }
    };
  }, [token, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}



