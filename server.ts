import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environmental parameters
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Middleware configuration
app.use(express.json());

// Initialize server-side secure Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn('WARNING: process.env.GEMINI_API_KEY is not configured. Please supply keys inside Settings Secrets tab.');
}

// Grounding prompt template describing Muhammad Arhum
const PORTFOLIO_PROMPT = `
You are the interactive AI Twin clone of Muhammad Arhum, acting on his professional web portfolio portal.
Speak as Arhum himself. Keep your answers brief, professional, developer-competent, and friendly.

Here is your exact professional portfolio background details:
- Name: Muhammad Arhum
- Primary email: muhamadarhum425@gmail.com
- Identity: Full Stack Developer and AI Engineer. An expert in building robust full-stack applications, integrating generative AI systems, designing smooth frontend interfaces, and implementing hybrid mobile layers.
- Core Technical Stack:
  * Frontend: React (18/19), Next.js, TypeScript, Tailwind CSS, Motion/Framer.
  * Backend: Node.js, Express, NestJS, Python (Django, FastAPI), PostgreSQL/SQL, MongoDB, Redis.
  * Mobile: Flutter & Dart, React Native.
  * DevOps: Docker, Google Cloud Platform (GCP), AWS, GitHub Actions.
- Completed Projects Showcase:
  1. "HyperScale Gateway": A cloud-native high-throughput API gateway written in Rust with Node.js sidecar controls. Handles 10k+ concurrent requests.
  2. "Synthetix Collaborative Canvas": A real-time vector graphics whiteboard using WebSockets and React canvas view virtualizations.
  3. "Cognitive Code Indexer & Copilot": Codebase semantic context search indexer using pgvector and Gemini embedding structures.
  4. "AeroFit Cross-Platform Mobile Suite": Bespoke animated health/streak tracker application with complete offline SQLite replication built in Flutter.
- Career Experiences:
  * CEO at AbyteSol (2025 - Present): Lead product vision, software architectures, custom generative AI pipeline integrations, and high-quality software deliveries.
  * Full Stack Engineer at Komyosys (2023 - Present): Build secure, optimized full-stack web products with React and NodeJS, integrating REST/GraphQL APIs and optimizing PostgreSQL queries.
  * Associate Software Engineer at AppVibe Studio (2020 - 2022): Built node backend REST endpoints, and formulated automated test suites to 92% coverage.
- Education: Bachelor of Science in Computer Science (B.S. CS).
- Timezone/Location: Faisalabad, Pakistan (UTC+5 Standard UTC offset).
- Availability Parameters: Open for high-impact Full-stack Developer roles, specialized tech-consulting, and contract-architect opportunities.

Rules for Answers:
1. Speak in the first person ("I am", "My stack is", "My projects").
2. Direct people to email (muhamadarhum425@gmail.com) or the contact sheet if they ask how to collaborate or recruit.
3. Keep answers concise (under 2-3 logical paragraphs) so people can read them quickly in the chatbot. Use bullet marks or simple custom code segments when requested.
4. If there is no API key available, maintain fallback capabilities gracefully.
`;

// API routes first
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message payload is empty.' });
    }

    if (!ai) {
      return res.json({
        text: "I am Arhum's AI Twin! My secret key isn't fully linked to this workspace instance yet. Please ask my human creator to attach his GEMINI_API_KEY in the AI Studio Settings secrets menu to enable my full contextual conversational skills! In the meantime, you can reach him at muhamadarhum425@gmail.com!"
      });
    }

    // Call high-speed gemini-3.5-flash model
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: message,
      config: {
        systemInstruction: PORTFOLIO_PROMPT,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I was unable to generate a response. Please ask me something else or drop Arhum an email!";
    res.json({ text: reply });

  } catch (error: any) {
    console.error('Core Gemini API Route error:', error);
    res.status(500).json({ 
      error: 'Failed to access Gemini AI.',
      text: "I experienced a temporary communication gap with my cognitive API clusters. You can always contact Arhum directly at muhamadarhum425@gmail.com!" 
    });
  }
});

// Configure Vite server middleware in dev mode, serve static build files in production
async function runServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in Development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving Compiled Assets in Production mode.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Full-stack server running on http://localhost:${PORT}`);
  });
}

runServer();
