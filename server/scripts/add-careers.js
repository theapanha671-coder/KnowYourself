const dotenv = require("dotenv");
dotenv.config();

const { connectDb } = require("../src/config/db");
const Career = require("../src/models/Career");
const { CAREER_IMAGE_URL } = require("./seed.careers.assets");

const EXTRA_CAREERS = [
  {
    slug: "web-developer",
    title: "Web Developer",
    titleKm: "អ្នកអភិវឌ្ឍវេបសាយ",
    description: "Build websites and web apps that people can use on browsers.",
    descriptionKm: "បង្កើតវេបសាយ និងកម្មវិធីវេប ដែលមនុស្សអាចប្រើប្រាស់លើ Browser បាន។",
    skills: ["HTML/CSS", "JavaScript", "React", "APIs"],
    skillsKm: ["HTML/CSS", "JavaScript", "React", "API"],
    roadmap: [
      {
        step: "Learn HTML, CSS, and responsive layout",
        stepKm: "រៀន HTML, CSS និង Responsive",
        details: "Build simple pages and make them look good on mobile.",
        detailsKm: "ធ្វើទំព័រងាយៗ ហើយធ្វើឲ្យស្អាតលើទូរស័ព្ទ។"
      },
      {
        step: "Learn JavaScript and DOM",
        stepKm: "រៀន JavaScript និង DOM",
        details: "Events, fetch, forms, and basic debugging.",
        detailsKm: "Events, fetch, forms និងការដោះកំហុសមូលដ្ឋាន។"
      },
      {
        step: "Build with React and routing",
        stepKm: "បង្កើតជាមួយ React និង Routing",
        details: "Components, state, API calls, and pages.",
        detailsKm: "Components, state, ហៅ API និងទំព័រ។"
      },
      {
        step: "Deploy and build a portfolio",
        stepKm: "Deploy និងបង្កើត Portfolio",
        details: "Host your projects and write clear README.",
        detailsKm: "ដាក់ host គម្រោង និងសរសេរ README ឲ្យច្បាស់។"
      }
    ]
  },
  {
    slug: "mobile-developer",
    title: "Mobile App Developer",
    titleKm: "អ្នកអភិវឌ្ឍកម្មវិធីទូរស័ព្ទ",
    description: "Build Android/iOS apps with great UI and performance.",
    descriptionKm: "បង្កើតកម្មវិធី Android/iOS ដែលមាន UI ស្អាត និងដំណើរការល្អ។",
    skills: ["React Native", "UI design", "APIs", "Testing"],
    skillsKm: ["React Native", "រចនា UI", "API", "ការសាកល្បង"],
    roadmap: [
      {
        step: "Learn app UI basics",
        stepKm: "រៀនមូលដ្ឋាន UI កម្មវិធី",
        details: "Layouts, navigation, and reusable components.",
        detailsKm: "Layouts, navigation និង components ប្រើឡើងវិញ។"
      },
      {
        step: "Learn React Native",
        stepKm: "រៀន React Native",
        details: "State, lists, forms, and device features.",
        detailsKm: "State, lists, forms និងមុខងារឧបករណ៍។"
      },
      {
        step: "Connect to APIs and store data",
        stepKm: "ភ្ជាប់ API និងរក្សាទិន្នន័យ",
        details: "Auth, CRUD, caching/offline basics.",
        detailsKm: "Auth, CRUD និងមូលដ្ឋាន caching/offline។"
      },
      {
        step: "Publish and improve",
        stepKm: "Publish និងកែលម្អ",
        details: "Fix bugs, improve UX, and prepare releases.",
        detailsKm: "កែកំហុស កែលម្អ UX និងត្រៀម release។"
      }
    ]
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    titleKm: "អ្នករចនា UI/UX",
    description: "Design user-friendly interfaces and improve user experience.",
    descriptionKm: "រចនា interface ឲ្យងាយប្រើ និងកែលម្អបទពិសោធន៍អ្នកប្រើ។",
    skills: ["User research", "Wireframing", "Figma", "Prototyping"],
    skillsKm: ["ស្រាវជ្រាវអ្នកប្រើ", "Wireframe", "Figma", "Prototype"],
    roadmap: [
      {
        step: "Learn UX fundamentals",
        stepKm: "រៀនមូលដ្ឋាន UX",
        details: "User goals, problems, and simple personas.",
        detailsKm: "គោលដៅអ្នកប្រើ បញ្ហា និង persona ងាយៗ។"
      },
      {
        step: "Make wireframes",
        stepKm: "ធ្វើ Wireframe",
        details: "Sketch screens and user flows quickly.",
        detailsKm: "គូរអេក្រង់ និង flow ឲ្យលឿន។"
      },
      {
        step: "Design in Figma",
        stepKm: "រចនានៅក្នុង Figma",
        details: "Components, styles, spacing, and accessibility.",
        detailsKm: "Components, styles, spacing និង accessibility។"
      },
      {
        step: "Test and iterate",
        stepKm: "សាកល្បង និងកែលម្អ",
        details: "Get feedback, run usability tests, refine.",
        detailsKm: "ទទួលមតិយោបល់ សាកល្បង usability ហើយកែលម្អ។"
      }
    ]
  },
  {
    slug: "network-engineer",
    title: "Network Engineer",
    titleKm: "វិស្វករបណ្តាញ",
    description: "Design and maintain secure and reliable computer networks.",
    descriptionKm: "រចនា និងថែទាំបណ្តាញកុំព្យូទ័រឲ្យមានស្ថិរភាព និងសុវត្ថិភាព។",
    skills: ["Routing/Switching", "Network security", "Linux", "Troubleshooting"],
    skillsKm: ["Routing/Switching", "សន្តិសុខបណ្តាញ", "Linux", "ដោះស្រាយបញ្ហា"],
    roadmap: [
      {
        step: "Learn networking basics",
        stepKm: "រៀនមូលដ្ឋានបណ្តាញ",
        details: "IP, subnetting, DNS, and TCP/IP.",
        detailsKm: "IP, subnetting, DNS និង TCP/IP។"
      },
      {
        step: "Practice routing and switching",
        stepKm: "ហ្វឹកហាត់ Routing និង Switching",
        details: "Use labs (Packet Tracer/GNS3) and real routers.",
        detailsKm: "ហ្វឹកហាត់នៅលើ lab (Packet Tracer/GNS3) និងឧបករណ៍ពិត។"
      },
      {
        step: "Learn security and monitoring",
        stepKm: "រៀនសន្តិសុខ និង Monitoring",
        details: "Firewalls, VPN, logs, and basic SIEM.",
        detailsKm: "Firewall, VPN, logs និងមូលដ្ឋាន SIEM។"
      },
      {
        step: "Get certified and build experience",
        stepKm: "ទទួលវិញ្ញាបនបត្រ និងបទពិសោធន៍",
        details: "CCNA (or similar) + internships/projects.",
        detailsKm: "CCNA (ឬស្មើ) + internship/គម្រោង។"
      }
    ]
  },
  {
    slug: "accountant",
    title: "Accountant",
    titleKm: "គណនេយ្យករ",
    description: "Record, review, and report financial activities for organizations.",
    descriptionKm: "កត់ត្រា ពិនិត្យ និងរាយការណ៍ប្រតិបត្តិការហិរញ្ញវត្ថុរបស់អង្គការ។",
    skills: ["Bookkeeping", "Financial reporting", "Excel", "Accuracy"],
    skillsKm: ["កត់ត្រាបញ្ជី", "របាយការណ៍ហិរញ្ញវត្ថុ", "Excel", "ភាពត្រឹមត្រូវ"],
    roadmap: [
      {
        step: "Learn accounting basics",
        stepKm: "រៀនមូលដ្ឋានគណនេយ្យ",
        details: "Assets, liabilities, income, expenses.",
        detailsKm: "ទ្រព្យសម្បត្តិ បំណុល ចំណូល ចំណាយ។"
      },
      {
        step: "Practice with Excel and software",
        stepKm: "ហ្វឹកហាត់ Excel និងកម្មវិធី",
        details: "Journals, ledgers, and simple statements.",
        detailsKm: "Journal, ledger និងរបាយការណ៍ងាយៗ។"
      },
      {
        step: "Learn taxes and compliance",
        stepKm: "រៀនពន្ធ និងការអនុលោម",
        details: "Understand local requirements and documentation.",
        detailsKm: "យល់អំពីតម្រូវការក្នុងប្រទេស និងឯកសារចាំបាច់។"
      },
      {
        step: "Build experience",
        stepKm: "បង្កើនបទពិសោធន៍",
        details: "Internship in accounting/finance teams.",
        detailsKm: "Internship នៅក្រុមគណនេយ្យ/ហិរញ្ញវត្ថុ។"
      }
    ]
  },
  {
    slug: "marketing-specialist",
    title: "Marketing Specialist",
    titleKm: "អ្នកជំនាញទីផ្សារ",
    description: "Plan and run marketing campaigns to grow a brand.",
    descriptionKm: "រៀបចំ និងអនុវត្តយុទ្ធនាការទីផ្សារ ដើម្បីពង្រីកម៉ាក។",
    skills: ["Content", "Social media", "Analytics", "Communication"],
    skillsKm: ["មាតិកា", "បណ្តាញសង្គម", "វិភាគទិន្នន័យ", "ទំនាក់ទំនង"],
    roadmap: [
      {
        step: "Learn marketing fundamentals",
        stepKm: "រៀនមូលដ្ឋានទីផ្សារ",
        details: "Target audience, positioning, 4Ps.",
        detailsKm: "Target audience, positioning និង 4Ps។"
      },
      {
        step: "Practice content and design",
        stepKm: "ហ្វឹកហាត់មាតិកា និងការរចនា",
        details: "Write posts, make simple visuals, schedule.",
        detailsKm: "សរសេរ post ធ្វើរូបភាពងាយៗ និងរៀបចំពេលបង្ហោះ។"
      },
      {
        step: "Run campaigns and measure",
        stepKm: "ធ្វើយុទ្ធនាការ និងវាស់លទ្ធផល",
        details: "Ads, KPIs, A/B testing basics.",
        detailsKm: "Ads, KPI និងមូលដ្ឋាន A/B testing។"
      },
      {
        step: "Build a case study portfolio",
        stepKm: "បង្កើត Portfolio (case study)",
        details: "Show goals, actions, results with numbers.",
        detailsKm: "បង្ហាញគោលដៅ អ្វីដែលធ្វើ និងលទ្ធផលជាលេខ។"
      }
    ]
  },
  {
    slug: "hr-manager",
    title: "HR Manager",
    titleKm: "អ្នកគ្រប់គ្រងធនធានមនុស្ស",
    description: "Hire, develop, and support people in an organization.",
    descriptionKm: "ជ្រើសរើស អភិវឌ្ឍ និងគាំទ្របុគ្គលិកក្នុងអង្គការ។",
    skills: ["Recruitment", "People skills", "Policies", "Communication"],
    skillsKm: ["ជ្រើសរើសបុគ្គលិក", "ទំនាក់ទំនងមនុស្ស", "គោលការណ៍/Policy", "ទំនាក់ទំនង"],
    roadmap: [
      {
        step: "Learn HR basics",
        stepKm: "រៀនមូលដ្ឋាន HR",
        details: "Recruitment, onboarding, performance.",
        detailsKm: "Recruitment, onboarding និង performance។"
      },
      {
        step: "Practice interviewing",
        stepKm: "ហ្វឹកហាត់សម្ភាសន៍",
        details: "Screen CVs and ask structured questions.",
        detailsKm: "ពិនិត្យ CV និងសួរសំណួរដោយមានរចនាសម្ព័ន្ធ។"
      },
      {
        step: "Learn labor rules and policies",
        stepKm: "រៀនច្បាប់ការងារ និង Policy",
        details: "Understand contracts, benefits, compliance.",
        detailsKm: "យល់ពីកិច្ចសន្យា អត្ថប្រយោជន៍ និងការអនុលោម។"
      },
      {
        step: "Build HR experience",
        stepKm: "បង្កើនបទពិសោធន៍ HR",
        details: "Work in HR/admin roles, lead initiatives.",
        detailsKm: "ធ្វើការងារ HR/admin និងដឹកនាំ initiative តូចៗ។"
      }
    ]
  },
  {
    slug: "supply-chain-manager",
    title: "Supply Chain Manager",
    titleKm: "អ្នកគ្រប់គ្រងខ្សែសង្វាក់ផ្គត់ផ្គង់",
    description: "Manage purchasing, inventory, logistics, and delivery.",
    descriptionKm: "គ្រប់គ្រងការទិញ ស្តុក ដឹកជញ្ជូន និងការចែកចាយ។",
    skills: ["Logistics", "Inventory", "Data", "Negotiation"],
    skillsKm: ["ដឹកជញ្ជូន", "គ្រប់គ្រងស្តុក", "ទិន្នន័យ", "ចរចា"],
    roadmap: [
      {
        step: "Learn supply chain basics",
        stepKm: "រៀនមូលដ្ឋាន Supply Chain",
        details: "Procurement, warehousing, transport.",
        detailsKm: "Procurement, warehousing និង transport។"
      },
      {
        step: "Practice inventory and planning",
        stepKm: "ហ្វឹកហាត់ស្តុក និងផែនការ",
        details: "Forecasting, reorder points, simple KPIs.",
        detailsKm: "Forecasting, reorder point និង KPI ងាយៗ។"
      },
      {
        step: "Learn tools",
        stepKm: "រៀនឧបករណ៍",
        details: "Excel + ERP basics (if available).",
        detailsKm: "Excel + មូលដ្ឋាន ERP (បើមាន)។"
      },
      {
        step: "Get field experience",
        stepKm: "ទទួលបទពិសោធន៍ជាក់ស្តែង",
        details: "Work in logistics/operations teams.",
        detailsKm: "ធ្វើការនៅក្រុម logistics/operations។"
      }
    ]
  },
  {
    slug: "pharmacist",
    title: "Pharmacist",
    titleKm: "ឱសថការី",
    description: "Prepare and provide medicines safely, and advise patients.",
    descriptionKm: "រៀបចំ និងផ្តល់ឱសថដោយសុវត្ថិភាព ហើយផ្តល់យោបល់ដល់អ្នកជំងឺ។",
    skills: ["Pharmacology", "Dosage", "Safety", "Communication"],
    skillsKm: ["ឱសថវិទ្យា", "កម្រិតឱសថ", "សុវត្ថិភាព", "ទំនាក់ទំនង"],
    roadmap: [
      {
        step: "Study pharmacy program",
        stepKm: "សិក្សាកម្មវិធីឱសថសាស្ត្រ",
        details: "Learn drug classes, interactions, and regulations.",
        detailsKm: "រៀនអំពីប្រភេទឱសថ ប្រតិកម្ម និងបទប្បញ្ញត្តិ។"
      },
      {
        step: "Practice dispensing",
        stepKm: "ហ្វឹកហាត់ការចែកចាយឱសថ",
        details: "Accuracy, labeling, storage, counseling.",
        detailsKm: "ភាពត្រឹមត្រូវ ស្លាក ទុកដាក់ និងការណែនាំអ្នកជំងឺ។"
      },
      {
        step: "Do internship/clinical practice",
        stepKm: "ធ្វើ Internship/Clinical practice",
        details: "Hospital or community pharmacy experience.",
        detailsKm: "បទពិសោធន៍នៅមន្ទីរពេទ្យ ឬឱសថស្ថានសហគមន៍។"
      },
      {
        step: "Keep learning",
        stepKm: "រៀនបន្ត",
        details: "New medicines, guidelines, and safety updates.",
        detailsKm: "ឱសថថ្មីៗ គោលការណ៍ណែនាំ និងព័ត៌មានសុវត្ថិភាពថ្មីៗ។"
      }
    ]
  },
  {
    slug: "nurse",
    title: "Nurse",
    titleKm: "គិលានុបដ្ឋាយិកា",
    description: "Provide patient care and support doctors and healthcare teams.",
    descriptionKm: "ថែទាំអ្នកជំងឺ និងគាំទ្រក្រុមវេជ្ជសាស្ត្រ។",
    skills: ["Patient care", "Communication", "Teamwork", "Compassion"],
    skillsKm: ["ថែទាំអ្នកជំងឺ", "ទំនាក់ទំនង", "ធ្វើការជាក្រុម", "មេត្តាករុណា"],
    roadmap: [
      {
        step: "Study nursing fundamentals",
        stepKm: "សិក្សាមូលដ្ឋានគិលានុបដ្ឋាក",
        details: "Anatomy, hygiene, vital signs.",
        detailsKm: "កាយវិភាគ សុវត្ថិភាពអនាម័យ និងសញ្ញាជីវិត។"
      },
      {
        step: "Clinical practice",
        stepKm: "ហ្វឹកហាត់គ្លីនិក",
        details: "Learn procedures and patient communication.",
        detailsKm: "រៀននីតិវិធី និងការទំនាក់ទំនងជាមួយអ្នកជំងឺ។"
      },
      {
        step: "Specialize",
        stepKm: "ជ្រើសជំនាញរង",
        details: "ER, pediatrics, ICU, etc.",
        detailsKm: "ER, កុមារ, ICU ជាដើម។"
      },
      {
        step: "Grow professionally",
        stepKm: "អភិវឌ្ឍវិជ្ជាជីវៈ",
        details: "Certifications, leadership, continuous learning.",
        detailsKm: "វិញ្ញាបនបត្រ ការដឹកនាំ និងរៀនបន្ត។"
      }
    ]
  },
  {
    slug: "public-health-officer",
    title: "Public Health Officer",
    titleKm: "មន្ត្រីសុខភាពសាធារណៈ",
    description: "Plan programs to prevent disease and improve community health.",
    descriptionKm: "រៀបចំកម្មវិធីដើម្បីការពារជំងឺ និងលើកកម្ពស់សុខភាពសហគមន៍។",
    skills: ["Epidemiology", "Data", "Communication", "Planning"],
    skillsKm: ["រោគវិទ្យាសាស្ត្រ (Epidemiology)", "ទិន្នន័យ", "ទំនាក់ទំនង", "ផែនការ"],
    roadmap: [
      {
        step: "Study public health basics",
        stepKm: "សិក្សាមូលដ្ឋានសុខភាពសាធារណៈ",
        details: "Prevention, health promotion, community work.",
        detailsKm: "ការពារ ការផ្សព្វផ្សាយសុខភាព និងការងារសហគមន៍។"
      },
      {
        step: "Learn data and reporting",
        stepKm: "រៀនទិន្នន័យ និងរបាយការណ៍",
        details: "Collect data, analyze, and write reports.",
        detailsKm: "ប្រមូលទិន្នន័យ វិភាគ និងសរសេររបាយការណ៍។"
      },
      {
        step: "Work on field programs",
        stepKm: "ធ្វើការកម្មវិធីក្នុងព្រៃ/ទីតាំង",
        details: "Vaccination, education, outbreak response.",
        detailsKm: "ចាក់វ៉ាក់សាំង បង្រៀនសុខភាព និងឆ្លើយតបពេលរាតត្បាត។"
      },
      {
        step: "Build partnerships",
        stepKm: "បង្កើតការសហការ",
        details: "Coordinate with clinics, NGOs, and local leaders.",
        detailsKm: "សហការជាមួយមន្ទីរពេទ្យ NGO និងអាជ្ញាធរ។"
      }
    ]
  },
  {
    slug: "lawyer",
    title: "Lawyer",
    titleKm: "មេធាវី",
    description: "Provide legal advice and represent clients in legal matters.",
    descriptionKm: "ផ្តល់យោបល់ផ្នែកច្បាប់ និងតំណាងអតិថិជនក្នុងការងារច្បាប់។",
    skills: ["Legal research", "Writing", "Negotiation", "Ethics"],
    skillsKm: ["ស្រាវជ្រាវច្បាប់", "ការសរសេរ", "ចរចា", "ចរិយធម៌"],
    roadmap: [
      {
        step: "Study law fundamentals",
        stepKm: "សិក្សាមូលដ្ឋានច្បាប់",
        details: "Civil, criminal, and procedure basics.",
        detailsKm: "ច្បាប់ស៊ីវិល ព្រហ្មទណ្ឌ និងនីតិវិធីមូលដ្ឋាន។"
      },
      {
        step: "Practice legal writing",
        stepKm: "ហ្វឹកហាត់ការសរសេរផ្នែកច្បាប់",
        details: "Summaries, contracts, and case notes.",
        detailsKm: "សង្ខេប កិច្ចសន្យា និងកំណត់ត្រាករណី។"
      },
      {
        step: "Intern at a law office",
        stepKm: "Internship នៅការិយាល័យច្បាប់",
        details: "Learn real cases and client communication.",
        detailsKm: "រៀនការងារករណីពិត និងទំនាក់ទំនងអតិថិជន។"
      },
      {
        step: "Build expertise",
        stepKm: "បង្កើតជំនាញ",
        details: "Choose a focus: business, labor, family, etc.",
        detailsKm: "ជ្រើសផ្នែក៖ ពាណិជ្ជកម្ម ការងារ គ្រួសារ ជាដើម។"
      }
    ]
  }
];


const CAREERS_TO_ADD = EXTRA_CAREERS.map((c) => ({ ...c, imageUrl: CAREER_IMAGE_URL[c.slug] || c.imageUrl || "" }));

async function main() {
  await connectDb(process.env.MONGODB_URI);

  let inserted = 0;
  let skipped = 0;

  for (const c of CAREERS_TO_ADD) {
    const res = await Career.updateOne(
      { slug: c.slug },
      { $setOnInsert: c },
      { upsert: true }
    );

    if (res.upsertedCount) inserted += 1;
    else skipped += 1;
  }

  // eslint-disable-next-line no-console
  console.log(`Careers inserted: ${inserted}, skipped (already existed): ${skipped}`);
  process.exit(0);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


