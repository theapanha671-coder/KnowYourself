const CODE_LABELS = {
  en: {
    R: "Realistic",
    I: "Investigative",
    A: "Artistic",
    S: "Social",
    E: "Enterprising",
    C: "Conventional"
  },
  km: {
    R: "ការអនុវត្ត (Realistic)",
    I: "ការស្រាវជ្រាវ (Investigative)",
    A: "សិល្បៈ (Artistic)",
    S: "សង្គម (Social)",
    E: "អាជីវកម្ម (Enterprising)",
    C: "របៀបរៀបចំ (Conventional)"
  }
};

export function getCodeLabel(code, lang = "en") {
  const dict = CODE_LABELS[lang] || CODE_LABELS.en;
  return (dict && dict[code]) || String(code || "");
}

export function formatPersonalityLabel(topCodes, lang = "en") {
  const codes = Array.isArray(topCodes) ? topCodes : [];
  const parts = codes
    .slice(0, 2)
    .map((c) => getCodeLabel(c, lang))
    .filter(Boolean);
  return parts.join(" + ");
}


