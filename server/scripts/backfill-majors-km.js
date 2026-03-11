const dotenv = require("dotenv");
dotenv.config();

const { connectDb } = require("../src/config/db");
const Major = require("../src/models/Major");
const { MAJOR_KM, PHRASE_KM } = require("./seed.km");

function mapList(list) {
  return (list || []).map((s) => PHRASE_KM[s] || s).filter(Boolean);
}

async function main() {
  await connectDb(process.env.MONGODB_URI);

  const majors = await Major.find({}).select(
    "slug title titleKm description descriptionKm skills skillsKm careers careersKm"
  );

  let updated = 0;

  for (const m of majors) {
    const km = MAJOR_KM[m.slug] || {};
    const update = {};

    if (!m.titleKm && km.titleKm) update.titleKm = km.titleKm;
    if (!m.descriptionKm && km.descriptionKm) update.descriptionKm = km.descriptionKm;

    if ((!m.skillsKm || m.skillsKm.length === 0) && m.skills && m.skills.length) {
      update.skillsKm = mapList(m.skills);
    }

    if ((!m.careersKm || m.careersKm.length === 0) && m.careers && m.careers.length) {
      update.careersKm = mapList(m.careers);
    }

    if (Object.keys(update).length) {
      await Major.updateOne({ _id: m._id }, { $set: update });
      updated += 1;
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Majors updated: ${updated}`);
  process.exit(0);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
