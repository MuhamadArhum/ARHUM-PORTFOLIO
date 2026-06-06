import { Project, Experience, Skill } from './types';

export const PERSONAL_INFO = {
  name: 'Muhammad Arhum',
  title: 'Full Stack Developer and AI Engineer',
  email: 'muhamadarhum425@gmail.com',
  github: 'https://github.com', // Placeholder for user customization
  linkedin: 'https://www.linkedin.com/in/muhamad-arhum-5423aa198/', // Placeholder for user customization
  bioBrief: 'I engineer high-performance, visually polished, and scalable web and mobile applications from scratch. Combining robust system architecture with pixel-perfect visual execution.',
  bioDetailed: 'I am a passionate software engineer specializing in modern full-stack architectures. Over the past several years, I have built web apps, REST & GraphQL APIs, distributed database systems, and cross-platform mobile experiences. I thrive on solving complex technical challenges, optimization bottlenecks, and crafting user experiences that feel intuitive, interactive, and fast.',
  availability: 'Available for Select Contracts & High-Impact Roles',
  timezone: 'UTC+5', // Standard Pakistan Time area (or matching email region)
  offsetHours: 5,
  location: 'Faisalabad, Pakistan',
  resumeUrl: '#',
};

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'TypeScript', category: 'frontend', level: 95 },
  { name: 'React (18/19)', category: 'frontend', level: 92 },
  { name: 'Next.js', category: 'frontend', level: 90 },
  { name: 'Tailwind CSS', category: 'frontend', level: 98 },
  { name: 'Motion / Framer', category: 'frontend', level: 88 },
  
  // Backend
  { name: 'Node.js / Express', category: 'backend', level: 94 },
  { name: 'NestJS', category: 'backend', level: 85 },
  { name: 'Python / Django / FastAPI', category: 'backend', level: 88 },
  { name: 'PostgreSQL / SQL', category: 'backend', level: 90 },
  { name: 'Redis', category: 'backend', level: 82 },
  { name: 'MongoDB', category: 'backend', level: 88 },

  // Mobile
  { name: 'Flutter & Dart', category: 'mobile', level: 92 },
  { name: 'React Native', category: 'mobile', level: 82 },

  // Cloud & DevOps
  { name: 'Docker / Containers', category: 'cloud', level: 88 },
  { name: 'Google Cloud (GCP)', category: 'cloud', level: 85 },
  { name: 'AWS (S3, EC2, Lambda)', category: 'cloud', level: 82 },
  { name: 'CI/CD Pipelines (GitHub Actions)', category: 'cloud', level: 86 },

  // Tools
  { name: 'Git & GitHub', category: 'tools', level: 95 },
  { name: 'REST & GraphQL APIs', category: 'tools', level: 93 },
  { name: 'REST API Performance Tuning', category: 'tools', level: 90 },
  { name: 'Linux System Administration', category: 'tools', level: 80 },
];

export const PROJECTS: Project[] = [
  {
    id: 'hyperscale-gateway',
    title: 'HyperScale Gateway',
    description: 'A cloud-native high-throughput API gateway written in Rust with Node.js sidecar controls.',
    longDescription: 'HyperScale is a high-performance web proxy and API gateway designed to orchestrate services in containerized clusters. It features modular hot-reload routing, custom rate-limiting middleware, geo-aware routing, JSON web token parsing in under 12 microseconds, and instant caching using a Redis-compliant memory store.',
    tags: ['Rust', 'Node.js', 'Redis', 'Docker', 'gRPC'],
    category: 'Systems',
    image: 'https://picsum.photos/seed/gateway/800/600',
    highlights: [
      'Successfully handles 10,000+ concurrent requests with sub-millisecond response latencies.',
      'Developed low-level JWT cryptographic decoding, reducing auth latency by over 80%.',
      'Implemented reactive cluster synchronization via Redis Pub/Sub channels.',
    ],
  },
  {
    id: 'synthetix-canvas',
    title: 'Synthetix Collaborative Canvas',
    description: 'A real-time vector graphics whiteboard and layout tool featuring instant synchronization and layer tree.',
    longDescription: 'Synthetix is an interactive, browser-based collaborative design platform. Built atop canvas APIs and a custom WebSocket sync protocol, it allows teams to map out architectures, draw custom vectors, manipulate layered compositions, and export assets, all with zero-latency synchronization and complete undo-history replication.',
    tags: ['React', 'TypeScript', 'WebSockets', 'Canvas API', 'Motion'],
    category: 'Full-Stack',
    image: 'https://picsum.photos/seed/canvas/800/600',
    highlights: [
      'Engineered state-reconciliation algorithm resolving concurrent vector conflicts on the fly.',
      'Constructed modular hierarchy system allowing full group, lock, and layer re-ordering of elements.',
      'Integrated canvas viewport virtualization supporting 500k+ elements with smooth 60fps pan/zoom.',
    ],
  },
  {
    id: 'cognitive-ai-copilot',
    title: 'Cognitive Code Indexer & Copilot',
    description: 'A semantic code indexing and context search engine powered by Gemini embeddings and vector DB.',
    longDescription: 'Cognitive is an intelligent development assistant that crawls local and cloud-based repositories, parses them into semantic chunks, generates vector embeddings, and aggregates relevant knowledge to provide contextual code answers, unit test suggestions, and documentation references instantly.',
    tags: ['FastAPI', 'Python', 'Gemini API', 'PostgreSQL', 'pgvector'],
    category: 'AI',
    image: 'https://picsum.photos/seed/copilot/800/600',
    highlights: [
      'Crafted AST (Abstract Syntax Tree) recursive parser to segment files into context-conserving pieces.',
      'Utilized pgvector for high-performance indexing, reducing semantic search times to under 150ms.',
      'Built interactive question-answering UI with chat history, references, and code playgrounds.',
    ],
  },
  {
    id: 'aerofit-health',
    title: 'AeroFit Cross-Platform Mobile Suite',
    description: 'An expansive fitness, routine tracking, and hydration application built with Dart and Flutter.',
    longDescription: 'AeroFit is a fully featured visual lifestyle companion application. It employs dynamic SVG custom charting, offline SQLite caching pipelines, biometric lock authentication, and background thread notification engines to keep users updated on their fitness goals, recovery times, and active streaks.',
    tags: ['Flutter', 'Dart', 'SQLite', 'Charts', 'CoreAnimation'],
    category: 'Mobile',
    image: 'https://picsum.photos/seed/fitness/800/600',
    highlights: [
      'Surpassed 50k+ user downloads with top reviews on responsiveness and sleek typography.',
      'Implemented custom SQLite syncing mechanism maintaining full offline usability.',
      'Designed bespoke animation curves and lightweight transition layouts with zero frame drops.',
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp1',
    role: 'CEO',
    company: 'AbyteSol',
    period: '2025 - Present',
    description: [
      'Leading overall product vision, system architecture, and tech development to construct high-performance digital environments.',
      'Integrating advanced generative artificial intelligence models (such as Gemini 1.5/2.0 API frameworks) with secure enterprise workflows.',
      'Directing agile development protocols, mentoring software developers, and engineering scalable cloud solutions.'
    ],
    tags: ['Leadership', 'System Architecture', 'Generative AI', 'Full Stack', 'Cloud'],
  },
  {
    id: 'exp2',
    role: 'Full Stack Engineer',
    company: 'Komyosys',
    period: '2023 - Present',
    description: [
      'Engineering secure and highly optimized full-stack web solutions utilizing modern web technologies, React, and Node.js.',
      'Developing seamless integrations, responsive user interfaces, and modular backend API gateways with optimized databases.',
      'Collaborating closely with clients and development teams to model clean components and establish rapid automated testing pipelines.'
    ],
    tags: ['React', 'Node.js', 'Express', 'TypeScript', 'SQL', 'PostgreSQL'],
  },
  {
    id: 'exp3',
    role: 'Associate Software Engineer',
    company: 'AppVibe Studio',
    period: '2020 - 2022',
    description: [
      'Built server side REST APIs in node/express and coordinated client side consumption via clean responsive components.',
      'Boosted overall unit test coverage from 45% to 92% by initiating rigorous Jest and Cypress pipelines, ensuring robust code quality.',
      'Contributed to system optimization and asset pipeline loading speeds, resulting in 20% faster initial paint times.',
    ],
    tags: ['Node.js', 'Express', 'React', 'MongoDB', 'Jest', 'Cypress'],
  },
];

// Context prompt template for his AI Gemini Twin Chat
export const AI_TWIN_SYSTEM_PROMPT = `
You are the AI Twin of Muhammad Arhum, representing him on his professional portfolio portal.
Your tone should be professional, welcoming, highly developer-competent, crisp, and articulate.
You should act exactly as Arhum: a Full Stack Developer and AI Engineer.

Here are the authentic details of Muhammad Arhum to refer to:
- Name: Muhammad Arhum
- Role: Full Stack Developer and AI Engineer
- Email: muhamadarhum425@gmail.com
- Profile: CEO of AbyteSol and Full Stack Engineer at Komyosys. Highly skilled in frontend framework designs, modular Node.js/Python architectures, scalable Cloud nodes, and beautiful Flutter hybrid mobile frameworks.
- Specialty: Excellent modularity, performance optimizations, clean interface graphics, robust DB indexing, and solid systems.
- Core Tech Stack:
  * Frontend: React 18/19, Next.js, TypeScript, Tailwind CSS, Motion/Framer.
  * Backend: Node.js, Express, NestJS, Python (FastAPI, Django), PostgreSQL/SQL, MongoDB, Redis.
  * Mobile: Flutter & Dart, React Native.
  * DevOps: Docker, Google Cloud (GCP), AWS, GitHub Actions.
- Personal Qualities: Meticulous about architecture, has a great eye for design, responsive communicator, and proactive problem solver.
- Location: Faisalabad, Pakistan (Local timezone: UTC+5, Pakistan Standard Time).
- Availability: Open to elite freelance options, high-level remote roles, and technical co-founder opportunities.

Rules for Answers:
1. Always state that you are Arhum's "AI Twin" or "AI Assistant". Keep the tone friendly, confident, and helpful.
2. Rely strictly on Arhum's skills and experiences listed above. If asked about technologies not listed (e.g. C++), mention that Arhum is proficient in systems programming (like Rust/Node) but enjoys expanding his stack, and state his strong core stack securely.
3. Keep answers concise (< 3 brief paragraphs if possible) and use clean spacing or bullet points. Use code blocks when describing his technical solutions.
4. If a visitor wants to contact or hire him: direct them to his email address (muhamadarhum425@gmail.com) and the contact form on his page.
5. Avoid sounding robotic, avoid generic template corporate phrases, and speak with authentic engineering insight!
`;
