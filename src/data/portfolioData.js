// ─────────────────────────────────────────────────────────────
//  portfolioData.js — Centralized data for Iksha's portfolio
// ─────────────────────────────────────────────────────────────

// ── Personal Info ───────────────────────────────────────────
export const personalInfo = {
  name: 'Iksha Kumawat',
  title: 'Computer Science Student · AI & ML Enthusiast · Designer',
  tagline:
    "Computer Science student building AI tools, mobile apps, and developer systems, with a designer's eye.",
  email: 'Ikshakumawat2007@gmail.com',
  linkedin: 'https://linkedin.com/in/iksha-kumawat-aa40a2334',
  github: 'https://github.com/ikshakumawat07',
  resumeUrl: '/assets/resume.pdf',
  portrait: '/assets/me.jpg',
};

// ── About Section ───────────────────────────────────────────
export const aboutChips = [
  'B.Tech CSE (2024–2028)',
  'IIT Jodhpur DS & AI',
  'Journalism Society',
  'Designer + Developer',
];

export const aboutText = `I'm Iksha Kumawat, a B.Tech Computer Science student at Mody University of Science and Technology, also pursuing a Data Science & AI certificate from IIT Jodhpur.\n\nI love turning ideas into apps, especially community-focused tech, and I bring a designer's eye from my work in the university Journalism Society, Illustrator, Premiere Pro, Figma, and Canva.`;

// ── Education ───────────────────────────────────────────────
export const education = [
  {
    degree: 'B.Tech Computer Science & Engineering',
    institution: 'Mody University of Science and Technology, Lakshmangarh',
    period: '2024–2028',
    icon: '🎓',
  },
  {
    degree: 'Certificate in Data Science & AI',
    institution: 'IIT Jodhpur',
    period: '2025–2026',
    detail: 'Year 1 completed',
    icon: '🤖',
  },
];

// ── Projects ────────────────────────────────────────────────
export const projects = [
  {
    id: 'refernest',
    name: 'ReferNest',
    description:
      'A neighborhood-based recommendation platform to rent out items and discover local services.',
    category: 'Apps',
    tags: ['React', 'Node.js', 'Community'],
    image: '/assets/projects/refernest.jpg',
    github: '#',
    demo: null,
  },
  {
    id: 'snap-split',
    name: 'Snap & Split',
    description:
      'Scan a restaurant bill, assign items to friends, calculate individual shares, and generate UPI payment links.',
    category: 'Apps',
    tags: ['Mobile', 'OCR', 'UPI'],
    image: '/assets/projects/snap-split.jpg',
    github: '#',
    demo: null,
  },
  {
    id: 'packmate',
    name: 'PackMate',
    description:
      'A Java/Spring Boot packing and to-buy checklist application, with plans to extend it to web and mobile.',
    category: 'Apps',
    tags: ['Java', 'Spring Boot'],
    image: '/assets/projects/packmate.jpg',
    github: '#',
    demo: null,
  },
  {
    id: 'ai-travel-agent',
    name: 'AI Travel Agent',
    description:
      'An AI-powered travel planner built using Streamlit, Python, Gemini API, and Google Maps/Places.',
    category: 'AI',
    tags: ['Python', 'Streamlit', 'Gemini API', 'Google Maps'],
    image: '/assets/projects/ai-travel.jpg',
    github: '#',
    demo: null,
  },
  {
    id: 'auralis',
    name: 'Auralis',
    description: 'A Siri-like intelligent voice assistant for Android.',
    category: 'AI',
    tags: ['Android', 'Voice AI', 'NLP'],
    image: '/assets/projects/auralis.jpg',
    github: '#',
    demo: null,
  },
  {
    id: 'medical-report',
    name: 'Medical Report Explainer',
    description:
      'A multilingual application that explains laboratory reports and prescriptions in understandable language.',
    category: 'AI',
    tags: ['Python', 'AI', 'Healthcare'],
    image: '/assets/projects/medical-report.jpg',
    github: '#',
    demo: null,
  },
  {
    id: 'doc-qa',
    name: 'Document Q&A Assistant',
    description:
      'A Python-based RAG application that lets users ask questions about documents.',
    category: 'AI',
    tags: ['Python', 'RAG', 'LLM'],
    image: '/assets/projects/doc-qa.jpg',
    github: '#',
    demo: null,
  },
  {
    id: 'claude-clone',
    name: 'Claude Clone',
    description: 'A free Claude-like AI chat application.',
    category: 'AI',
    tags: ['AI', 'Chat', 'LLM'],
    image: '/assets/projects/claude-clone.jpg',
    github: '#',
    demo: null,
  },
  {
    id: 'redis-clone',
    name: 'Redis Clone',
    description: 'A Redis-inspired implementation using Java.',
    category: 'Dev Tools',
    tags: ['Java', 'Database', 'Systems'],
    image: '/assets/projects/redis-clone.jpg',
    github: '#',
    demo: null,
  },
  {
    id: 'ai-coding-agent',
    name: 'AI Coding Agent',
    description:
      'A command-line AI coding assistant inspired by Claude Code.',
    category: 'Dev Tools',
    tags: ['CLI', 'AI', 'Developer Tools'],
    image: '/assets/projects/ai-coding-agent.jpg',
    github: '#',
    demo: null,
  },
  {
    id: 'linkedin-automation',
    name: 'LinkedIn Connection Automation',
    description:
      'A Python automation tool for LinkedIn connection workflows.',
    category: 'Dev Tools',
    tags: ['Python', 'Automation'],
    image: '/assets/projects/linkedin-auto.jpg',
    github: '#',
    demo: null,
  },
  {
    id: 'resume-3d',
    name: 'Resume-to-3D-Portfolio Generator',
    description:
      'An idea for transforming resumes into interactive 3D portfolio websites.',
    category: 'Web',
    tags: ['Three.js', 'React', '3D', 'Web'],
    image: '/assets/projects/resume-3d.jpg',
    github: '#',
    demo: null,
  },
];

// ── Experience ──────────────────────────────────────────────
export const experience = [
  {
    role: 'AI Virtual Intern',
    company: 'IBM',
    title: 'IBM Virtual Internship in Artificial Intelligence',
    period: 'June–August 2026',
    description:
      'Explored AI concepts, machine learning models, and IBM Watson tools.',
    icon: '🏢',
  },
  {
    role: 'AI & ML Intern',
    company: 'InternsElite',
    title: 'AI & ML Internship with Python',
    period: 'Summer 2026',
    description:
      'Hands-on internship focused on AI and ML projects with Python.',
    icon: '💻',
  },
];

// ── Skills ──────────────────────────────────────────────────
export const skills = {
  Programming: [
    { name: 'Python', icon: '🐍' },
    { name: 'Java', icon: '☕' },
  ],
  Development: [
    { name: 'Spring Boot', icon: '🍃' },
    { name: 'Streamlit', icon: '⚡' },
    { name: 'VS Code', icon: '💜' },
    { name: 'Git', icon: '🔀' },
    { name: 'GitHub', icon: '🐙' },
  ],
  'AI & Data': [
    { name: 'Gemini API', icon: '✨' },
    { name: 'Google Maps/Places API', icon: '🗺️' },
    { name: 'Machine Learning', icon: '🧠' },
    { name: 'Data Science', icon: '📊' },
  ],
  Creative: [
    { name: 'Adobe Illustrator', icon: '🎨' },
    { name: 'Adobe Premiere Pro', icon: '🎬' },
    { name: 'Figma', icon: '🖼️' },
    { name: 'Canva', icon: '🖌️' },
  ],
};

// ── Certifications ──────────────────────────────────────────
export const certifications = [
  {
    title: 'IBM Virtual Internship in Artificial Intelligence',
    issuer: 'IBM',
    image: '/assets/certificates/ibm-ai.jpg',
  },
  {
    title: 'Data Science & AI Certificate',
    issuer: 'IIT Jodhpur',
    image: '/assets/certificates/iit-jodhpur.jpg',
  },
  {
    title: 'AI & ML Internship Certificate',
    issuer: 'InternsElite',
    image: '/assets/certificates/internselite.jpg',
  },
];

// ── Creative Work ───────────────────────────────────────────
export const creativeWork = {
  description:
    'Mody University Journalism Society member since 2022. Graphic design, video editing, articles, and editorial work.',
  categories: ['Graphic Design', 'Video Editing', 'Articles', 'Editorial'],
  items: [
    {
      title: 'Magazine Cover Design',
      category: 'Graphic Design',
      image: '/assets/creative/design1.jpg',
      type: 'image',
    },
    {
      title: 'Event Poster Series',
      category: 'Graphic Design',
      image: '/assets/creative/design2.jpg',
      type: 'image',
    },
    {
      title: 'University Newsletter',
      category: 'Articles',
      image: '/assets/creative/article1.jpg',
      type: 'image',
    },
    {
      title: 'Event Highlight Reel',
      category: 'Video Editing',
      image: '/assets/creative/video1.jpg',
      type: 'video',
    },
    {
      title: 'Editorial Feature',
      category: 'Editorial',
      image: '/assets/creative/editorial1.jpg',
      type: 'image',
    },
    {
      title: 'Social Media Campaign',
      category: 'Graphic Design',
      image: '/assets/creative/design3.jpg',
      type: 'image',
    },
  ],
};

// ── Fandoms ─────────────────────────────────────────────────
export const fandomsData = {
  friends: {
    title: 'FRIENDS',
    subtitle: 'Could I BE any more of a fan?',
    theme: 'coffee-shop',
    color: '#F4A460',
    items: [
      {
        title: 'Central Perk Vibes',
        description: 'The one where everything started',
        icon: '☕',
      },
      {
        title: 'Lobster Theory',
        description: "She's his lobster!",
        icon: '🦞',
      },
      {
        title: 'Pivot!',
        description: 'PIVOT! PIVOT! PIVOT!',
        icon: '🛋️',
      },
      {
        title: "How You Doin'?",
        description: "Joey doesn't share food!",
        icon: '🍕',
      },
      {
        title: 'Unagi',
        description: "It's not a type of sushi",
        icon: '🥋',
      },
      {
        title: 'We Were On A Break',
        description: 'The eternal debate',
        icon: '💔',
      },
    ],
  },
  f1: {
    title: 'FORMULA 1',
    subtitle: 'Lights out and away we go!',
    theme: 'racing',
    color: '#E10600',
    items: [
      {
        title: 'Race Day',
        description: 'The thrill of the start',
        icon: '🏎️',
      },
      {
        title: 'Pit Stop Strategy',
        description: 'Milliseconds matter',
        icon: '⏱️',
      },
      {
        title: 'Podium Finish',
        description: 'The champagne moment',
        icon: '🏆',
      },
      {
        title: 'Night Race',
        description: 'Under the lights',
        icon: '🌙',
      },
      {
        title: 'DRS Zone',
        description: 'Overtake opportunity',
        icon: '💨',
      },
      {
        title: 'Chequered Flag',
        description: 'The final lap',
        icon: '🏁',
      },
    ],
  },
  singers: {
    title: 'MY FAVOURITE SINGERS',
    subtitle: 'The soundtrack of my life',
    theme: 'music',
    color: '#B9A2E8',
    items: [
      {
        title: 'Lost in Melody',
        description: 'When music speaks',
        icon: '🎵',
      },
      {
        title: 'Concert Dreams',
        description: 'One day...',
        icon: '🎤',
      },
      {
        title: 'Album on Repeat',
        description: "Can't stop listening",
        icon: '🔁',
      },
      {
        title: 'Lyrics That Hit',
        description: 'Words that resonate',
        icon: '📝',
      },
      {
        title: 'Vinyl Collection',
        description: 'Old school appreciation',
        icon: '💿',
      },
      {
        title: 'Music Discovery',
        description: 'Always exploring new sounds',
        icon: '🎧',
      },
    ],
  },
};

// ── Navigation ──────────────────────────────────────────────
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Fandoms', href: '#fandoms' },
  { label: 'Contact', href: '#contact' },
];
