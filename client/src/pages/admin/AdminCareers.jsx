import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/Card.jsx";
import Field from "../../components/Field.jsx";
import { http } from "../../api/http.js";
import { useI18n } from "../../i18n/I18nContext.jsx";

function emptyStep() {
  return { step: "", stepKm: "", details: "", detailsKm: "" };
}

const empty = {
  title: "",
  titleKm: "",
  description: "",
  descriptionKm: "",
  imageUrl: "",
  skills: "",
  skillsKm: "",
  roadmap: [emptyStep()]
};

export default function AdminCareers() {
  const i18n = useI18n();
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  function toCsv(arr) {
    return (arr || []).join(", ");
  }

  function load() {
    return http
      .get("/admin/careers")
      .then(({ data }) => setItems(data.careers || []))
      .catch((e) => setError(e?.response?.data?.message || i18n.t("admin.loadFail.careers")));
  }

  useEffect(() => {
    load();
  }, []);

  const isEditing = useMemo(() => Boolean(active?._id), [active]);

  function select(item) {
    setActive(item);
    setImageFile(null);
    setForm({
      title: item.title || "",
      titleKm: item.titleKm || "",
      description: item.description || "",
      descriptionKm: item.descriptionKm || "",
      imageUrl: item.imageUrl || "",
      skills: toCsv(item.skills),
      skillsKm: toCsv(item.skillsKm),
      roadmap: (item.roadmap?.length ? item.roadmap : [emptyStep()]).map((r) => ({
        step: r.step || "",
        stepKm: r.stepKm || "",
        details: r.details || "",
        detailsKm: r.detailsKm || ""
      }))
    });
  }

  function newItem() {
    setActive(null);
    setForm(empty);
  }

  function updateStep(index, patch) {
    const next = form.roadmap.slice();
    next[index] = { ...next[index], ...patch };
    setImageFile(null);
    setForm({ ...form, roadmap: next });
  }

  function addStep() {
    setImageFile(null);
    setForm({ ...form, roadmap: [...form.roadmap, emptyStep()] });
  }

  function removeStep(index) {
    const next = form.roadmap.slice();
    next.splice(index, 1);
    setImageFile(null);
    setForm({ ...form, roadmap: next.length ? next : [emptyStep()] });
  }


  async function uploadCareerImage() {
    if (!imageFile) return;
    setError("");
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", imageFile);
      const res = await http.post("/admin/uploads/career-image", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setForm((prev) => ({ ...prev, imageUrl: res.data?.url || "" }));
    } catch (e) {
      setError(e?.response?.data?.message || i18n.t("admin.uploadFail"));
    } finally {
      setUploading(false);
    }
  }
  async function save() {
    setError("");
    try {
      setSaving(true);
      if (!form.title.trim()) return setError(i18n.t("admin.required.title"));
      const payload = {
        ...form,
        roadmap: (form.roadmap || []).filter((r) => String(r.step || "").trim() || String(r.stepKm || "").trim())
      };
      if (isEditing) {
        await http.put(`/admin/careers/${active._id}`, payload);
      } else {
        await http.post("/admin/careers", payload);
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
    if (!confirm(i18n.t("admin.confirmDeleteCareer"))) return;
    setError("");
    try {
      setSaving(true);
      await http.delete(`/admin/careers/${active._id}`);
      await load();
      newItem();
    } catch (e) {
      setError(e?.response?.data?.message || i18n.t("admin.deleteFail"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-[320px,1fr]">
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">{i18n.t("admin.careers")}</div>
          <button className="btn-secondary press" onClick={newItem}>
            {i18n.t("admin.new")}
          </button>
        </div>
        <div className="mt-3 grid gap-2">
          {items.map((c) => (
            <button
              key={c._id}
              onClick={() => select(c)}
              className={`text-left rounded-xl border border-white/10 px-3 py-2 transition-colors hover:bg-white/10 ${
                active?._id === c._id ? "bg-white/10" : "bg-white/5"
              }`}
            >
              <div className="text-sm font-semibold text-slate-100">{c.title}</div>
              {c.titleKm ? <div className="text-xs text-slate-200/70">{c.titleKm}</div> : null}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="text-lg font-semibold">
          {isEditing ? i18n.t("admin.editCareer") : i18n.t("admin.createCareer")}
        </div>
        {error ? (
          <div className="mt-3 rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}
        <div className="mt-4 grid gap-3">
          <Field label={i18n.t("admin.field.titleEn")}>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label={i18n.t("admin.field.titleKm")}>
            <input className="input" value={form.titleKm} onChange={(e) => setForm({ ...form, titleKm: e.target.value })} />
          </Field>
          <Field label={i18n.t("admin.field.descEn")}>
            <textarea className="textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label={i18n.t("admin.field.descKm")}>
            <textarea
              className="textarea"
              value={form.descriptionKm}
              onChange={(e) => setForm({ ...form, descriptionKm: e.target.value })}
            />
          </Field>
          <Field label={i18n.t("admin.field.imageUrl")} hint="/images/careers/software-developer.svg">
            <input
              className="input"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="/uploads/careers/your-icon.svg"
            />
          </Field>
          <div className="grid gap-2 md:grid-cols-[1fr,auto] md:items-end">
            <Field label={i18n.t("admin.field.uploadImage")} hint={i18n.t("admin.field.uploadHint")}>
              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </Field>
            <button
              type="button"
              disabled={!imageFile || uploading}
              onClick={uploadCareerImage}
              className="btn-secondary press"
            >
              {uploading ? i18n.t("admin.uploading") : i18n.t("admin.upload")}
            </button>
          </div>          <Field label={i18n.t("admin.field.skillsEn")}>
            <input className="input" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
          </Field>
          <Field label={i18n.t("admin.field.skillsKm")}>
            <input className="input" value={form.skillsKm} onChange={(e) => setForm({ ...form, skillsKm: e.target.value })} />
          </Field>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-200">{i18n.t("roadmap.steps")}</div>
            <button className="btn-secondary press" onClick={addStep}>
              {i18n.t("admin.addStep")}
            </button>
          </div>
          <div className="mt-3 grid gap-3">
            {form.roadmap.map((r, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-200">
                    {i18n.t("admin.step", { n: idx + 1 })}
                  </div>
                  <button className="btn-ghost press px-3 py-2" onClick={() => removeStep(idx)}>
                    {i18n.t("admin.removeStep")}
                  </button>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <Field label={i18n.t("admin.field.stepEn")}>
                    <input className="input" value={r.step} onChange={(e) => updateStep(idx, { step: e.target.value })} />
                  </Field>
                  <Field label={i18n.t("admin.field.stepKm")}>
                    <input
                      className="input"
                      value={r.stepKm}
                      onChange={(e) => updateStep(idx, { stepKm: e.target.value })}
                    />
                  </Field>
                  <Field label={i18n.t("admin.field.detailsEn")}>
                    <textarea
                      className="textarea"
                      value={r.details}
                      onChange={(e) => updateStep(idx, { details: e.target.value })}
                    />
                  </Field>
                  <Field label={i18n.t("admin.field.detailsKm")}>
                    <textarea
                      className="textarea"
                      value={r.detailsKm}
                      onChange={(e) => updateStep(idx, { detailsKm: e.target.value })}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button disabled={saving} onClick={save} className="btn-primary press">
            {saving ? i18n.t("admin.saving") : i18n.t("admin.save")}
          </button>
          {isEditing ? (
            <button disabled={saving} onClick={remove} className="btn-secondary press">
              {i18n.t("admin.delete")}
            </button>
          ) : null}
        </div>
      </Card>
    </div>
  );
}








