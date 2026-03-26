import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/Card.jsx";
import Field from "../../components/Field.jsx";
import { http, toAssetUrl } from "../../api/http.js";
import { useI18n } from "../../i18n/I18nContext.jsx";
import { useAuth } from "../../state/AuthContext.jsx";

const empty = { name: "", email: "", password: "", role: "student", permissions: [] };

function canWriteUsers(user) {
  if (!user) return false;
  if (user.role === "admin") return true;
  const perms = Array.isArray(user.permissions) ? user.permissions : [];
  if (perms.includes("users:write")) return true;
  return false;
}

export default function AdminUsers() {
  const i18n = useI18n();
  const auth = useAuth();
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarUploading, setAvatarUploading] = useState(false);

  const permissionGroups = [
    { key: "stats", label: i18n.t("admin.perm.stats") },
    { key: "majors", label: i18n.t("admin.majors") },
    { key: "careers", label: i18n.t("admin.careers") },
    { key: "posts", label: i18n.t("admin.posts") },
    { key: "videos", label: i18n.t("admin.videos") },
    { key: "experiences", label: i18n.t("admin.experiences") },
    { key: "users", label: i18n.t("admin.users") }
  ];

  const canWrite = canWriteUsers(auth.user);

  function load() {
    return http
      .get("/admin/users")
      .then(({ data }) => setItems(data.users || []))
      .catch((e) => setError(e?.response?.data?.message || i18n.t("admin.loadFail.users")));
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview("");
      return;
    }
    const url = URL.createObjectURL(avatarFile);
    setAvatarPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  const isEditing = useMemo(() => Boolean(active?._id), [active]);
  const isMe = useMemo(() => active?._id && auth.user?.id && String(active._id) === String(auth.user.id), [active, auth.user]);

  function select(item) {
    setActive(item);
    setAvatarFile(null);
    setAvatarPreview("");
    setForm({
      name: item.name || "",
      email: item.email || "",
      password: "",
      role: item.role === "admin" ? "admin" : item.role === "employee" ? "employee" : "student",
      permissions: Array.isArray(item.permissions) ? item.permissions : []
    });
  }

  function newItem() {
    setActive(null);
    setAvatarFile(null);
    setAvatarPreview("");
    setForm(empty);
  }

  function togglePermission(permission) {
    const list = Array.isArray(form.permissions) ? form.permissions : [];
    const has = list.includes(permission);
    const next = has ? list.filter((p) => p !== permission) : [...list, permission];
    setForm({ ...form, permissions: next });
  }

  async function uploadAvatar() {
    if (!active?._id || !avatarFile) return;
    setError("");
    try {
      setAvatarUploading(true);
      const data = new FormData();
      data.append("file", avatarFile);
      const res = await http.post(`/admin/users/${active._id}/avatar`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      const updated = res?.data?.user;
      await load();
      if (updated) {
        setActive(updated);
      }
      setAvatarFile(null);
      setAvatarPreview("");
    } catch (e) {
      setError(e?.response?.data?.message || i18n.t("admin.uploadFail"));
    } finally {
      setAvatarUploading(false);
    }
  }

  async function save() {
    setError("");
    try {
      setSaving(true);
      if (!form.name.trim()) return setError(i18n.t("admin.required.name"));
      if (!isEditing && !form.email.trim()) return setError(i18n.t("admin.required.email"));
      if (!isEditing && !form.password.trim()) return setError(i18n.t("admin.required.password"));

      if (isEditing) {
        const payload = {
          name: form.name,
          role: form.role,
          permissions: form.role === "employee" ? form.permissions : [],
          ...(form.password.trim() ? { password: form.password } : {})
        };
        await http.put(`/admin/users/${active._id}`, payload);
      } else {
        await http.post("/admin/users", form);
      }

      await load();
      newItem();
    } catch (e) {
      setError(e?.response?.data?.message || i18n.t("admin.saveFail"));
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!active?._id) return;
    // eslint-disable-next-line no-alert
    if (!confirm(i18n.t("admin.confirmDeleteUser"))) return;
    setError("");
    try {
      setSaving(true);
      await http.delete(`/admin/users/${active._id}`);
      await load();
      newItem();
    } catch (e) {
      setError(e?.response?.data?.message || i18n.t("admin.deleteFail"));
    } finally {
      setSaving(false);
    }
  }

  const activeAvatarUrl = avatarPreview || toAssetUrl(active?.avatarUrl);
  const activeInitial = (active?.name || "U").trim().slice(0, 1).toUpperCase();

  return (
    <div className="grid gap-4 md:grid-cols-[360px,1fr]">
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">{i18n.t("admin.users")}</div>
          <button className="btn-secondary press" onClick={newItem}>
            {i18n.t("admin.new")}
          </button>
        </div>
        {error ? (
          <div className="mt-3 rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}
        <div className="mt-4 grid gap-2">
          {items.map((u) => {
            const avatarUrl = toAssetUrl(u.avatarUrl);
            const initial = (u.name || "U").trim().slice(0, 1).toUpperCase();
            return (
              <button
                key={u._id}
                onClick={() => select(u)}
                className={`text-left rounded-xl border border-white/10 px-3 py-2 transition-colors hover:bg-white/10 ${
                  active?._id === u._id ? "bg-white/10" : "bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/5">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={u.name || "User"} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-200">
                        {initial}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-slate-100">{u.name}</div>
                      <span className="chip">{u.role}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-200/70">{u.email}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <div className="text-lg font-semibold">
          {isEditing ? i18n.t("admin.editUser") : i18n.t("admin.createUser")}
        </div>
        <div className="mt-4 grid gap-3">
          {isEditing ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 overflow-hidden rounded-full border border-white/10 bg-white/5">
                  {activeAvatarUrl ? (
                    <img src={activeAvatarUrl} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-200">
                      {activeInitial}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-100">{active?.name || "-"}</div>
                  <div className="text-xs text-slate-200/70">{active?.email || "-"}</div>
                </div>
              </div>
              <div className="mt-3 text-sm font-semibold text-slate-200">{i18n.t("admin.avatarTitle")}</div>
              <div className="mt-1 text-xs text-slate-200/70">{i18n.t("admin.avatarHint")}</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                  disabled={!canWrite}
                />
                <button
                  className="btn-secondary press"
                  onClick={uploadAvatar}
                  disabled={!avatarFile || avatarUploading || !canWrite}
                >
                  {avatarUploading ? i18n.t("admin.uploading") : i18n.t("admin.upload")}
                </button>
              </div>
            </div>
          ) : null}

          <Field label={i18n.t("admin.field.name")}>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label={i18n.t("admin.field.email")} hint={isEditing ? i18n.t("admin.userEmailLocked") : ""}>
            <input
              className="input"
              value={form.email}
              disabled={isEditing}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="user@example.com"
            />
          </Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label={i18n.t("admin.field.role")}>
              <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="student">{i18n.t("admin.role.student")}</option>
                <option value="employee">{i18n.t("admin.role.employee")}</option>
                <option value="admin">{i18n.t("admin.role.admin")}</option>
              </select>
            </Field>
            <Field label={i18n.t("admin.field.password")} hint={isEditing ? i18n.t("admin.passwordOptional") : ""}>
              <input
                className="input"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={isEditing ? "********" : "Min 6 chars"}
              />
            </Field>
          </div>

          {form.role === "employee" ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-sm font-semibold text-slate-100">{i18n.t("admin.permissions")}</div>
              <div className="mt-1 text-xs text-slate-200/70">{i18n.t("admin.permissionsHint")}</div>
              <div className="mt-3 grid gap-2">
                {permissionGroups.map((group) => (
                  <div key={group.key} className="grid gap-2 md:grid-cols-[1fr,1fr]">
                    <div className="text-sm text-slate-200/80">{group.label}</div>
                    <div className="flex flex-wrap gap-3">
                      {["read", "write"].map((action) => {
                        const value = `${group.key}:${action}`;
                        const checked = form.permissions.includes(value);
                        return (
                          <label key={value} className="flex items-center gap-2 text-xs text-slate-100">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => togglePermission(value)}
                              disabled={!canWrite}
                            />
                            <span>{action === "read" ? i18n.t("admin.perm.read") : i18n.t("admin.perm.write")}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button disabled={saving || !canWrite} onClick={save} className="btn-primary press">
            {saving ? i18n.t("admin.saving") : i18n.t("admin.save")}
          </button>
          {isEditing ? (
            <button disabled={saving || isMe || !canWrite} onClick={remove} className="btn-secondary press" title={isMe ? "Disabled" : ""}>
              {i18n.t("admin.delete")}
            </button>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
