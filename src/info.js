// All my info is here
// ─────────────────────────────────────────────────────────────

// ── PROJECTS ──────────────────────────────────────────────────
// Add project description here. Keep it to two or three sentences so the card stays clean.
export const projects = [
  {
    id:   'ID_00',
    name: 'Himiko',
    tags: ['Ollama', 'Elevenlabs', 'Pytorch', 'Discord', 'Whisper'],
    desc: 'My Crown Jewel, an AI Agent that interfaces with discord, Vtube Studio, Minecraft, and many more modules',
    link: 'https://github.com/ShadowAlzazel/himiko',
  },
  {
    id:   'ID_01',
    name: 'My Portfolio',
    tags: ['Svelte', 'Vercel'],
    desc: 'Just `this` portfolio, don\'t get stuck in a self-reference though. Using svelte for the frontend and vercel for easy deployments.',
    link: 'https://github.com/ShadowAlzazel/portfolio',
  },
  {
    id:   'ID_02',
    name: 'Project: Magic Missile',
    tags: ['Unity', 'C#', 'Firebase'],
    desc: 'My most recent project, a character based game with a focus on a style UI and setting.',
    link: 'https://github.com/ShadowAlzazel/Project-Magic-Missile',
  },
  {
    id:   'ID_03',
    name: 'Minecraft Odyssey',
    tags: ['Kotlin', 'Java', 'BlockBench'],
    desc: 'A large Minecraft expansion that is a Plugin, Datapack and Resourcepack that adds items, biomes, dimensions and dungeons. All runs server side so vanilla clients can join!',
    link: 'https://github.com/ShadowAlzazel/MinecraftOdyssey',
  },
  {
    id:   'ID_04',
    name: 'Odyssey Wiki',
    tags: ['Svelte', 'Sveltepress'],
    desc: 'The accompanying wiki to the Odyssey Project, it was made using sveltepress to get that nice wiki feel.',
    link: 'https://odyssey-wiki.netlify.app/',
  },
  {
    id:   'ID_05',
    name: 'MinervaCraft',
    tags: ['Python', 'JS-Pybridge', 'Ollama', 'Docker'],
    desc: 'A project inspired by MindCraft (A Repo I contribute to) made in python to have custom AI Agents play on Minecraft Servers from their own docker container.',
    link: 'https://github.com/ShadowAlzazel/MinervaCraft',
  },
  {
    id:   'ID_06',
    name: 'CryptoCompliance',
    tags: ['Python', 'ML', 'Elliptic', 'Torch'],
    desc: 'A School Project for Graph-Based Classification of Illicit Bitcoin Transactions. \n Here is the youtube presentation https://youtu.be/roUuW_PnEtg',
    link: 'https://github.com/ShadowAlzazel/CECS458AIProject/tree/final',
  },
  {
    id:   'ID_07',
    name: 'SocialAgent Eve',
    tags: ['Python', 'Discord', 'Ollama', 'Docker'],
    desc: 'A School Project that handles social and event planning discord bot with a personalized LLM or local AI all handled via Docker containers.',
    link: 'https://github.com/NickNojiri/SocialAgent-Team10',
  },
      {
    id:   'ID_08',
    name: 'Street Eats',
    tags: ['Javascript', 'Expo', 'React'],
    desc: 'A React based mobile app and webapp to discover and rate street vendors all in your local area.',
    link: 'https://github.com/ShadowAlzazel/Street-Eats',
  },
];

// ── EXPERIENCE ────────────────────────────────────────────────
export const experience = [
  {
    role:    'Instructional Student Assistant',
    company: 'CALIFORNIA STATE UNIVERSITY - LONG BEACH',
    period:  '2025 — PRESENT',
    points:  [
      'Collaborated with faculty on course logistics and independently led proctoring responsibilities.',
      'Created backend tools with SQLite to automate grades and make emailing easier for the faculty.',
    ],
  },
  {
    role:    'Student',
    company: 'UNIVERSITY OF CALIFORNIA IRVINE',
    period:  'Jun. 2023 — Aug. 2023',
    points:  [
      'A Leadership program focused on meeting industry leaders and learning from them.',
      'Had the oppurtunity to present in front of the VPs of Nvida and the Mayor of Irvine!'
    ],
  }
];

// ── EDUCATION ────────────────────────────────────────────────
export const education = [
  {
    school: 'CALIFORNIA STATE UNIVERSITY LONG BEACH',
    location: 'LONG BEACH, CA',
    period:  'Aug. 2023 — 2026',
    points:  [
      'Bachelors of Science in Computer Science',
      'Machine Learning / Artificial Intelligence Track',
    ],
  },
  {
    school: 'HANYANG UNIVERSITY',
    location: 'SEOUL, SOUTH KOREA',
    period:  'Dec. 2025 — Jan. 2026',
    points:  [
      'Studied abroad at Hanyang International Winter School',
    ],
  },
  {
    school: 'LONG BEACH CITY COLLEGE',
    location: 'LONG BEACH, CA',
    period:  'Aug. 2021 — Jun. 2023',
    points:  [
      'Undergraduate in Computer Science',
    ],
  },
      {
    school: 'UNIVERSITY OF CALIFORNIA BERKELEY',
    location: 'BERKELEY, CA',
    period:  'Aug. 2020 — May. 2021',
    points:  [
      'Undergraduate in Electrical Engineering Computer Science',
    ],
  }
];

// ── SIDEBAR STATS — shown in the wiki panel ───────────────────
// Each skill has a value 0–100 that renders as a HUD progress bar
export const statGroups = [
  {
    label: 'LANGUAGES',
    stats: [
      { name: 'Python',       val: 92 },
      { name: 'Kotlin',       val: 88 },
      { name: 'Typescript',   val: 82 },
      { name: 'Javascript',   val: 81 },
      { name: 'Java',         val: 75 },
      { name: 'Rust',         val: 72 },
      { name: 'C#',           val: 64 },
    ],
  },
  {
    label: 'FRONTEND',
    stats: [
      { name: 'Svelte',     val: 90 },
      { name: 'React',      val: 82 },
      { name: 'Canvas API', val: 78 },
      { name: 'WebGL',      val: 55 },
    ],
  },
  {
    label: 'BACKEND',
    stats: [
      { name: 'Node.js',    val: 85 },
      { name: 'Firebase',   val: 80 },
      { name: 'Postgres',   val: 72 },
      { name: 'Redis',      val: 60 },
    ],
  },
  {
    label: 'TOOLS',
    stats: [
      { name: 'Git',        val: 95 },
      { name: 'Docker',     val: 90 },
      { name: 'Blockbench', val: 81 },
      { name: 'Unity',      val: 71 },
    ],
  },
];