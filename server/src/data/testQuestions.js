// Simple RIASEC-style interest questions.
// Each question has 4 choices, mapped to one RIASEC code.
// Bilingual support: `promptKm` and `choices[].textKm` are Khmer translations.
const QUESTIONS = [
  {
    id: 1,
    prompt: "Which activity sounds most enjoyable?",
    promptKm: "សកម្មភាពមួយណាដែលស្តាប់ទៅគួរឱ្យរីករាយជាងគេ?",
    choices: [
      { text: "Fixing or building something with tools", textKm: "ជួសជុល ឬសាងសង់អ្វីមួយដោយប្រើឧបករណ៍", code: "R" },
      { text: "Solving a logic puzzle or math problem", textKm: "ដោះស្រាយល្បែងតក្កវិជ្ជា ឬបញ្ហាគណិតវិទ្យា", code: "I" },
      { text: "Designing a poster or creating art", textKm: "រចនាប័ណ្ណប៉ូស្ទ័រ ឬបង្កើតសិល្បៈ", code: "A" },
      { text: "Helping someone learn a new skill", textKm: "ជួយអ្នកដទៃរៀនជំនាញថ្មី", code: "S" }
    ]
  },
  {
    id: 2,
    prompt: "In a group project, you prefer to…",
    promptKm: "នៅក្នុងគម្រោងក្រុម អ្នកចូលចិត្ត…",
    choices: [
      { text: "Organize tasks and lead the team", textKm: "រៀបចំការងារ និងដឹកនាំក្រុម", code: "E" },
      { text: "Make the plan clear and structured", textKm: "ធ្វើឱ្យផែនការច្បាស់លាស់ និងមានរចនាសម្ព័ន្ធ", code: "C" },
      { text: "Try a creative approach", textKm: "សាកល្បងវិធីសាស្ត្រច្នៃប្រឌិត", code: "A" },
      { text: "Research the best solution", textKm: "ស្រាវជ្រាវដើម្បីរកដំណោះស្រាយល្អបំផុត", code: "I" }
    ]
  },
  {
    id: 3,
    prompt: "Pick one class you would enjoy most:",
    promptKm: "ជ្រើសរើសមុខវិជ្ជាមួយដែលអ្នកចូលចិត្តបំផុត៖",
    choices: [
      { text: "Computer hardware / robotics", textKm: "ផ្នែករឹងកុំព្យូទ័រ / រ៉ូបូតិក", code: "R" },
      { text: "Science research / lab", textKm: "ស្រាវជ្រាវវិទ្យាសាស្ត្រ / មន្ទីរពិសោធន៍", code: "I" },
      { text: "Media / design", textKm: "មេឌៀ / រចនា", code: "A" },
      { text: "Social studies / psychology", textKm: "សង្គមវិទ្យា / ចិត្តវិទ្យា", code: "S" }
    ]
  },
  {
    id: 4,
    prompt: "You feel proud when you…",
    promptKm: "អ្នកមានមោទនភាពនៅពេលអ្នក…",
    choices: [
      { text: "Make something work in real life", textKm: "ធ្វើអោយអ្វីមួយប្រើបានពិតប្រាកដ", code: "R" },
      { text: "Understand a difficult concept deeply", textKm: "យល់ច្បាស់ពីគំនិតពិបាកៗ", code: "I" },
      { text: "Create something original", textKm: "បង្កើតអ្វីមួយថ្មី និងមានភាពច្នៃប្រឌិត", code: "A" },
      { text: "Support someone and see them grow", textKm: "គាំទ្រអ្នកដទៃ ហើយឃើញពួកគេរីកចម្រើន", code: "S" }
    ]
  },
  {
    id: 5,
    prompt: "Which task would you choose first?",
    promptKm: "ការងារមួយណាដែលអ្នកជ្រើសរើសធ្វើមុនគេ?",
    choices: [
      { text: "Sell an idea or product", textKm: "លក់គំនិត ឬផលិតផល", code: "E" },
      { text: "Manage money or records carefully", textKm: "គ្រប់គ្រងលុយ ឬកំណត់ត្រាឱ្យបានប្រុងប្រយ័ត្ន", code: "C" },
      { text: "Investigate why a problem happens", textKm: "ស៊ើបអង្កេតមូលហេតុដែលបញ្ហាកើតឡើង", code: "I" },
      { text: "Build a simple prototype", textKm: "បង្កើតគំរូសាកល្បងសាមញ្ញ", code: "R" }
    ]
  },
  {
    id: 6,
    prompt: "People describe you as…",
    promptKm: "មនុស្សជុំវិញពិពណ៌នាអ្នកថា…",
    choices: [
      { text: "Practical", textKm: "ជាក់ស្តែង និងអនុវត្តបាន", code: "R" },
      { text: "Curious", textKm: "ចង់ដឹង ចង់ស្រាវជ្រាវ", code: "I" },
      { text: "Imaginative", textKm: "មានការស្រមៃ និងច្នៃប្រឌិត", code: "A" },
      { text: "Caring", textKm: "យកចិត្តទុកដាក់ និងអាណិតអាសូរ", code: "S" }
    ]
  },
  {
    id: 7,
    prompt: "When you learn something new, you prefer…",
    promptKm: "ពេលរៀនអ្វីថ្មី អ្នកចូលចិត្ត…",
    choices: [
      { text: "Hands-on practice", textKm: "អនុវត្តផ្ទាល់", code: "R" },
      { text: "Reading and understanding theory", textKm: "អាន និងយល់ទ្រឹស្តី", code: "I" },
      { text: "Trying different creative ideas", textKm: "សាកល្បងគំនិតច្នៃប្រឌិតផ្សេងៗ", code: "A" },
      { text: "Learning together with others", textKm: "រៀនជាមួយអ្នកដទៃ", code: "S" }
    ]
  },
  {
    id: 8,
    prompt: "Choose a weekend activity:",
    promptKm: "ជ្រើសរើសសកម្មភាពមួយនៅចុងសប្តាហ៍៖",
    choices: [
      { text: "Start a small online business", textKm: "ចាប់ផ្តើមអាជីវកម្មតូចៗតាមអ៊ីនធឺណិត", code: "E" },
      { text: "Plan and organize your week", textKm: "រៀបចំផែនការ និងតារាងសប្តាហ៍របស់អ្នក", code: "C" },
      { text: "Create a video or content", textKm: "បង្កើតវីដេអូ ឬមាតិកា", code: "A" },
      { text: "Volunteer in your community", textKm: "ធ្វើស្ម័គ្រចិត្តក្នុងសហគមន៍", code: "S" }
    ]
  },
  {
    id: 9,
    prompt: "Which tool would you rather use?",
    promptKm: "ឧបករណ៍មួយណាដែលអ្នកចង់ប្រើជាងគេ?",
    choices: [
      { text: "Screwdriver set", textKm: "សំណុំដៃកែវ (Screwdriver)", code: "R" },
      { text: "Spreadsheet", textKm: "តារាងគណនា (Spreadsheet)", code: "C" },
      { text: "Camera / design software", textKm: "កាមេរ៉ា / កម្មវិធីរចនា", code: "A" },
      { text: "Whiteboard for ideas", textKm: "ក្តារសរសេរ សម្រាប់គំនិត", code: "I" }
    ]
  },
  {
    id: 10,
    prompt: "You want your future job to have…",
    promptKm: "អ្នកចង់ឱ្យការងារអនាគតមាន…",
    choices: [
      { text: "Clear steps and stability", textKm: "ជំហានច្បាស់ និងស្ថិរភាព", code: "C" },
      { text: "Freedom to create", textKm: "សេរីភាពក្នុងការច្នៃប្រឌិត", code: "A" },
      { text: "A chance to lead and earn more", textKm: "ឱកាសដឹកនាំ និងរកចំណូលច្រើន", code: "E" },
      { text: "Meaningful impact on people", textKm: "មានអត្ថន័យ និងមានឥទ្ធិពលលើមនុស្ស", code: "S" }
    ]
  },
  {
    id: 11,
    prompt: "Which situation do you like most?",
    promptKm: "ស្ថានភាពមួយណាដែលអ្នកចូលចិត្តបំផុត?",
    choices: [
      { text: "Repairing a device for someone", textKm: "ជួសជុលឧបករណ៍ឱ្យអ្នកដទៃ", code: "R" },
      { text: "Analyzing data to find a pattern", textKm: "វិភាគទិន្នន័យដើម្បីរកលំនាំ", code: "I" },
      { text: "Designing a new logo", textKm: "រចនាឡូហ្គូថ្មី", code: "A" },
      { text: "Teaching a younger student", textKm: "បង្រៀនសិស្សតូច", code: "S" }
    ]
  },
  {
    id: 12,
    prompt: "Pick one strength:",
    promptKm: "ជ្រើសរើសចំណុចខ្លាំងមួយ៖",
    choices: [
      { text: "I make things happen", textKm: "ខ្ញុំធ្វើឱ្យរឿងកើតឡើង/សម្រេចបាន", code: "E" },
      { text: "I keep things organized", textKm: "ខ្ញុំចូលចិត្តរៀបចំរបស់របរឱ្យមានរបៀប", code: "C" },
      { text: "I understand complex ideas", textKm: "ខ្ញុំយល់គំនិតស្មុគស្មាញបានល្អ", code: "I" },
      { text: "I’m good with my hands", textKm: "ខ្ញុំចេះធ្វើការងារដោយដៃបានល្អ", code: "R" }
    ]
  },
  {
    id: 13,
    prompt: "Which work environment fits you?",
    promptKm: "បរិយាកាសការងារមួយណាសមនឹងអ្នក?",
    choices: [
      { text: "Workshop / field work", textKm: "រោងជាង / ការងារក្រៅទីតាំង", code: "R" },
      { text: "Lab / research", textKm: "មន្ទីរពិសោធន៍ / ស្រាវជ្រាវ", code: "I" },
      { text: "Studio / creative team", textKm: "ស្ទូឌីយោ / ក្រុមច្នៃប្រឌិត", code: "A" },
      { text: "School / community", textKm: "សាលារៀន / សហគមន៍", code: "S" }
    ]
  },
  {
    id: 14,
    prompt: "If you must pick, you value…",
    promptKm: "បើត្រូវជ្រើសរើស អ្នកឲ្យតម្លៃទៅលើ…",
    choices: [
      { text: "Achievement and leadership", textKm: "សមិទ្ធផល និងភាពដឹកនាំ", code: "E" },
      { text: "Order and accuracy", textKm: "របៀបរៀបរយ និងភាពត្រឹមត្រូវ", code: "C" },
      { text: "Creativity and expression", textKm: "ការច្នៃប្រឌិត និងការបង្ហាញខ្លួន", code: "A" },
      { text: "Curiosity and discovery", textKm: "ចង់ដឹង និងការរកឃើញថ្មីៗ", code: "I" }
    ]
  },
  {
    id: 15,
    prompt: "Which project would you start?",
    promptKm: "គម្រោងមួយណាដែលអ្នកនឹងចាប់ផ្តើម?",
    choices: [
      { text: "Build a simple app/game", textKm: "បង្កើតកម្មវិធី/ហ្គេមសាមញ្ញ", code: "I" },
      { text: "Design a brand for a small shop", textKm: "រចនាប្រេនសម្រាប់ហាងតូច", code: "A" },
      { text: "Create a study group to help friends", textKm: "បង្កើតក្រុមរៀនដើម្បីជួយមិត្ត", code: "S" },
      { text: "Fix bikes/equipment and improve it", textKm: "ជួសជុលកង់/ឧបករណ៍ និងធ្វើឱ្យល្អប្រសើរ", code: "R" }
    ]
  },
  {
    id: 16,
    prompt: "What motivates you most?",
    promptKm: "អ្វីជំរុញទឹកចិត្តអ្នកបំផុត?",
    choices: [
      { text: "Seeing real results", textKm: "ឃើញលទ្ធផលពិតប្រាកដ", code: "R" },
      { text: "Understanding how things work", textKm: "យល់ពីរបៀបដែលអ្វីៗដំណើរការ", code: "I" },
      { text: "Expressing my ideas", textKm: "បង្ហាញគំនិតរបស់ខ្ញុំ", code: "A" },
      { text: "Helping people succeed", textKm: "ជួយអ្នកដទៃឱ្យជោគជ័យ", code: "S" }
    ]
  },
  {
    id: 17,
    prompt: "You are asked to plan an event. You would…",
    promptKm: "អ្នកត្រូវបានស្នើឱ្យរៀបចំព្រឹត្តិការណ៍មួយ។ អ្នកនឹង…",
    choices: [
      { text: "Promote it and attract people", textKm: "ផ្សព្វផ្សាយ និងទាក់ទាញមនុស្ស", code: "E" },
      { text: "Make schedules, checklists, and budget", textKm: "ធ្វើកាលវិភាគ បញ្ជីត្រួតពិនិត្យ និងថវិកា", code: "C" },
      { text: "Create posters and social media design", textKm: "បង្កើតប៉ូស្ទ័រ និងរចនាមេឌៀសង្គម", code: "A" },
      { text: "Coordinate volunteers and support guests", textKm: "សម្របសម្រួលស្ម័គ្រចិត្ត និងជួយភ្ញៀវ", code: "S" }
    ]
  },
  {
    id: 18,
    prompt: "Which job sounds most interesting?",
    promptKm: "ការងារមួយណាដែលស្តាប់ទៅគួរឱ្យចាប់អារម្មណ៍បំផុត?",
    choices: [
      { text: "Network / IT support technician", textKm: "បច្ចេកទេសបណ្តាញ / IT Support", code: "R" },
      { text: "Software developer / data analyst", textKm: "អ្នកអភិវឌ្ឍកម្មវិធី / វិភាគទិន្នន័យ", code: "I" },
      { text: "Graphic designer / content creator", textKm: "អ្នករចនាក្រាហ្វិក / អ្នកបង្កើតមាតិកា", code: "A" },
      { text: "Teacher / counselor", textKm: "គ្រូបង្រៀន / អ្នកប្រឹក្សា", code: "S" }
    ]
  },
  {
    id: 19,
    prompt: "When making a decision, you rely on…",
    promptKm: "ពេលសម្រេចចិត្ត អ្នកពឹងផ្អែកលើ…",
    choices: [
      { text: "Facts and research", textKm: "ព័ត៌មានពិត និងការស្រាវជ្រាវ", code: "I" },
      { text: "Rules and steps", textKm: "ច្បាប់ និងជំហាន", code: "C" },
      { text: "People’s needs and feelings", textKm: "តម្រូវការ និងអារម្មណ៍របស់មនុស្ស", code: "S" },
      { text: "Opportunities to win", textKm: "ឱកាសឈ្នះ/ជោគជ័យ", code: "E" }
    ]
  },
  {
    id: 20,
    prompt: "Pick a task you would do without being asked:",
    promptKm: "ជ្រើសការងារមួយដែលអ្នកធ្វើដោយខ្លួនឯង ដោយមិនចាំបាច់有人ស្នើ៖",
    choices: [
      { text: "Start selling something online", textKm: "ចាប់ផ្តើមលក់អ្វីមួយតាមអ៊ីនធឺណិត", code: "E" },
      { text: "Organize files and notes", textKm: "រៀបចំឯកសារ និងកំណត់ចំណាំ", code: "C" },
      { text: "Make a creative presentation", textKm: "ធ្វើបទបង្ហាញដែលមានភាពច្នៃប្រឌិត", code: "A" },
      { text: "Repair something that is broken", textKm: "ជួសជុលអ្វីមួយដែលខូច", code: "R" }
    ]
  },
  {
    id: 21,
    prompt: "Which of these tasks seems most interesting to you?",
    promptKm: "តើការងារមួយណាក្នុងចំណោមការងារទាំងនេះដែលអ្នកចាប់អារម្មណ៍ជាងគេ?",
    choices: [
      { text: "Designing a bridge", textKm: "រចនាស្ពាន", code: "R" },
      { text: "Developing a new drug", textKm: "អភិវឌ្ឍថ្នាំថ្មី", code: "I" },
      { text: "Writing a novel", textKm: "សរសេរសៀវភៅប្រលោមលោក", code: "A" },
      { text: "Starting a new business", textKm: "ចាប់ផ្តើមអាជីវកម្មថ្មី", code: "E" }
    ]
  },
  {
    id: 22,
    prompt: "What kind of problems do you like to solve?",
    promptKm: "តើបញ្ហាបែបណាដែលអ្នកចូលចិត្តដោះស្រាយ?",
    choices: [
      { text: "Problems with a clear right and wrong answer", textKm: "បញ្ហាដែលមានចម្លើយត្រូវនិងខុសច្បាស់លាស់", code: "C" },
      { text: "Problems that require helping people", textKm: "បញ្ហាដែលទាមទារការជួយមនុស្ស", code: "S" },
      { text: "Problems that require abstract thinking", textKm: "បញ្ហាដែលទាមទារការគិតអរូបី", code: "I" },
      { text: "Problems that require creativity and innovation", textKm: "បញ្ហាដែលទាមទារភាពច្នៃប្រឌិត និងនវានុវត្តន៍", code: "A" }
    ]
  },
  {
    id: 23,
    prompt: "Which subject would you be most excited to study?",
    promptKm: "តើមុខវិជ្ជាមួយណាដែលអ្នករំភើបនឹងរៀនជាងគេ?",
    choices: [
      { text: "The laws of physics", textKm: "ច្បាប់រូបវិទ្យា", code: "I" },
      { text: "The history of art", textKm: "ប្រវត្តិសាស្រ្តសិល្បៈ", code: "A" },
      { text: "The principles of economics", textKm: "គោលការណ៍សេដ្ឋកិច្ច", code: "C" },
      { text: "The anatomy of the human body", textKm: "កាយវិភាគសាស្ត្រនៃរាងកាយមនុស្ស", code: "I" }
    ]
  },
  {
    id: 24,
    prompt: "What would you rather do on a computer?",
    promptKm: "តើអ្នកចង់ធ្វើអ្វីនៅលើកុំព្យូទ័រ?",
    choices: [
      { text: "Write code to build an app", textKm: "សរសេរកូដដើម្បីបង្កើតកម្មវិធី", code: "I" },
      { text: "Design a 3D model", textKm: "រចនាគំរូ 3D", code: "A" },
      { text: "Manage a large database", textKm: "គ្រប់គ្រងមូលដ្ឋានទិន្នន័យធំ", code: "C" },
      { text: "Create a marketing campaign", textKm: "បង្កើតយុទ្ធនាការទីផ្សារ", code: "E" }
    ]
  },
  {
    id: 25,
    prompt: "Which work environment do you prefer?",
    promptKm: "តើបរិយាកាសការងារបែបណាដែលអ្នកចូលចិត្ត?",
    choices: [
      { text: "A fast-paced, competitive environment", textKm: "បរិយាកាសដែលមានការប្រកួតប្រជែងនិងមានភាពរហ័សរហួន", code: "E" },
      { text: "A quiet, focused environment", textKm: "បរិយាកាសស្ងប់ស្ងាត់និងមានការផ្ចង់អារម្មណ៍", code: "I" },
      { text: "A collaborative, team-oriented environment", textKm: "បរិយាកាសដែលមានការសហការនិងធ្វើការជាក្រុម", code: "S" },
      { text: "A hands-on, practical environment", textKm: "បរិយាកាសដែលផ្តោតលើការអនុវត្ត", code: "R" }
    ]
  },
  {
    id: 26,
    prompt: "What is your preferred way of learning?",
    promptKm: "តើអ្នកចូលចិត្តរៀនតាមវិធីណា?",
    choices: [
      { text: "By doing and practicing", textKm: "តាមរយៈការធ្វើនិងអនុវត្ត", code: "R" },
      { text: "By reading and researching", textKm: "តាមរយៈការអាននិងស្រាវជ្រាវ", code: "I" },
      { text: "By discussing and debating with others", textKm: "តាមរយៈការពិភាក្សានិងជជែកវែកញែកជាមួយអ្នកដទៃ", code: "S" },
      { text: "By observing and imitating", textKm: "តាមរយៈការសង្កេត និងធ្វើតាម", code: "A" }
    ]
  },
  {
    id: 27,
    prompt: "Which of these would you rather create?",
    promptKm: "តើអ្នកចង់បង្កើតអ្វីមួយណាក្នុងចំណោមរបស់ទាំងនេះ?",
    choices: [
      { text: "A detailed financial report", textKm: "របាយការណ៍ហិរញ្ញវត្ថុលម្អិត", code: "C" },
      { text: "A piece of music", textKm: "បទភ្លេង", code: "A" },
      { text: "A business plan", textKm: "ផែនការអាជីវកម្ម", code: "E" },
      { text: "A scientific theory", textKm: "ទ្រឹស្តីវិទ្យាសាស្ត្រ", code: "I" }
    ]
  },
  {
    id: 28,
    prompt: "When working on a project, what is most important to you?",
    promptKm: "នៅពេលធ្វើគម្រោងតើអ្វីដែលសំខាន់បំផុតសម្រាប់អ្នក?",
    choices: [
      { text: "Efficiency and accuracy", textKm: "ប្រសិទ្ធភាព និងភាពត្រឹមត្រូវ", code: "C" },
      { text: "Creativity and originality", textKm: "ភាពច្នៃប្រឌិត និងគំនិតផ្តួចផ្តើម", code: "A" },
      { text: "Making a profit", textKm: "រកប្រាក់ចំណេញ", code: "E" },
      { text: "Making a difference in the world", textKm: "ធ្វើឲ្យមានការផ្លាស់ប្តូរនៅក្នុងពិភពលោក", code: "S" }
    ]
  },
  {
    id: 29,
    prompt: "Which of these activities sounds most appealing?",
    promptKm: "តើសកម្មភាពមួយណាដែលទាក់ទាញជាងគេ?",
    choices: [
      { text: "Defending someone in court", textKm: "ការពារនរណាម្នាក់នៅក្នុងតុលាការ", code: "E" },
      { text: "Conducting a scientific experiment", textKm: "ធ្វើពិសោធន៍វិទ្យាសាស្ត្រ", code: "I" },
      { text: "Teaching a class", textKm: "បង្រៀនថ្នាក់", code: "S" },
      { text: "Building a house", textKm: "សង់ផ្ទះ", code: "R" }
    ]
  },
  {
    id: 30,
    prompt: "You are more of a...",
    promptKm: "អ្នកជាមនុស្ស...",
    choices: [
      { text: "Thinker", textKm: "អ្នកគិត", code: "I" },
      { text: "Doer", textKm: "អ្នកធ្វើ", code: "R" },
      { text: "Creator", textKm: "អ្នកបង្កើត", code: "A" },
      { text: "Helper", textKm: "អ្នកជួយ", code: "S" }
    ]
  }
];

module.exports = { QUESTIONS };


