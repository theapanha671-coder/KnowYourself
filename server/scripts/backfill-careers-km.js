const dotenv = require("dotenv");
dotenv.config();

const { connectDb } = require("../src/config/db");
const Career = require("../src/models/Career");
const { CAREER_KM } = require("./seed.careers.km");
const { CAREER_IMAGE_URL } = require("./seed.careers.assets");

function isPlaceholder(value) {
  const s = String(value || "");
  return !s || s.includes("[km]");
}

async function main() {
  await connectDb(process.env.MONGODB_URI);

  const careers = await Career.find({}).select(
    "slug titleKm descriptionKm skills skillsKm roadmap imageUrl"
  );

  let updated = 0;

  for (const c of careers) {
    const km = CAREER_KM[c.slug];
    const icon = CAREER_IMAGE_URL[c.slug];

    const update = {};

    if ((!c.imageUrl || String(c.imageUrl).trim() === "") && icon) {
      update.imageUrl = icon;
    }

    if (km) {
      if (isPlaceholder(c.titleKm) && km.titleKm) update.titleKm = km.titleKm;
      if (isPlaceholder(c.descriptionKm) && km.descriptionKm) update.descriptionKm = km.descriptionKm;

      const skillsKmBad =
        !Array.isArray(c.skillsKm) ||
        c.skillsKm.length === 0 ||
        c.skillsKm.some((x) => String(x || "").includes("[km]"));

      if (skillsKmBad && km.skillsKm) update.skillsKm = km.skillsKm;

      const roadmap = Array.isArray(c.roadmap)
        ? c.roadmap.map((r) => ({ ...(r.toObject?.() ?? r) }))
        : [];

      let roadmapChanged = false;

      for (let i = 0; i < roadmap.length; i += 1) {
        const r = roadmap[i];
        const rKm = km.roadmap?.[i];
        if (!rKm) continue;

        if (isPlaceholder(r.stepKm) && rKm.stepKm) {
          r.stepKm = rKm.stepKm;
          roadmapChanged = true;
        }
        if (isPlaceholder(r.detailsKm) && rKm.detailsKm) {
          r.detailsKm = rKm.detailsKm;
          roadmapChanged = true;
        }
      }

      if (roadmapChanged) update.roadmap = roadmap;
    }

    if (Object.keys(update).length) {
      await Career.updateOne({ _id: c._id }, { $set: update });
      updated += 1;
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Careers updated: ${updated}`);
  process.exit(0);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
