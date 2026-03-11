const CODE_LABELS = {
  R: "Realistic",
  I: "Investigative",
  A: "Artistic",
  S: "Social",
  E: "Enterprising",
  C: "Conventional"
};

// If the top 2 codes match one of these pairs (order-insensitive), we return a curated list.
const RECOMMENDATIONS = {
  RI: {
    majors: [
      "Information Technology",
      "Software Engineering",
      "Computer Engineering",
      "Network Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Industrial Engineering",
      "Environmental Engineering",
      "Agricultural Engineering",
      "Agronomy",
      "Animal Science",
      "Veterinary Medicine",
      "Forestry",
      "Fisheries",
      "Agro-Industry",
      "Land Management"
    ],
    careers: [
      "Software Developer",
      "Network Engineer",
      "Hardware Engineer",
      "Civil Engineer",
      "Electrical Engineer",
      "Mechanical Engineer",
      "Agronomist",
      "Veterinarian"
    ]
  },
  IA: {
    majors: [
      "Computer Science",
      "Data Science",
      "Artificial Intelligence",
      "Web Development",
      "Mobile App Development",
      "Information Systems",
      "Cyber Security"
    ],
    careers: [
      "Data Analyst",
      "AI Engineer",
      "Web Developer",
      "Mobile Developer",
      "Systems Analyst",
      "Cybersecurity Analyst"
    ]
  },
  AS: {
    majors: [
      "Graphic Design",
      "Architecture",
      "Interior Design",
      "Multimedia Design",
      "Fine Arts",
      "English Literature",
      "TESOL (Teaching English)",
      "Journalism",
      "Mass Media Communication",
      "Khmer Studies",
      "Chinese Language"
    ],
    careers: ["Graphic Designer", "Architect", "Artist", "Writer", "Teacher", "Journalist"]
  },
  ES: {
    majors: [
      "Business Administration",
      "Marketing",
      "Human Resource Management",
      "International Business",
      "Project Management",
      "Entrepreneurship",
      "Political Science",
      "International Relations",
      "Public Administration"
    ],
    careers: [
      "Marketing Specialist",
      "Entrepreneur",
      "HR Manager",
      "Project Manager",
      "Political Analyst",
      "Diplomat",
      "Public Administrator"
    ]
  },
  EC: {
    majors: ["Accounting", "Finance and Banking", "Supply Chain Management", "Economics"],
    careers: ["Accountant", "Financial Analyst", "Supply Chain Manager"]
  },
  IS: {
    majors: ["Medicine", "Dentistry", "Pharmacy", "Nursing", "Midwifery", "Public Health"],
    careers: ["Doctor", "Dentist", "Pharmacist", "Nurse", "Public Health Officer"]
  },
  EI: {
    majors: ["Law", "International Law"],
    careers: ["Lawyer", "International Lawyer"]
  }
};

// Fallback: if a student's top 2-code pair isn't curated above, we still return something sensible
// by combining the single-code recommendations.
const SINGLE_CODE_RECS = {
  R: {
    majors: [
      "Computer Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Industrial Engineering",
      "Environmental Engineering",
      "Agricultural Engineering",
      "Agronomy",
      "Animal Science",
      "Veterinary Medicine",
      "Forestry",
      "Fisheries",
      "Agro-Industry",
      "Land Management"
    ],
    careers: [
      "Engineer",
      "Civil Engineer",
      "Electrical Engineer",
      "Mechanical Engineer",
      "Agronomist",
      "Veterinarian",
      "Technician"
    ]
  },
  I: {
    majors: [
      "Computer Science",
      "Information Technology",
      "Software Engineering",
      "Data Science",
      "Artificial Intelligence",
      "Cyber Security",
      "Network Engineering",
      "Information Systems",
      "Web Development",
      "Mobile App Development"
    ],
    careers: [
      "Software Developer",
      "Data Analyst",
      "AI Engineer",
      "Systems Analyst",
      "Cybersecurity Analyst",
      "Network Engineer"
    ]
  },
  A: {
    majors: [
      "Graphic Design",
      "Architecture",
      "Interior Design",
      "Multimedia Design",
      "Fine Arts"
    ],
    careers: ["Graphic Designer", "Architect", "Designer", "Artist", "Content Creator"]
  },
  S: {
    majors: [
      "TESOL (Teaching English)",
      "English Literature",
      "Journalism",
      "Mass Media Communication",
      "Public Health",
      "Nursing",
      "Midwifery"
    ],
    careers: ["Teacher", "Journalist", "Counselor", "Nurse", "Public Health Officer"]
  },
  E: {
    majors: [
      "Business Administration",
      "Marketing",
      "Human Resource Management",
      "International Business",
      "Supply Chain Management",
      "Entrepreneurship",
      "Project Management",
      "Law",
      "Political Science",
      "International Relations",
      "Public Administration"
    ],
    careers: [
      "Entrepreneur",
      "Marketing Specialist",
      "Sales Representative",
      "HR Manager",
      "Project Manager",
      "Lawyer",
      "Public Administrator"
    ]
  },
  C: {
    majors: ["Accounting", "Finance and Banking", "Economics", "Supply Chain Management"],
    careers: ["Accountant", "Financial Analyst", "Bank Officer", "Operations Coordinator"]
  }
};

function uniq(list) {
  const out = [];
  const seen = new Set();
  for (const item of list || []) {
    if (!item) continue;
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}

function pickRecommendations(topCodes) {
  const topKey = (topCodes || []).slice(0, 2).join("");
  const rec = RECOMMENDATIONS[topKey] || RECOMMENDATIONS[[topKey[1], topKey[0]].join("")];
  if (rec) return rec;

  const a = topCodes?.[0];
  const b = topCodes?.[1];
  const aRec = (a && SINGLE_CODE_RECS[a]) || { majors: [], careers: [] };
  const bRec = (b && SINGLE_CODE_RECS[b]) || { majors: [], careers: [] };

  return {
    majors: uniq([...(aRec.majors || []), ...(bRec.majors || [])]).slice(0, 16),
    careers: uniq([...(aRec.careers || []), ...(bRec.careers || [])]).slice(0, 12)
  };
}

function computeTestResult(questions, answers) {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  for (let i = 0; i < questions.length; i += 1) {
    const q = questions[i];
    const choiceIndex = Number(answers[i]);
    const choice = q?.choices?.[choiceIndex];
    if (choice?.code && scores[choice.code] !== undefined) {
      scores[choice.code] += 1;
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topCodes = sorted.slice(0, 2).map(([code]) => code);

  const personalityLabel = topCodes.map((c) => CODE_LABELS[c]).filter(Boolean).join(" + ");
  const rec = pickRecommendations(topCodes);

  return {
    scores,
    topCodes,
    personalityLabel,
    recommendedMajors: rec.majors || [],
    recommendedCareers: rec.careers || []
  };
}

module.exports = { computeTestResult };
