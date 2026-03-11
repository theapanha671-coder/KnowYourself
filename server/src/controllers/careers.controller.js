const Career = require("../models/Career");

function pickCareerLang(careerDoc, lang, { includeRoadmap } = { includeRoadmap: false }) {
  const isKm = lang === "km";
  const roadmap = includeRoadmap
    ? (careerDoc.roadmap || []).map((r) => ({
        step: isKm ? r.stepKm || r.step : r.step,
        details: isKm ? r.detailsKm || r.details : r.details
      }))
    : undefined;

  return {
    slug: careerDoc.slug,
    title: isKm ? careerDoc.titleKm || careerDoc.title : careerDoc.title,
    description: isKm ? careerDoc.descriptionKm || careerDoc.description : careerDoc.description,
    imageUrl: careerDoc.imageUrl || "",
    skills: isKm && careerDoc.skillsKm?.length ? careerDoc.skillsKm : careerDoc.skills,
    ...(includeRoadmap ? { roadmap } : {})
  };
}

async function listCareers(req, res) {
  const lang = req.query?.lang === "km" ? "km" : "en";
  const careers = await Career.find({})
    .sort({ title: 1 })
    .select("slug title titleKm description descriptionKm imageUrl skills skillsKm");
  res.json({ careers: careers.map((c) => pickCareerLang(c, lang)) });
}

async function getCareer(req, res) {
  const { slug } = req.params;
  const lang = req.query?.lang === "km" ? "km" : "en";
  const career = await Career.findOne({ slug }).select(
    "slug title titleKm description descriptionKm imageUrl skills skillsKm roadmap"
  );
  if (!career) return res.status(404).json({ message: "Career not found" });
  return res.json({ career: pickCareerLang(career, lang, { includeRoadmap: true }) });
}

module.exports = { listCareers, getCareer };


