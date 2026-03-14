const dotenv = require("dotenv");
dotenv.config();

const { connectDb } = require("../src/config/db");
const Major = require("../src/models/Major");
const Career = require("../src/models/Career");
const Post = require("../src/models/Post");
const Video = require("../src/models/Video");

async function seed() {
  await connectDb(process.env.MONGODB_URI);

  const majors = [
    {
      slug: "information-technology",
      title: "Information Technology",
      titleKm: "បច្ចេកវិទ្យាព័ត៌មាន",
      description: "Learn how to build, run, and secure computer systems and applications.",
      descriptionKm: "សិក្សាអំពីការបង្កើត ដំណើរការ និងការពារប្រព័ន្ធកុំព្យូទ័រ និងកម្មវិធី។",
      imageUrl: "/images/majors/information-technology.svg",
      skills: ["Programming basics", "Networking", "Databases", "Problem solving"],
      skillsKm: ["មូលដ្ឋានការសរសេរកូដ", "បណ្តាញកុំព្យូទ័រ", "មូលដ្ឋានទិន្នន័យ", "ដោះស្រាយបញ្ហា"],
      careers: ["Software Developer", "Network Engineer", "IT Support"],
      careersKm: ["អ្នកអភិវឌ្ឍកម្មវិធី", "វិស្វករបណ្តាញ", "ជំនួយផ្នែក IT"]
    },
    {
      slug: "business-administration",
      title: "Business Administration",
      titleKm: "គ្រប់គ្រងពាណិជ្ជកម្ម",
      description: "Study management, finance, marketing, and how organizations operate.",
      descriptionKm: "សិក្សាអំពីការគ្រប់គ្រង ហិរញ្ញវត្ថុ ទីផ្សារ និងរបៀបអង្គភាពដំណើរការ។",
      imageUrl: "/images/majors/business-administration.svg",
      skills: ["Communication", "Planning", "Teamwork", "Data literacy"],
      skillsKm: ["ការទំនាក់ទំនង", "រៀបចំផែនការ", "ធ្វើការជាក្រុម", "យល់ដឹងអំពីទិន្នន័យ"],
      careers: ["Project Coordinator", "Marketing Specialist", "Entrepreneur"],
      careersKm: ["អ្នកសម្របសម្រួលគម្រោង", "អ្នកជំនាញទីផ្សារ", "សហគ្រិន"]
    },
    {
      slug: "graphic-design",
      title: "Graphic Design",
      titleKm: "រចនាក្រាហ្វិក",
      description: "Create visual communication for brands, products, and media.",
      descriptionKm: "បង្កើតការទំនាក់ទំនងតាមរូបភាពសម្រាប់ម៉ាក ផលិតផល និងមេឌៀ។",
      imageUrl: "/images/majors/graphic-design.svg",
      skills: ["Typography", "Color theory", "Design tools", "Storytelling"],
      skillsKm: ["អក្សររចនា", "ទ្រឹស្តីពណ៌", "ឧបករណ៍រចនា", "ការនិទានរឿង/បង្ហាញគំនិត"],
      careers: ["Graphic Designer", "UI Designer", "Content Creator"],
      careersKm: ["អ្នករចនាក្រាហ្វិក", "អ្នករចនា UI", "អ្នកបង្កើតមាតិកា"]
    },
    {
      slug: "computer-science",
      title: "Computer Science",
      description: "Study of computation, automation, and information.",
      imageUrl: "/images/majors/it-and-technology.svg",
      skills: ["Algorithms", "Data Structures", "Programming", "Mathematics"],
      careers: ["Software Engineer", "Data Scientist", "Research Scientist"]
    },
    {
      slug: "software-engineering",
      title: "Software Engineering",
      description: "The application of engineering principles to software development.",
      imageUrl: "/images/majors/it-and-technology.svg",
      skills: ["Software Development Life Cycle", "Agile Methodologies", "Testing", "DevOps"],
      careers: ["Software Engineer", "DevOps Engineer", "Quality Assurance Engineer"]
    },
    {
      slug: "computer-engineering",
      title: "Computer Engineering",
      description: "Integrates electrical engineering with computer science to design and develop computer systems.",
      imageUrl: "/images/majors/it-and-technology.svg",
      skills: ["Hardware Architecture", "Embedded Systems", "Operating Systems", "Electronics"],
      careers: ["Hardware Engineer", "Firmware Engineer", "Systems Engineer"]
    },
    {
      slug: "data-science",
      title: "Data Science",
      description: "Extracting knowledge and insights from structured and unstructured data.",
      imageUrl: "/images/majors/it-and-technology.svg",
      skills: ["Statistics", "Machine Learning", "Data Visualization", "Big Data"],
      careers: ["Data Scientist", "Data Analyst", "Machine Learning Engineer"]
    },
    {
      slug: "artificial-intelligence",
      title: "Artificial Intelligence",
      description: "The theory and development of computer systems able to perform tasks that normally require human intelligence.",
      imageUrl: "/images/majors/it-and-technology.svg",
      skills: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Robotics"],
      careers: ["AI/ML Engineer", "Research Scientist", "Robotics Engineer"]
    },
    {
      slug: "cyber-security",
      title: "Cyber Security",
      description: "Protecting computer systems and networks from information disclosure, theft, or damage.",
      imageUrl: "/images/majors/it-and-technology.svg",
      skills: ["Network Security", "Cryptography", "Ethical Hacking", "Security Auditing"],
      careers: ["Cybersecurity Analyst", "Security Engineer", "Ethical Hacker"]
    },
    {
      slug: "network-engineering",
      title: "Network Engineering",
      description: "Designing, implementing, and managing computer networks.",
      imageUrl: "/images/majors/it-and-technology.svg",
      skills: ["Network Protocols", "Routing and Switching", "Network Security", "Cloud Networking"],
      careers: ["Network Engineer", "Network Administrator", "Solutions Architect"]
    },
    {
      slug: "information-systems",
      title: "Information Systems",
      description: "Study of complementary networks of hardware and software that people and organizations use to collect, filter, process, create, and distribute data.",
      imageUrl: "/images/majors/it-and-technology.svg",
      skills: ["Database Management", "Systems Analysis", "IT Project Management", "Business Intelligence"],
      careers: ["Systems Analyst", "IT Consultant", "Business Analyst"]
    },
    {
      slug: "web-development",
      title: "Web Development",
      description: "The work involved in developing a website for the Internet or an intranet.",
      imageUrl: "/images/majors/it-and-technology.svg",
      skills: ["HTML", "CSS", "JavaScript", "Backend Frameworks"],
      careers: ["Web Developer", "Full Stack Developer", "Frontend Developer"]
    },
    {
      slug: "mobile-app-development",
      title: "Mobile App Development",
      description: "The process of creating software applications that run on a mobile device.",
      imageUrl: "/images/majors/it-and-technology.svg",
      skills: ["Java/Kotlin (Android)", "Swift/Objective-C (iOS)", "React Native/Flutter", "UI/UX Design"],
      careers: ["Mobile Developer", "iOS Developer", "Android Developer"]
    },
    {
      slug: "marketing",
      title: "Marketing",
      description: "The action or business of promoting and selling products or services.",
      imageUrl: "/images/majors/business-and-management.svg",
      skills: ["Digital Marketing", "SEO", "Content Creation", "Market Research"],
      careers: ["Marketing Manager", "SEO Specialist", "Social Media Manager"]
    },
    {
      slug: "accounting",
      title: "Accounting",
      description: "The process of recording financial transactions pertaining to a business.",
      imageUrl: "/images/majors/business-and-management.svg",
      skills: ["Financial Reporting", "Auditing", "Taxation", "Bookkeeping"],
      careers: ["Accountant", "Auditor", "Financial Analyst"]
    },
    {
      slug: "finance-and-banking",
      title: "Finance and Banking",
      description: "Management of money and investments.",
      imageUrl: "/images/majors/business-and-management.svg",
      skills: ["Financial Analysis", "Investment Management", "Risk Management", "Corporate Finance"],
      careers: ["Financial Analyst", "Investment Banker", "Portfolio Manager"]
    },
    {
      slug: "economics",
      title: "Economics",
      description: "The branch of knowledge concerned with the production, consumption, and transfer of wealth.",
      imageUrl: "/images/majors/business-and-management.svg",
      skills: ["Microeconomics", "Macroeconomics", "Econometrics", "Statistical Analysis"],
      careers: ["Economist", "Data Analyst", "Policy Analyst"]
    },
    {
      slug: "human-resource-management",
      title: "Human Resource Management",
      description: "The strategic approach to the effective management of people in a company or organization.",
      imageUrl: "/images/majors/business-and-management.svg",
      skills: ["Recruitment", "Employee Relations", "Compensation and Benefits", "Training and Development"],
      careers: ["HR Manager", "Recruiter", "HR Generalist"]
    },
    {
      slug: "international-business",
      title: "International Business",
      description: "The trade of goods, services, technology, capital and/or knowledge across national borders.",
      imageUrl: "/images/majors/business-and-management.svg",
      skills: ["Cross-Cultural Communication", "Global Marketing", "International Trade Law", "Supply Chain Management"],
      careers: ["International Business Manager", "Global Marketing Manager", "Import/Export Agent"]
    },
    {
      slug: "supply-chain-management",
      title: "Supply Chain Management",
      description: "The management of the flow of goods and services.",
      imageUrl: "/images/majors/business-and-management.svg",
      skills: ["Logistics", "Procurement", "Inventory Management", "Operations Management"],
      careers: ["Supply Chain Manager", "Logistics Analyst", "Procurement Manager"]
    },
    {
      slug: "entrepreneurship",
      title: "Entrepreneurship",
      description: "The activity of setting up a business or businesses, taking on financial risks in the hope of profit.",
      imageUrl: "/images/majors/business-and-management.svg",
      skills: ["Business Planning", "Fundraising", "Sales", "Networking"],
      careers: ["Founder", "Startup CEO", "Business Development Manager"]
    },
    {
      slug: "project-management",
      title: "Project Management",
      description: "The application of processes, methods, skills, knowledge and experience to achieve specific project objectives.",
      imageUrl: "/images/majors/business-and-management.svg",
      skills: ["Agile/Scrum", "Risk Management", "Budgeting", "Stakeholder Management"],
      careers: ["Project Manager", "Program Manager", "Scrum Master"]
    },
    {
      slug: "law",
      title: "Law",
      description: "The system of rules which a particular country or community recognizes as regulating the actions of its members.",
      imageUrl: "/images/majors/law-and-politics.svg",
      skills: ["Legal Research", "Argumentation", "Contract Law", "Criminal Law"],
      careers: ["Lawyer", "Paralegal", "Judge"]
    },
    {
      slug: "international-law",
      title: "International Law",
      description: "A body of rules established by custom or treaty and recognized by nations as binding in their relations with one another.",
      imageUrl: "/images/majors/law-and-politics.svg",
      skills: ["Treaty Law", "Human Rights Law", "International Trade Law", "Diplomacy"],
      careers: ["International Lawyer", "Diplomat", "Policy Advisor"]
    },
    {
      slug: "political-science",
      title: "Political Science",
      description: "The branch of knowledge that deals with systems of government; the analysis of political activity and behavior.",
      imageUrl: "/images/majors/law-and-politics.svg",
      skills: ["Political Theory", "Comparative Politics", "Public Policy Analysis", "Research Methods"],
      careers: ["Political Analyst", "Policy Advisor", "Government Official"]
    },
    {
      slug: "international-relations",
      title: "International Relations",
      description: "The study of the interaction of nation-states and non-governmental organizations in fields such as politics, economics, and security.",
      imageUrl: "/images/majors/law-and-politics.svg",
      skills: ["Diplomacy", "Foreign Policy Analysis", "Conflict Resolution", "International Political Economy"],
      careers: ["Diplomat", "Foreign Affairs Analyst", "Intelligence Analyst"]
    },
    {
      slug: "public-administration",
      title: "Public Administration",
      description: "The implementation of government policy and also an academic discipline that studies this implementation and prepares civil servants for working in the public service.",
      imageUrl: "/images/majors/law-and-politics.svg",
      skills: ["Public Budgeting", "Policy Implementation", "Public Sector Management", "Ethics"],
      careers: ["Public Administrator", "City Manager", "Policy Analyst"]
    },
    {
      slug: "civil-engineering",
      title: "Civil Engineering",
      description: "A professional engineering discipline that deals with the design, construction, and maintenance of the physical and naturally built environment.",
      imageUrl: "/images/majors/engineering.svg",
      skills: ["Structural Analysis", "Geotechnical Engineering", "Construction Management", "CAD Software"],
      careers: ["Civil Engineer", "Structural Engineer", "Construction Manager"]
    },
    {
      slug: "electrical-engineering",
      title: "Electrical Engineering",
      description: "An engineering discipline concerned with the study, design, and application of equipment, devices, and systems which use electricity, electronics, and electromagnetism.",
      imageUrl: "/images/majors/engineering.svg",
      skills: ["Circuit Analysis", "Power Systems", "Control Systems", "Microelectronics"],
      careers: ["Electrical Engineer", "Power Engineer", "Control Systems Engineer"]
    },
    {
      slug: "mechanical-engineering",
      title: "Mechanical Engineering",
      description: "An engineering branch that combines engineering physics and mathematics principles with materials science to design, analyze, manufacture, and maintain mechanical systems.",
      imageUrl: "/images/majors/engineering.svg",
      skills: ["Thermodynamics", "Fluid Mechanics", "Mechanical Design", "CAD/CAM"],
      careers: ["Mechanical Engineer", "Design Engineer", "Manufacturing Engineer"]
    },
    {
      slug: "industrial-engineering",
      title: "Industrial Engineering",
      description: "An engineering profession that is concerned with the optimization of complex processes, systems, or organizations.",
      imageUrl: "/images/majors/engineering.svg",
      skills: ["Operations Research", "Quality Control", "Supply Chain Management", "Process Improvement"],
      careers: ["Industrial Engineer", "Operations Analyst", "Quality Engineer"]
    },
    {
      slug: "environmental-engineering",
      title: "Environmental Engineering",
      description: "The branch of engineering that is concerned with protecting people from the effects of adverse environmental effects.",
      imageUrl: "/images/majors/engineering.svg",
      skills: ["Water Treatment", "Waste Management", "Air Pollution Control", "Environmental Impact Assessment"],
      careers: ["Environmental Engineer", "Water Quality Specialist", "Sustainability Consultant"]
    },
    {
      slug: "agricultural-engineering",
      title: "Agricultural Engineering",
      description: "The branch of engineering that applies engineering science and technology to agricultural production and processing.",
      imageUrl: "/images/majors/engineering.svg",
      skills: ["Irrigation Systems", "Farm Machinery", "Food Processing", "Soil Science"],
      careers: ["Agricultural Engineer", "Irrigation Specialist", "Food Process Engineer"]
    },
    {
      slug: "medicine",
      title: "Medicine",
      description: "The science and practice of the diagnosis, treatment, and prevention of disease.",
      imageUrl: "/images/majors/health-and-medical.svg",
      skills: ["Anatomy", "Physiology", "Pharmacology", "Clinical Diagnosis"],
      careers: ["Doctor", "Physician", "Surgeon"]
    },
    {
      slug: "dentistry",
      title: "Dentistry",
      description: "The branch of medicine that is involved in the study, diagnosis, prevention, and treatment of diseases, disorders and conditions of the oral cavity.",
      imageUrl: "/images/majors/health-and-medical.svg",
      skills: ["Oral Surgery", "Orthodontics", "Periodontics", "Prosthodontics"],
      careers: ["Dentist", "Orthodontist", "Oral Surgeon"]
    },
    {
      slug: "pharmacy",
      title: "Pharmacy",
      description: "The science and technique of preparing and dispensing drugs.",
      imageUrl: "/images/majors/health-and-medical.svg",
      skills: ["Pharmacology", "Medicinal Chemistry", "Patient Counseling", "Pharmaceutical Calculations"],
      careers: ["Pharmacist", "Clinical Pharmacist", "Pharmaceutical Researcher"]
    },
    {
      slug: "nursing",
      title: "Nursing",
      description: "A profession within the health care sector focused on the care of individuals, families, and communities.",
      imageUrl: "/images/majors/health-and-medical.svg",
      skills: ["Patient Care", "Medical-Surgical Nursing", "Pediatric Nursing", "Emergency Care"],
      careers: ["Registered Nurse", "Nurse Practitioner", "Clinical Nurse Specialist"]
    },
    {
      slug: "midwifery",
      title: "Midwifery",
      description: "Health science and health profession that deals with pregnancy, childbirth, and the postpartum period.",
      imageUrl: "/images/majors/health-and-medical.svg",
      skills: ["Prenatal Care", "Labor and Delivery", "Postnatal Care", "Newborn Care"],
      careers: ["Midwife", "Labor and Delivery Nurse", "Lactation Consultant"]
    },
    {
      slug: "public-health",
      title: "Public Health",
      description: "The science and art of preventing disease, prolonging life and promoting health through organized efforts.",
      imageUrl: "/images/majors/health-and-medical.svg",
      skills: ["Epidemiology", "Biostatistics", "Health Policy", "Community Health"],
      careers: ["Public Health Analyst", "Epidemiologist", "Health Educator"]
    },
    {
      slug: "agronomy",
      title: "Agronomy",
      description: "The science and technology of producing and using plants for food, fuel, fiber, and land reclamation.",
      imageUrl: "/images/majors/agriculture-and-environment.svg",
      skills: ["Soil Science", "Crop Science", "Pest Management", "Sustainable Agriculture"],
      careers: ["Agronomist", "Crop Scientist", "Farm Manager"]
    },
    {
      slug: "animal-science",
      title: "Animal Science",
      description: "The science that deals with the biology of animals that are under the control of humankind.",
      imageUrl: "/images/majors/agriculture-and-environment.svg",
      skills: ["Animal Nutrition", "Genetics", "Veterinary Anatomy", "Livestock Management"],
      careers: ["Animal Scientist", "Livestock Manager", "Animal Nutritionist"]
    },
    {
      slug: "veterinary-medicine",
      title: "Veterinary Medicine",
      description: "The branch of medicine that deals with the prevention, diagnosis and treatment of disease, disorder and injury in non-human animals.",
      imageUrl: "/images/majors/agriculture-and-environment.svg",
      skills: ["Animal Surgery", "Internal Medicine", "Diagnostic Imaging", "Preventive Medicine"],
      careers: ["Veterinarian", "Veterinary Technician", "Animal Surgeon"]
    },
    {
      slug: "forestry",
      title: "Forestry",
      description: "The science and craft of creating, managing, using, conserving, and repairing forests, woodlands, and associated resources.",
      imageUrl: "/images/majors/agriculture-and-environment.svg",
      skills: ["Forest Management", "Conservation", "Timber Harvesting", "Wildlife Management"],
      careers: ["Forester", "Conservation Scientist", "Park Ranger"]
    },
    {
      slug: "fisheries",
      title: "Fisheries",
      description: "The industry of catching or farming fish.",
      imageUrl: "/images/majors/agriculture-and-environment.svg",
      skills: ["Aquaculture", "Marine Biology", "Fishery Management", "Fish Processing"],
      careers: ["Fisheries Biologist", "Aquaculture Manager", "Seafood Inspector"]
    },
    {
      slug: "agro-industry",
      title: "Agro-Industry",
      description: "The industrialized processing of agricultural products.",
      imageUrl: "/images/majors/agriculture-and-environment.svg",
      skills: ["Food Processing", "Quality Control", "Supply Chain Management", "Agribusiness"],
      careers: ["Food Technologist", "Agribusiness Manager", "Quality Assurance Manager"]
    },
    {
      slug: "land-management",
      title: "Land Management",
      description: "The process of managing the use and development of land resources.",
      imageUrl: "/images/majors/agriculture-and-environment.svg",
      skills: ["GIS", "Urban Planning", "Environmental Law", "Surveying"],
      careers: ["Land Manager", "Urban Planner", "GIS Analyst"]
    },
    {
      slug: "architecture",
      title: "Architecture",
      description: "The art and science of designing buildings and other physical structures.",
      imageUrl: "/images/majors/art-and-design.svg",
      skills: ["Architectural Design", "CAD", "Building Materials", "Structural Engineering"],
      careers: ["Architect", "Urban Designer", "Landscape Architect"]
    },
    {
      slug: "interior-design",
      title: "Interior Design",
      description: "The art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment.",
      imageUrl: "/images/majors/art-and-design.svg",
      skills: ["Space Planning", "Color Theory", "Furniture Design", "3D Modeling"],
      careers: ["Interior Designer", "Set Designer", "Exhibition Designer"]
    },
    {
      slug: "multimedia-design",
      title: "Multimedia Design",
      description: "The art of integrating multiple forms of media.",
      imageUrl: "/images/majors/art-and-design.svg",
      skills: ["Animation", "Video Editing", "Web Design", "Graphic Design"],
      careers: ["Multimedia Designer", "Animator", "Video Editor"]
    },
    {
      slug: "fine-arts",
      title: "Fine Arts",
      description: "Creative art, especially visual art, whose products are to be appreciated primarily or solely for their imaginative, aesthetic, or intellectual content.",
      imageUrl: "/images/majors/art-and-design.svg",
      skills: ["Painting", "Sculpture", "Drawing", "Art History"],
      careers: ["Artist", "Art Curator", "Art Teacher"]
    },
    {
      slug: "english-literature",
      title: "English Literature",
      description: "The study of literature written in the English language.",
      imageUrl: "/images/majors/language-and-communication.svg",
      skills: ["Critical Analysis", "Creative Writing", "Literary Theory", "Research"],
      careers: ["Writer", "Editor", "Teacher"]
    },
    {
      slug: "tesol",
      title: "TESOL (Teaching English)",
      description: "Teaching English to Speakers of Other Languages.",
      imageUrl: "/images/majors/language-and-communication.svg",
      skills: ["Language Pedagogy", "Curriculum Development", "Cross-Cultural Communication", "Classroom Management"],
      careers: ["English Teacher", "ESL Instructor", "Curriculum Developer"]
    },
    {
      slug: "journalism",
      title: "Journalism",
      description: "The production and distribution of reports on current events.",
      imageUrl: "/images/majors/language-and-communication.svg",
      skills: ["Investigative Reporting", "Interviewing", "Writing and Editing", "Media Ethics"],
      careers: ["Journalist", "Reporter", "Editor"]
    },
    {
      slug: "mass-media-communication",
      title: "Mass Media Communication",
      description: "The study of how messages are transmitted to a large audience through various forms of media.",
      imageUrl: "/images/majors/language-and-communication.svg",
      skills: ["Public Relations", "Broadcasting", "Social Media", "Media Production"],
      careers: ["Public Relations Specialist", "Broadcast Journalist", "Social Media Manager"]
    },
    {
      slug: "khmer-studies",
      title: "Khmer Studies",
      description: "The study of the language, culture, and history of Cambodia.",
      imageUrl: "/images/majors/language-and-communication.svg",
      skills: ["Khmer Language", "Cambodian History", "Cultural Studies", "Research"],
      careers: ["Researcher", "Cultural Advisor", "Translator"]
    },
    {
      slug: "chinese-language",
      title: "Chinese Language",
      description: "The study of the Chinese language, literature, and culture.",
      imageUrl: "/images/majors/language-and-communication.svg",
      skills: ["Mandarin/Cantonese", "Chinese Characters", "Translation", "Cultural Understanding"],
      careers: ["Translator", "Interpreter", "Language Teacher"]
    }
  ];
  const { MAJOR_KM, PHRASE_KM } = require("./seed.km");

  const majorsSeed = majors.map((m) => {
    const km = MAJOR_KM[m.slug] || {};

    const skillsKm = Array.isArray(m.skillsKm) && m.skillsKm.length
      ? m.skillsKm
      : (m.skills || []).map((s) => PHRASE_KM[s] || s);

    const careersKm = Array.isArray(m.careersKm) && m.careersKm.length
      ? m.careersKm
      : (m.careers || []).map((s) => PHRASE_KM[s] || s);

    return {
      ...m,
      titleKm: km.titleKm || m.titleKm || "",
      descriptionKm: km.descriptionKm || m.descriptionKm || "",
      skillsKm,
      careersKm
    };
  });
  const careers = [
    {
      slug: "software-developer",
      title: "Software Developer",
      titleKm: "អ្នកអភិវឌ្ឍកម្មវិធី",
      description: "Build applications that solve problems for people and businesses.",
      descriptionKm: "បង្កើតកម្មវិធីដើម្បីដោះស្រាយបញ្ហាសម្រាប់មនុស្ស និងអាជីវកម្ម។",
      skills: ["JavaScript", "Problem solving", "Git", "Communication"],
      skillsKm: ["JavaScript", "ដោះស្រាយបញ្ហា", "Git", "ការទំនាក់ទំនង"],
      roadmap: [
        {
          step: "Learn programming fundamentals",
          stepKm: "រៀនមូលដ្ឋានការសរសេរកូដ",
          details: "Variables, loops, functions.",
          detailsKm: "អថេរ, លូប, មុខងារ។"
        },
        {
          step: "Learn web basics",
          stepKm: "រៀនមូលដ្ឋាន Web",
          details: "HTML, CSS, JavaScript.",
          detailsKm: "HTML, CSS, JavaScript។"
        },
        {
          step: "Build projects",
          stepKm: "បង្កើតគម្រោង",
          details: "Portfolio projects, GitHub.",
          detailsKm: "គម្រោងសម្រាប់ Portfolio និង GitHub។"
        },
        {
          step: "Apply for internships/jobs",
          stepKm: "ដាក់ពាក្យ Internship/Job",
          details: "CV, interview practice.",
          detailsKm: "CV និងហ្វឹកហាត់សម្ភាសន៍។"
        }
      ]
    },
    {
      slug: "graphic-designer",
      title: "Graphic Designer",
      titleKm: "អ្នករចនាក្រាហ្វិក",
      description: "Design visuals for marketing, products, and communication.",
      descriptionKm: "រចនារូបភាពសម្រាប់ទីផ្សារ ផលិតផល និងការទំនាក់ទំនង។",
      skills: ["Design principles", "Figma/Adobe tools", "Creativity", "Feedback"],
      skillsKm: ["គោលការណ៍រចនា", "ឧបករណ៍ Figma/Adobe", "ភាពច្នៃប្រឌិត", "ទទួលយកមតិយោបល់"],
      roadmap: [
        {
          step: "Learn design principles",
          stepKm: "រៀនគោលការណ៍រចនា",
          details: "Layout, typography, color.",
          detailsKm: "Layout, អក្សររចនា និងពណ៌។"
        },
        {
          step: "Practice tools",
          stepKm: "ហ្វឹកហាត់ឧបករណ៍",
          details: "Figma or Adobe apps.",
          detailsKm: "Figma ឬកម្មវិធី Adobe។"
        },
        {
          step: "Build a portfolio",
          stepKm: "បង្កើត Portfolio",
          details: "Posters, logos, UI screens.",
          detailsKm: "ប៉ូស្ទ័រ, ឡូហ្គូ និង UI screens។"
        },
        {
          step: "Find clients or jobs",
          stepKm: "រកអតិថិជន ឬការងារ",
          details: "Freelance platforms or agencies.",
          detailsKm: "វេទិកា Freelance ឬក្រុមហ៊ុន/Agency។"
        }
      ]
    },
    {
      slug: "data-scientist",
      title: "Data Scientist",
      titleKm: "[km] Data Scientist",
      description: "Extracting knowledge and insights from structured and unstructured data.",
      descriptionKm: "[km] Extracting knowledge and insights from structured and unstructured data.",
      skills: ["Statistics", "Machine Learning", "Data Visualization", "Big Data"],
      skillsKm: ["[km] Statistics", "[km] Machine Learning", "[km] Data Visualization", "[km] Big Data"],
      roadmap: [
        {
          step: "Learn Python and SQL",
          stepKm: "[km] Learn Python and SQL",
          details: "Master the fundamentals of these two key languages for data science.",
          detailsKm: "[km] Master the fundamentals of these two key languages for data science."
        },
        {
          step: "Study Statistics and Probability",
          stepKm: "[km] Study Statistics and Probability",
          details: "Understand the mathematical concepts that underpin data science.",
          detailsKm: "[km] Understand the mathematical concepts that underpin data science."
        },
        {
          step: "Learn Machine Learning",
          stepKm: "[km] Learn Machine Learning",
          details: "Study different algorithms and how to apply them.",
          detailsKm: "[km] Study different algorithms and how to apply them."
        },
        {
          step: "Build a portfolio of projects",
          stepKm: "[km] Build a portfolio of projects",
          details: "Apply your skills to real-world datasets and showcase your work.",
          detailsKm: "[km] Apply your skills to real-world datasets and showcase your work."
        }
      ]
    },
    {
      slug: "cybersecurity-analyst",
      title: "Cybersecurity Analyst",
      titleKm: "[km] Cybersecurity Analyst",
      description: "Protecting computer systems and networks from information disclosure, theft, or damage.",
      descriptionKm: "[km] Protecting computer systems and networks from information disclosure, theft, or damage.",
      skills: ["Network Security", "Cryptography", "Ethical Hacking", "Security Auditing"],
      skillsKm: ["[km] Network Security", "[km] Cryptography", "[km] Ethical Hacking", "[km] Security Auditing"],
      roadmap: [
        {
          step: "Get a Bachelor's Degree in a technical field",
          stepKm: "[km] Get a Bachelor's Degree in a technical field",
          details: "A degree in Computer Science, IT, or a related field is a good foundation.",
          detailsKm: "[km] A degree in Computer Science, IT, or a related field is a good foundation."
        },
        {
          step: "Gain IT Experience",
          stepKm: "[km] Gain IT Experience",
          details: "Work in an entry-level IT role to understand systems and networks.",
          detailsKm: "[km] Work in an entry-level IT role to understand systems and networks."
        },
        {
          step: "Earn Cybersecurity Certifications",
          stepKm: "[km] Earn Cybersecurity Certifications",
          details: "Certifications like CompTIA Security+, CEH, or CISSP are highly valued.",
          detailsKm: "[km] Certifications like CompTIA Security+, CEH, or CISSP are highly valued."
        },
        {
          step: "Specialize in a Cybersecurity Domain",
          stepKm: "[km] Specialize in a Cybersecurity Domain",
          details: "Choose an area like network security, ethical hacking, or cloud security.",
          detailsKm: "[km] Choose an area like network security, ethical hacking, or cloud security."
        }
      ]
    },
    {
      slug: "project-manager",
      title: "Project Manager",
      titleKm: "[km] Project Manager",
      description: "The application of processes, methods, skills, knowledge and experience to achieve specific project objectives.",
      descriptionKm: "[km] The application of processes, methods, skills, knowledge and experience to achieve specific project objectives.",
      skills: ["Agile/Scrum", "Risk Management", "Budgeting", "Stakeholder Management"],
      skillsKm: ["[km] Agile/Scrum", "[km] Risk Management", "[km] Budgeting", "[km] Stakeholder Management"],
      roadmap: [
          {
              step: "Gain Experience in a Team Environment",
              stepKm: "[km] Gain Experience in a Team Environment",
              details: "Start by working as part of a project team to understand project dynamics.",
              detailsKm: "[km] Start by working as part of a project team to understand project dynamics."
          },
          {
              step: "Learn Project Management Methodologies",
              stepKm: "[km] Learn Project Management Methodologies",
              details: "Study frameworks like Agile, Scrum, and Waterfall.",
              detailsKm: "[km] Study frameworks like Agile, Scrum, and Waterfall."
          },
          {
              step: "Develop Soft Skills",
              stepKm: "[km] Develop Soft Skills",
              details: "Focus on communication, leadership, negotiation, and problem-solving.",
              detailsKm: "[km] Focus on communication, leadership, negotiation, and problem-solving."
          },
          {
              step: "Get a Project Management Certification",
              stepKm: "[km] Get a Project Management Certification",
              details: "Consider certifications like PMP or Certified Associate in Project Management (CAPM).",
              detailsKm: "[km] Consider certifications like PMP or Certified Associate in Project Management (CAPM)."
          }
      ]
    },
    {
      slug: "civil-engineer",
      title: "Civil Engineer",
      titleKm: "[km] Civil Engineer",
      description: "A professional engineering discipline that deals with the design, construction, and maintenance of the physical and naturally built environment.",
      descriptionKm: "[km] A professional engineering discipline that deals with the design, construction, and maintenance of the physical and naturally built environment.",
      skills: ["Structural Analysis", "Geotechnical Engineering", "Construction Management", "CAD Software"],
      skillsKm: ["[km] Structural Analysis", "[km] Geotechnical Engineering", "[km] Construction Management", "[km] CAD Software"],
      roadmap: [
          {
              step: "Obtain a Bachelor's Degree in Civil Engineering",
              stepKm: "[km] Obtain a Bachelor's Degree in Civil Engineering",
              details: "A 4-year degree is the minimum requirement to become a civil engineer.",
              detailsKm: "[km] A 4-year degree is the minimum requirement to become a civil engineer."
          },
          {
              step: "Learn codes, standards, and CAD",
              stepKm: "[km] Learn codes, standards, and CAD",
              details: "Study design codes/standards and practice using CAD tools.",
              detailsKm: "[km] Study design codes/standards and practice using CAD tools."
          },
          {
              step: "Gain Work Experience",
              stepKm: "[km] Gain Work Experience",
              details: "Work under senior engineers to learn real projects and standards.",
              detailsKm: "[km] Work under senior engineers to learn real projects and standards."
          },
          {
              step: "Get certified (if needed) and keep improving",
              stepKm: "[km] Get certified (if needed) and keep improving",
              details: "Follow local certification requirements (if any) and keep learning on real projects.",
              detailsKm: "[km] Follow local certification requirements (if any) and keep learning on real projects."
          }
      ]
    },
    {
      slug: "doctor",
      title: "Doctor",
      titleKm: "[km] Doctor",
      description: "The science and practice of the diagnosis, treatment, and prevention of disease.",
      descriptionKm: "[km] The science and practice of the diagnosis, treatment, and prevention of disease.",
      skills: ["Anatomy", "Physiology", "Pharmacology", "Clinical Diagnosis"],
      skillsKm: ["[km] Anatomy", "[km] Physiology", "[km] Pharmacology", "[km] Clinical Diagnosis"],
      roadmap: [
          {
              step: "Build a strong science foundation",
              stepKm: "[km] Build a strong science foundation",
              details: "Focus on biology, chemistry, physics, and math.",
              detailsKm: "[km] Focus on biology, chemistry, physics, and math."
          },
          {
              step: "Apply to medical school",
              stepKm: "[km] Apply to medical school",
              details: "Prepare documents and entrance exams/interviews (if required) and apply.",
              detailsKm: "[km] Prepare documents and entrance exams/interviews (if required) and apply."
          },
          {
              step: "Complete Medical School",
              stepKm: "[km] Complete Medical School",
              details: "Four years of intensive study and clinical rotations.",
              detailsKm: "[km] Four years of intensive study and clinical rotations."
          },
          {
              step: "Clinical internship/residency and license",
              stepKm: "[km] Clinical internship/residency and license",
              details: "Train in hospitals/clinics, choose a specialty, and follow local licensing requirements.",
              detailsKm: "[km] Train in hospitals/clinics, choose a specialty, and follow local licensing requirements."
          }
      ]
    },
    {
      slug: "veterinarian",
      title: "Veterinarian",
      titleKm: "[km] Veterinarian",
      description: "The branch of medicine that deals with the prevention, diagnosis and treatment of disease, disorder and injury in non-human animals.",
      descriptionKm: "[km] The branch of medicine that deals with the prevention, diagnosis and treatment of disease, disorder and injury in non-human animals.",
      skills: ["Animal Surgery", "Internal Medicine", "Diagnostic Imaging", "Preventive Medicine"],
      skillsKm: ["[km] Animal Surgery", "[km] Internal Medicine", "[km] Diagnostic Imaging", "[km] Preventive Medicine"],
      roadmap: [
          {
              step: "Earn a Bachelor's Degree with a focus on Animal Science",
              stepKm: "[km] Earn a Bachelor's Degree with a focus on Animal Science",
              details: "Coursework in biology, chemistry, and animal science is essential.",
              detailsKm: "[km] Coursework in biology, chemistry, and animal science is essential."
          },
          {
              step: "Gain Experience with Animals",
              stepKm: "[km] Gain Experience with Animals",
              details: "Volunteer at a vet clinic, animal shelter, or farm.",
              detailsKm: "[km] Volunteer at a vet clinic, animal shelter, or farm."
          },
          {
              step: "Study veterinary medicine",
              stepKm: "[km] Study veterinary medicine",
              details: "Complete your veterinary program and clinical practice.",
              detailsKm: "[km] Complete your veterinary program and clinical practice."
          },
          {
              step: "Get licensed (if required) and keep learning",
              stepKm: "[km] Get licensed (if required) and keep learning",
              details: "Follow local requirements, build experience, and keep up with new practices.",
              detailsKm: "[km] Follow local requirements, build experience, and keep up with new practices."
          }
      ]
    },
    {
      slug: "architect",
      title: "Architect",
      titleKm: "[km] Architect",
      description: "The art and science of designing buildings and other physical structures.",
      descriptionKm: "[km] The art and science of designing buildings and other physical structures.",
      skills: ["Architectural Design", "CAD", "Building Materials", "Structural Engineering"],
      skillsKm: ["[km] Architectural Design", "[km] CAD", "[km] Building Materials", "[km] Structural Engineering"],
      roadmap: [
          {
              step: "Earn a Bachelor of Architecture (B.Arch.) Degree",
              stepKm: "[km] Earn a Bachelor of Architecture (B.Arch.) Degree",
              details: "A 5-year professional degree is the standard path.",
              detailsKm: "[km] A 5-year professional degree is the standard path."
          },
          {
              step: "Complete an Internship",
              stepKm: "[km] Complete an Internship",
              details: "Gain practical experience under the supervision of a licensed architect.",
              detailsKm: "[km] Gain practical experience under the supervision of a licensed architect."
          },
          {
              step: "Build a strong portfolio",
              stepKm: "[km] Build a strong portfolio",
              details: "Create real projects, learn building codes, and present your best work.",
              detailsKm: "[km] Create real projects, learn building codes, and present your best work."
          },
          {
              step: "Get licensed (if required) and gain experience",
              stepKm: "[km] Get licensed (if required) and gain experience",
              details: "Follow local rules, work with senior architects, and keep improving.",
              detailsKm: "[km] Follow local rules, work with senior architects, and keep improving."
          }
      ]
    },
    {
      slug: "journalist",
      title: "Journalist",
      titleKm: "[km] Journalist",
      description: "The production and distribution of reports on current events.",
      descriptionKm: "[km] The production and distribution of reports on current events.",
      skills: ["Investigative Reporting", "Interviewing", "Writing and Editing", "Media Ethics"],
      skillsKm: ["[km] Investigative Reporting", "[km] Interviewing", "[km] Writing and Editing", "[km] Media Ethics"],
      roadmap: [
          {
              step: "Earn a Bachelor's Degree in Journalism or Communications",
              stepKm: "[km] Earn a Bachelor's Degree in Journalism or Communications",
              details: "A strong writing and communication background is key.",
              detailsKm: "[km] A strong writing and communication background is key."
          },
          {
              step: "Build a Portfolio of Your Work",
              stepKm: "[km] Build a Portfolio of Your Work",
              details: "Write for your school newspaper, a local blog, or freelance.",
              detailsKm: "[km] Write for your school newspaper, a local blog, or freelance."
          },
          {
              step: "Gain Internship Experience",
              stepKm: "[km] Gain Internship Experience",
              details: "Work at a newspaper, magazine, or broadcast station.",
              detailsKm: "[km] Work at a newspaper, magazine, or broadcast station."
          },
          {
              step: "Network with Other Journalists",
              stepKm: "[km] Network with Other Journalists",
              details: "Join professional organizations and attend industry events.",
              detailsKm: "[km] Join professional organizations and attend industry events."
          }
      ]
    },
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
  ];  const { CAREER_KM } = require("./seed.careers.km");
  const { CAREER_IMAGE_URL } = require("./seed.careers.assets");

  const careersSeed = careers.map((c) => {
    const imageUrl = CAREER_IMAGE_URL[c.slug] || c.imageUrl || "";
    const km = CAREER_KM[c.slug];
    if (!km) return { ...c, imageUrl };

    const roadmap = (c.roadmap || []).map((r, idx) => {
      const rKm = km.roadmap?.[idx] || {};
      return {
        ...r,
        stepKm: rKm.stepKm || r.stepKm || "",
        detailsKm: rKm.detailsKm || r.detailsKm || ""
      };
    });

    return {
      ...c,
      imageUrl,
      titleKm: km.titleKm || c.titleKm || "",
      descriptionKm: km.descriptionKm || c.descriptionKm || "",
      skillsKm: km.skillsKm || c.skillsKm || [],
      roadmap
    };
  });

  const posts = [
    {
      slug: "how-to-choose-a-major",
      title: "How to choose a major (simple guide)",
      titleKm: "របៀបជ្រើសរើសមុខជំនាញ (មគ្គុទេសក៍សង្ខេប)",
      excerpt: "A practical checklist to choose your major with confidence.",
      excerptKm: "បញ្ជីត្រួតពិនិត្យងាយៗ ដើម្បីជ្រើសរើសមុខជំនាញដោយមានទំនុកចិត្ត។",
      coverImageUrl: "/images/posts/how-to-choose-a-major.svg",
      content:
        "Start with your interests, then match them with skills you enjoy building.\n\nTry small projects, talk to seniors, and review job options in Cambodia.\n\nTip: choose a major that you can practice every week, not only in exams.",
      contentKm:
        "ចាប់ផ្តើមពីចំណូលចិត្តរបស់អ្នក បន្ទាប់មកភ្ជាប់ទៅជំនាញដែលអ្នកចូលចិត្តបង្កើត។\n\nសាកល្បងគម្រោងតូចៗ ពិភាក្សាជាមួយបងប្អូន/សិស្សជាន់លើ ហើយពិនិត្យជម្រើសការងារនៅកម្ពុជា។\n\nគន្លឹះ៖ ជ្រើសមុខជំនាញដែលអ្នកអាចអនុវត្តរៀងរាល់សប្តាហ៍ មិនមែនតែពេលប្រឡងទេ។",
      tags: ["major", "students"]
    },
    {
      slug: "skills-for-the-future",
      title: "Skills needed for the future",
      titleKm: "ជំនាញសម្រាប់អនាគត",
      excerpt: "Skills that help you adapt in a fast-changing world.",
      excerptKm: "ជំនាញដែលជួយអ្នកសម្របខ្លួនក្នុងពិភពដែលផ្លាស់ប្តូរលឿន។",
      coverImageUrl: "/images/posts/skills-for-the-future.svg",
      content:
        "Communication, problem solving, digital literacy, and continuous learning are powerful across many careers.\n\nFocus on: writing clearly, teamwork, learning new tools, and building a small portfolio.",
      contentKm:
        "ការទំនាក់ទំនង ដោះស្រាយបញ្ហា ជំនាញឌីជីថល និងការរៀនជានិច្ច គឺមានសារៈសំខាន់សម្រាប់អាជីពជាច្រើន។\n\nផ្តោតលើ៖ សរសេរឲ្យច្បាស់ ធ្វើការជាក្រុម រៀនឧបករណ៍ថ្មីៗ និងបង្កើត Portfolio តូចៗ។",
      tags: ["skills", "career"]
    },
    {
      slug: "build-a-portfolio",
      title: "Build a portfolio (even if you're a beginner)",
      titleKm: "បង្កើត Portfolio (ទោះបីអ្នកទើបចាប់ផ្តើមក៏ដោយ)",
      excerpt: "A simple way to show your skills with real projects.",
      excerptKm: "វិធីងាយៗ ដើម្បីបង្ហាញជំនាញរបស់អ្នកជាមួយគម្រោងពិត។",
      coverImageUrl: "/images/posts/build-a-portfolio.svg",
      content:
        "Portfolio is proof. Start with 3 projects:\n\n1) One small project (1–2 days)\n2) One medium project (1–2 weeks)\n3) One team project (club or class)\n\nWrite: what you built, what you learned, and what you will improve.",
      contentKm:
        "Portfolio គឺជាភស្តុតាង។ ចាប់ផ្តើមពីគម្រោង 3៖\n\n1) គម្រោងតូច (1–2 ថ្ងៃ)\n2) គម្រោងមធ្យម (1–2 សប្តាហ៍)\n3) គម្រោងជាក្រុម (ក្លឹប ឬថ្នាក់)\n\nសរសេរ៖ អ្នកបានបង្កើតអ្វី? រៀនបានអ្វី? និងចង់កែលម្អអ្វីបន្ថែម។",
      tags: ["portfolio", "skills"]
    },
    {
      slug: "study-habits-time-management",
      title: "Study habits & time management for students",
      titleKm: "ទម្លាប់រៀន និងការគ្រប់គ្រងពេលវេលាសម្រាប់សិស្ស",
      excerpt: "Small routines that make learning easier every day.",
      excerptKm: "ទម្លាប់តូចៗដែលធ្វើឲ្យការរៀនកាន់តែងាយស្រួលរៀងរាល់ថ្ងៃ។",
      coverImageUrl: "/images/posts/study-habits.svg",
      content:
        "Try this weekly system:\n\n- 25 minutes focus + 5 minutes break\n- Review notes the same day\n- 1 summary page per chapter\n- Practice with questions, not only reading\n\nConsistency beats long study nights.",
      contentKm:
        "សាកល្បងប្រព័ន្ធរៀនប្រចាំសប្តាហ៍៖\n\n- ផ្តោត 25 នាទី + សម្រាក 5 នាទី\n- ពិនិត្យមេរៀនថ្ងៃនោះភ្លាម\n- សង្ខេប 1 ទំព័រ/មេរៀន\n- អនុវត្តដោយសំណួរ មិនមែនតែអានប៉ុណ្ណោះ\n\nភាពទៀងទាត់ល្អជាងរៀនយប់យូរៗ។",
      tags: ["study", "students"]
    },
    {
      slug: "cv-and-interview-basics",
      title: "CV & interview basics (Cambodia student version)",
      titleKm: "មូលដ្ឋាន CV និងសម្ភាសន៍ (សម្រាប់សិស្ស/និស្សិតកម្ពុជា)",
      excerpt: "What to write and how to prepare for your first interview.",
      excerptKm: "តើត្រូវសរសេរអ្វី និងត្រូវត្រៀមខ្លួនដូចម្តេចសម្រាប់សម្ភាសន៍ដំបូង។",
      coverImageUrl: "/images/posts/cv-interview.svg",
      content:
        "A good student CV includes:\n\n- Education + projects\n- Skills (with examples)\n- Activities (clubs, volunteer)\n- Contact + LinkedIn/GitHub (if any)\n\nFor interviews: practice 5 stories (challenge → action → result).",
      contentKm:
        "CV ល្អសម្រាប់សិស្ស/និស្សិតរួមមាន៖\n\n- ការសិក្សា + គម្រោង\n- ជំនាញ (មានឧទាហរណ៍)\n- សកម្មភាព (ក្លឹប ស្ម័គ្រចិត្ត)\n- ទំនាក់ទំនង + LinkedIn/GitHub (បើមាន)\n\nសម្រាប់សម្ភាសន៍៖ ហ្វឹកហាត់រឿង 5 (បញ្ហា → អ្វីដែលអ្នកធ្វើ → លទ្ធផល)។",
      tags: ["job", "skills"]
    },
    {
      slug: "learn-english-faster",
      title: "Learn English faster (daily plan)",
      titleKm: "រៀនអង់គ្លេសឲ្យលឿន (ផែនការប្រចាំថ្ងៃ)",
      excerpt: "A simple daily routine to improve listening, speaking, and writing.",
      excerptKm: "ទម្លាប់ប្រចាំថ្ងៃងាយៗ ដើម្បីកែលម្អការស្តាប់ និយាយ និងសរសេរ។",
      coverImageUrl: "/images/posts/learn-english.svg",
      content:
        "15–30 minutes per day is enough if you do it consistently:\n\n- 10 min: listen + shadow (repeat)\n- 10 min: read 1 short article\n- 5 min: write 5 sentences\n- Weekend: speak with a friend / record yourself\n\nMeasure progress every 2 weeks.",
      contentKm:
        "ថ្ងៃละ 15–30 នាទីគ្រប់គ្រាន់ បើអ្នកធ្វើឲ្យទៀងទាត់៖\n\n- 10 នាទី៖ ស្តាប់ + shadow (និយាយតាម)\n- 10 នាទី៖ អានអត្ថបទខ្លី 1\n- 5 នាទី៖ សរសេរ 5 ប្រយោគ\n- ចុងសប្តាហ៍៖ និយាយជាមួយមិត្ត ឬថតសំឡេងខ្លួនឯង\n\nវាស់ការរីកចម្រើនរៀងរាល់ 2 សប្តាហ៍។",
      tags: ["language", "students"]
    },
    {
      slug: "family-pressure-career-choice",
      title: "Family pressure vs your career choice",
      titleKm: "សម្ពាធគ្រួសារ និងជម្រើសអាជីពរបស់អ្នក",
      excerpt: "How to communicate your plan respectfully and clearly.",
      excerptKm: "របៀបពិភាក្សាផែនការរបស់អ្នកដោយគោរព និងច្បាស់លាស់។",
      coverImageUrl: "/images/posts/family-pressure.svg",
      content:
        "Try this conversation structure:\n\n1) Appreciate their support\n2) Explain your interest + long-term goal\n3) Show evidence (test result, projects, roadmap)\n4) Propose a timeline (3 months, 6 months)\n5) Ask for feedback\n\nBeing clear reduces conflict.",
      contentKm:
        "សាកល្បងរចនាសម្ព័ន្ធពិភាក្សានេះ៖\n\n1) អរគុណចំពោះការគាំទ្រ\n2) ពន្យល់ចំណូលចិត្ត + គោលដៅវែង\n3) បង្ហាញភស្តុតាង (លទ្ធផលតេស្ត គម្រោង ផែនទីអាជីព)\n4) ផ្ដល់ពេលវេលា (3 ខែ 6 ខែ)\n5) សួរយោបល់\n\nភាពច្បាស់លាស់ជួយកាត់បន្ថយជម្លោះ។",
      tags: ["decision", "students"]
    },
    {
      slug: "it-vs-business-which-one",
      title: "IT vs Business: which one fits you?",
      titleKm: "IT ទល់នឹង ពាណិជ្ជកម្ម៖ មួយណាសមនឹងអ្នក?",
      excerpt: "Compare learning style, skills, and career options.",
      excerptKm: "ប្រៀបធៀបរបៀបរៀន ជំនាញ និងជម្រើសអាជីព។",
      coverImageUrl: "/images/posts/it-vs-business.svg",
      content:
        "Choose IT if you enjoy building systems, debugging, and learning tools.\n\nChoose Business if you enjoy communication, negotiation, and working with people + numbers.\n\nBoth need: discipline, teamwork, and problem solving.",
      contentKm:
        "ជ្រើស IT បើអ្នកចូលចិត្តបង្កើតប្រព័ន្ធ ដោះកំហុស (debug) និងរៀនឧបករណ៍ថ្មីៗ។\n\nជ្រើស ពាណិជ្ជកម្ម បើអ្នកចូលចិត្តទំនាក់ទំនង ចរចា និងធ្វើការជាមួយមនុស្ស + លេខ។\n\nទាំងពីរត្រូវការ៖ វិន័យ ធ្វើការជាក្រុម និងដោះស្រាយបញ្ហា។",
      tags: ["major", "career"]
    },
    {
      slug: "scholarship-and-university-tips",
      title: "Scholarship & university tips",
      titleKm: "គន្លឹះអំពីអាហារូបករណ៍ និងជ្រើសសាកលវិទ្យាល័យ",
      excerpt: "How to prepare documents and choose a program.",
      excerptKm: "របៀបត្រៀមឯកសារ និងជ្រើសកម្មវិធីសិក្សា។",
      coverImageUrl: "/images/posts/scholarship.svg",
      content:
        "Prepare early:\n\n- Grades + recommendation letter\n- Personal statement (your story + goal)\n- Portfolio/projects\n- Volunteer/activities\n\nChoose a university by: curriculum, teachers, internship links, and alumni outcomes.",
      contentKm:
        "ត្រៀមឲ្យបានមុន៖\n\n- ពិន្ទុ + លិខិតណែនាំ\n- Personal statement (រឿងរ៉ាវ + គោលដៅ)\n- Portfolio/គម្រោង\n- សកម្មភាពស្ម័គ្រចិត្ត/ក្លឹប\n\nជ្រើសសាកលវិទ្យាល័យតាម៖ មុខវិជ្ជាសិក្សា គ្រូ បណ្តាញ internship និងលទ្ធផល alumni។",
      tags: ["education", "students"]
    }
  ];

  const videos = [
    {
      slug: "how-to-choose-a-major",
      title: "How to choose a major (step-by-step)",
      titleKm: "របៀបជ្រើសរើសមុខជំនាញ (ជំហានៗ)",
      description:
        "A simple process: interests → skills → majors → careers. Use this video before you decide.",
      descriptionKm:
        "ដំណើរការងាយៗ៖ ចំណូលចិត្ត → ជំនាញ → មុខជំនាញ → អាជីព។ សូមមើលវីដេអូនេះមុនពេលសម្រេចចិត្ត។",
      url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      tags: ["major", "students"]
    },
    {
      slug: "skills-for-the-future",
      title: "Skills for the future (students)",
      titleKm: "ជំនាញសម្រាប់អនាគត (សិស្ស)",
      description: "Top skills: communication, problem solving, digital skills, and learning mindset.",
      descriptionKm: "ជំនាញសំខាន់ៗ៖ ទំនាក់ទំនង ដោះស្រាយបញ្ហា ជំនាញឌីជីថល និងចិត្តសាស្ត្ររៀនជានិច្ច។",
      url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      tags: ["skills"]
    }
  ];

  await Major.deleteMany({});
  await Career.deleteMany({});
  await Post.deleteMany({});
  await Video.deleteMany({});

  await Major.insertMany(majorsSeed);
  await Career.insertMany(careersSeed);
  await Post.insertMany(posts);
  await Video.insertMany(videos);

  // eslint-disable-next-line no-console
  console.log("Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});













