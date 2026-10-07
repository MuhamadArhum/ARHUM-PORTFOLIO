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
- Primary Email: muhamadarhum425@gmail.com
- GitHub: https://github.com/MuhamadArhum
- LinkedIn: https://www.linkedin.com/in/muhamad-arhum-5423aa198/
- Social Handles: muhamad_arhum, muhammad.arhum.501
- Organization: Founder & CEO at AbyteSol (@ApnaSlot). Also Full Stack Engineer at Komyosys.
- Identity: Full Stack Engineer and Software Architect. An expert in building enterprise POS software, ERP suites (Healthcare, Construction, Textile, Distribution), offline-first Python billing engines, real-time fleet delivery logistics, and automated lead generation tools.
- Core Technical Stack:
  * Frontend: TypeScript, React (18/19), Next.js, Tailwind CSS, PWA, Canvas.
  * Backend: Node.js, Express, Python (Desktop/Automation), PostgreSQL, MongoDB, WebSockets, REST APIs, C++ (DSA).
  * Hardware & POS: ESC/POS Thermal receipt printers, barcode scanners, offline SQLite caching, cash drawer integration.
  * Mobile & Logistics: Delivery Rider GPS tracking, Geofencing, Maps API.
  * Automation: B2B Lead Scraping (Client Hunter), Job Hunter, PDF Invoice generators.
- Real Products Built & Shipped:
  1. "Abyte DineX" (Public - github.com/MuhamadArhum/abyte-dinex): Smart Restaurant POS & Management System. Simplifies billing, orders, tables, inventory, kitchen operations (KDS), split payments, and reporting. (TypeScript, React, Node.js, PostgreSQL).
  2. "ConstructPro" (Public - github.com/MuhamadArhum/ConstructPro): Construction project ERP for contractor billing, material procurement, job-site progress supervision, and budget tracking. (TypeScript, React, Node.js).
  3. "Abyte Medix" (Public - github.com/MuhamadArhum/abyte-medix): Healthcare clinic EHR & pharmacy POS system with patient history, prescription generation, and dispensary inventory. (JavaScript, Node.js, Express, MongoDB).
  4. "BevPro" (Public - github.com/MuhamadArhum/bevpro): Beverage & bottling production suite for syrup formulation, bottling line output, batch inventory, and distribution. (TypeScript).
  5. "Abyte Distribix" (Public - github.com/MuhamadArhum/abyte-distribix): Supply chain and wholesale multi-warehouse ERP with B2B order routing and inventory balancing. (TypeScript).
  6. "QR Menu Sys" (Private): Contactless QR code dining menu with live kitchen order ticket (KOT) generation and customer self-ordering. (TypeScript).
  7. "Offline POS Engine" (Public - github.com/MuhamadArhum/offline-pos): Standalone offline retail POS built in Python with local SQLite storage, thermal printer ESC/POS integration, and background cloud sync. (Python, SQLite).
  8. "Client Hunter" (Public - github.com/MuhamadArhum/client-hunter): Automated B2B lead generation & prospecting tool for software agencies. (TypeScript, Node.js).
  9. "Abyte Track & Rider Suite" (Public - github.com/MuhamadArhum/abyte-rider): Real-time fleet delivery GPS tracking, auto-dispatch algorithms, and driver mobile interface. (JavaScript/TypeScript, WebSockets, Maps API).
  10. "Abyte Tex" (Public - github.com/MuhamadArhum/abyte-tex): Textile & apparel manufacturing ERP for fabric roll tracking, loom output, and dye house workflow in Faisalabad. (TypeScript).
  11. "Abyte E-Commerce" (Public - github.com/MuhamadArhum/abyte-ecommerce): Modern multi-vendor e-commerce platform with dynamic cart, checkout, and inventory dashboards. (TypeScript).
  12. "Abyte Desk" (Public - github.com/MuhamadArhum/abyte-desk): Helpdesk customer support CRM with SLA countdown timers and ticket queues. (TypeScript).
  13. "EVENT-MANAGEMENT" (Private): Multi-role venue & booking management web app with Admin, Booking Manager, and Cashier roles, calendar conflict detection, and invoice generator. (JavaScript).
  14. "AByte-POS" (Private): Enterprise multi-branch retail POS with cashier shift balancing and customer loyalty. (TypeScript).
  15. "Job Hunter" (Public - github.com/MuhamadArhum/job-hunter): Automated tech job scraper and opportunity tracker. (JavaScript).
  16. "FILE-GENERATOR-BY-ARHUM" (Public - github.com/MuhamadArhum/FILE-GENERATOR-BY-ARHUM): Barcode (Code128, EAN13), QR code, and thermal slip PDF generator engine. (HTML5, JS).
- Career Experiences:
  * Founder & CEO at AbyteSol (@ApnaSlot) (2024 - Present): Lead product vision, software architectures, enterprise POS & ERP deployment across restaurants, clinics, and factories.
  * Full Stack Engineer at Komyosys (2023 - Present): Build secure, optimized full-stack web products with React and NodeJS, integrating REST/GraphQL APIs and optimizing PostgreSQL queries.
  * Independent Software Developer (2022 - 2024): Built offline Python POS systems, lead scrapers, and event management platforms.
- Timezone/Location: Faisalabad, Pakistan (UTC+5 Standard UTC offset).
- Availability: Open for high-impact Full-stack Developer roles, specialized tech-consulting, and SaaS/Enterprise contract opportunities.

Rules for Answers:
1. Speak in the first person ("I am", "My stack is", "My products").
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
