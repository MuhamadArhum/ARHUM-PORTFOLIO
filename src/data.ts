import { Project, Experience, Skill } from './types';

export const PERSONAL_INFO = {
  name: 'Muhammad Arhum',
  title: 'Full Stack Engineer & Software Architect',
  email: 'muhamadarhum425@gmail.com',
  github: 'https://github.com/MuhamadArhum',
  linkedin: 'https://www.linkedin.com/in/muhamad-arhum-5423aa198/',
  instagram: 'https://instagram.com/muhamad_arhum',
  organization: '@ApnaSlot / AbyteSol',
  bioBrief: 'Founder & CEO at AbyteSol and lead architect behind the ApnaSlot enterprise ecosystem. Engineering real-world POS suites, hospital EHRs, construction ERPs, offline systems, and automation engines.',
  bioDetailed: 'I am a passionate software engineer and founder specializing in building production-grade enterprise software suites and SaaS products. My built ecosystem includes Abyte DineX (Smart Restaurant POS), ConstructPro (Construction ERP), Abyte Medix (Hospital & Pharmacy ERP), BevPro (Beverage Bottling Suite), Abyte Distribix (Wholesale Logistics ERP), offline-first Python desktop POS systems, real-time fleet GPS tracking dispatchers, and automated B2B client acquisition engines. I bridge system engineering, database resilience, and user experience to deliver scalable software.',
  availability: 'Available for Enterprise Solutions, SaaS & Contract Roles',
  timezone: 'UTC+5',
  offsetHours: 5,
  location: 'Faisalabad, Pakistan',
  avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS177eJI0gBSWHtv3DvOIo2ifl4-kAD86Xiz_xzpvVHCw&s=10',
  resumeUrl: '#',
};

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'TypeScript', category: 'frontend', level: 96 },
  { name: 'React (18/19)', category: 'frontend', level: 95 },
  { name: 'Next.js', category: 'frontend', level: 90 },
  { name: 'Tailwind CSS', category: 'frontend', level: 98 },
  { name: 'PWA & Responsive UI', category: 'frontend', level: 92 },
  
  // Backend & Architecture
  { name: 'Node.js & Express', category: 'backend', level: 95 },
  { name: 'Python (Desktop/Automation)', category: 'backend', level: 90 },
  { name: 'PostgreSQL & SQL', category: 'backend', level: 92 },
  { name: 'MongoDB', category: 'backend', level: 90 },
  { name: 'WebSockets & Real-Time Sync', category: 'backend', level: 92 },
  { name: 'C++ (DSA & Core Systems)', category: 'backend', level: 85 },

  // Specialized POS & Systems
  { name: 'POS Hardware & ESC/POS Printing', category: 'tools', level: 94 },
  { name: 'Offline-First DB Sync (SQLite)', category: 'backend', level: 92 },
  { name: 'Barcode & Thermal Label Engines', category: 'tools', level: 95 },
  { name: 'Multi-Role RBAC & Access Control', category: 'backend', level: 94 },

  // Mobile & Logistics
  { name: 'Delivery GPS & Rider Tracking', category: 'mobile', level: 90 },
  { name: 'Mobile Web & Flutter Hybrid', category: 'mobile', level: 88 },
  { name: 'Geofencing & Route Optimization', category: 'mobile', level: 88 },

  // Automation & Cloud
  { name: 'Web Scraping & Lead Enrichment', category: 'tools', level: 94 },
  { name: 'Docker & Containerization', category: 'cloud', level: 88 },
  { name: 'CI/CD & Git/GitHub Automation', category: 'tools', level: 96 },
  { name: 'Cloud APIs & Payment Gateways', category: 'cloud', level: 90 },
];

export const PROJECTS: Project[] = [
  {
    id: 'abyte-dinex',
    title: 'Abyte DineX — Restaurant POS & Management Suite',
    description: 'A smart Restaurant POS & Management System simplifying billing, orders, tables, inventory, kitchen operations, and financial reporting.',
    longDescription: 'Abyte DineX is a flagship smart restaurant operating platform built for modern eateries, cafes, and multi-branch food chains. It integrates real-time floor plan table management, kitchen display system (KDS) order routing with sub-second websocket delivery, ingredient-level recipe inventory depletion, waiter handheld order taking, split billing, customer loyalty, and end-of-day Z-report generation.',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'WebSockets', 'POS Engine'],
    category: 'POS & SaaS',
    repoType: 'Public',
    org: '@ApnaSlot / AbyteSol',
    github: 'https://github.com/MuhamadArhum/abyte-dinex',
    featured: true,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Visual floor map builder with live table status (Occupied, Billed, Reserved, Free).',
      'Instant Kitchen Display System (KDS) eliminating paper order confusion.',
      'Recipe-level inventory tracking: automatic stock reduction upon every plate ordered.',
      'Multi-currency, split bills, discount authorizations, and daily cashier cash-drop audits.',
    ],
  },
  {
    id: 'constructpro',
    title: 'ConstructPro — Construction Project & Contractor ERP',
    description: 'Comprehensive construction project ERP for contractor billing, material procurement, job-site supervision, and multi-phase budget tracking.',
    longDescription: 'ConstructPro is an enterprise-grade construction management software designed for general contractors, site supervisors, and civil developers. It tracks multi-phase architectural milestones, subcontractor daily payroll and hour logs, equipment allocation, bulk material procurement requisitions with approval chains, and on-site inspection issue logs.',
    tags: ['TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'SQL', 'Enterprise ERP'],
    category: 'Enterprise ERP',
    repoType: 'Public',
    org: 'AbyteSol',
    github: 'https://github.com/MuhamadArhum/ConstructPro',
    featured: true,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Multi-site contractor milestone monitoring with percentage-completion cost auditing.',
      'Subcontractor shift & wage calculation, machinery fuel and run-time tracking.',
      'Material requisition workflows with vendor purchase order dispatch and bill verification.',
      'Role-based site logs accessible directly from mobile devices on construction grounds.',
    ],
  },
  {
    id: 'abyte-medix',
    title: 'Abyte Medix — Clinical EHR & Pharmacy ERP',
    description: 'Healthcare hospital & clinic management system integrating electronic health records (EHR), OPD appointments, and pharmacy point of sale.',
    longDescription: 'Abyte Medix is a comprehensive digital health records (EHR) and clinical administration suite. Developed for outpatient clinics, polyclinics, and community hospitals, it streamlines patient intake, doctor OPD appointment queues, electronic prescription generation, integrated multi-counter pharmacy dispensary billing with batch expiry tracking, and diagnostic test referrals.',
    tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'EHR', 'Healthcare'],
    category: 'Enterprise ERP',
    repoType: 'Public',
    org: 'AbyteSol',
    github: 'https://github.com/MuhamadArhum/abyte-medix',
    featured: true,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'End-to-end patient clinical records, consultation logs, and medical history vault.',
      'Integrated pharmacy POS with drug barcode scanning and automated near-expiry alerts.',
      'Token-based patient queue management for doctor consultation chambers.',
      'Consolidated diagnostic invoicing and insurance billing reporting.',
    ],
  },
  {
    id: 'bevpro',
    title: 'BevPro — Beverage Production & Bottling ERP',
    description: 'Beverage and bottling manufacturing suite managing syrup formulation, batch processing, bottle line throughput, and warehouse stock.',
    longDescription: 'BevPro is a specialized manufacturing and inventory ERP for beverage, mineral water, and bottling plants. It tracks bulk syrup formulation recipes, CO2/sweetener ingredient yield calculations, automated filling line bottle counts, reject batch logging, and distribution logistics across wholesale distributor accounts.',
    tags: ['TypeScript', 'Full-Stack', 'Node.js', 'Manufacturing ERP', 'REST APIs'],
    category: 'Enterprise ERP',
    repoType: 'Public',
    org: 'AbyteSol',
    github: 'https://github.com/MuhamadArhum/bevpro',
    featured: true,
    image: 'https://images.unsplash.com/photo-1584441405886-bc91be61e56a?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Recipe formulation management with raw ingredient yield and cost per crate analysis.',
      'High-speed bottling line production tracking with shift output metrics.',
      'Lot tracking and barcode identification for quality inspection and recall compliance.',
      'Wholesale distributor crate order dispatch and delivery reconciliation.',
    ],
  },
  {
    id: 'abyte-distribix',
    title: 'Abyte Distribix — Supply Chain & Multi-Depot ERP',
    description: 'Supply chain and wholesale multi-warehouse ERP facilitating B2B orders, stock rebalancing, delivery routes, and supplier accounts.',
    longDescription: 'Abyte Distribix empowers wholesale distributors and multi-depot supply networks. It centralizes inventory across multiple regional warehouses, manages supplier purchase orders, bulk pricing matrices with customized dealer credit terms, automated replenishment triggers, and delivery truck route manifests.',
    tags: ['TypeScript', 'React', 'Node.js', 'Supply Chain', 'PostgreSQL'],
    category: 'Enterprise ERP',
    repoType: 'Public',
    org: 'AbyteSol',
    github: 'https://github.com/MuhamadArhum/abyte-distribix',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Multi-warehouse stock balancing with automated inter-depot transfer requests.',
      'Tiered wholesale customer pricing, volume discounts, and receivables ledger.',
      'Van sale delivery routing and digital driver delivery confirmation slips.',
    ],
  },
  {
    id: 'qr-menu-sys',
    title: 'QR Menu Sys — Contactless Dining & Digital Orders',
    description: 'Interactive contactless QR code dining menu with customer self-ordering, real-time kitchen ticket generation, and instant bill sync.',
    longDescription: 'A high-speed contactless restaurant ordering system where guests scan a unique table QR code on their smartphone to browse dynamic rich menus, customize meal modifiers, place orders straight into the kitchen KDS, and request staff service without waiting for a printed menu.',
    tags: ['TypeScript', 'React', 'WebSockets', 'Node.js', 'PWA', 'POS'],
    category: 'POS & SaaS',
    repoType: 'Private',
    org: '@ApnaSlot',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Zero app download required: instant lightweight mobile web interface on phone scan.',
      'Live bidirectional WebSocket connection updating kitchen screens in under 200ms.',
      'Dynamic modifier selection (spiciness, extra toppings, dietary tags) with instant pricing.',
      'Digital bill preview and waiter call assistance button.',
    ],
  },
  {
    id: 'offline-pos',
    title: 'Offline POS Engine — Desktop Python Billing Suite',
    description: 'High-reliability offline retail point-of-sale built in Python with local SQLite storage, thermal printer ESC/POS support, and cloud sync.',
    longDescription: 'Engineered specifically for brick-and-mortar retail counters facing unstable internet connectivity. This standalone desktop POS runs with zero network dependencies, executing rapid barcode lookups, instantaneous ESC/POS receipt generation, cash drawer kicks, and queuing all transactions locally in SQLite until cloud connectivity resumes.',
    tags: ['Python', 'SQLite', 'Desktop UI', 'ESC/POS Thermal', 'Hardware APIs'],
    category: 'Automation & Tools',
    repoType: 'Public',
    org: 'Independent',
    github: 'https://github.com/MuhamadArhum/offline-pos',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      '100% resilient operation: guarantees billing continuity during internet outages.',
      'Direct USB and COM port integration for 58mm & 80mm thermal receipt printers.',
      'Automated background reconciliation engine syncing local sales to cloud APIs.',
      'Blazing fast sub-second barcode scanner read-and-add execution.',
    ],
  },
  {
    id: 'client-hunter',
    title: 'Client Hunter — B2B Lead Scraping & Acquisition',
    description: 'Automated prospective client discovery and intelligence platform for tech agencies, scraping target domains and finding verified decision-makers.',
    longDescription: 'An automated B2B prospecting tool developed to help software agencies and tech freelancers acquire clients. It monitors search engines and specialized business registries, extracts contact emails, performs SMTP handshake validations, enriches company profiles, and organizes outreach leads into an actionable CRM pipeline.',
    tags: ['TypeScript', 'Node.js', 'Web Scraping', 'Automation', 'Data Enrichment'],
    category: 'Automation & Tools',
    repoType: 'Public',
    org: 'Independent',
    github: 'https://github.com/MuhamadArhum/client-hunter',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Automated domain prospecting across industry niches and technological requirements.',
      'Email syntax and live SMTP validation to ensure zero delivery bounce rates.',
      'Structured lead export into CSV/JSON format ready for outbound campaigns.',
    ],
  },
  {
    id: 'abyte-track-rider',
    title: 'Abyte Track & Rider Suite — Real-Time Fleet GPS',
    description: 'Fleet delivery management engine featuring real-time rider GPS tracking, auto-dispatch algorithms, geofenced zones, and mobile rider interface.',
    longDescription: 'A complete delivery logistics and courier dispatch suite. Integrates a web dispatch control tower with mobile rider interfaces, providing live location pings, algorithmic order dispatch based on driver proximity, turn-by-turn route suggestions, and interactive real-time tracking links for end customers.',
    tags: ['JavaScript', 'TypeScript', 'Node.js', 'WebSockets', 'Maps API', 'Fleet'],
    category: 'Mobile & Logistics',
    repoType: 'Public',
    org: 'AbyteSol',
    github: 'https://github.com/MuhamadArhum/abyte-rider',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Live rider coordinate streaming via low-latency WebSocket connection.',
      'Proximity-based auto-assignment algorithm matching active riders to ready orders.',
      'Customer-facing live delivery tracking screen with realistic ETA calculation.',
      'Digital proof of delivery with customer signature and photo attachment.',
    ],
  },
  {
    id: 'abyte-tex',
    title: 'Abyte Tex — Textile & Apparel Mill Manufacturing ERP',
    description: 'Specialized manufacturing ERP built for textile spinning, weaving, and dye mills—tracking yarn lots, fabric rolls, and export packaging.',
    longDescription: 'Tailored for the textile manufacturing heartland of Faisalabad, Abyte Tex manages the entire lifecycle of fabric production. From raw yarn procurement and warping to weaving loom efficiency logs, batch dyeing chemistry records, finished cloth inspection quality grading, and export container packing lists.',
    tags: ['TypeScript', 'React', 'Node.js', 'Industrial ERP', 'PostgreSQL'],
    category: 'Enterprise ERP',
    repoType: 'Public',
    org: 'AbyteSol',
    github: 'https://github.com/MuhamadArhum/abyte-tex',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Roll-by-roll barcode tracking with weight, width, and quality grade classification.',
      'Weaving loom operational shift monitoring and downtime logging.',
      'Batch formulation recipe tracking for dye house color consistency.',
      'Export packing list, bill of lading, and commercial customs invoice builder.',
    ],
  },
  {
    id: 'abyte-ecommerce',
    title: 'Abyte E-Commerce — Modern Multi-Vendor Platform',
    description: 'Scalable multi-vendor e-commerce web platform with optimized product catalogs, cart state management, checkout gateways, and merchant portals.',
    longDescription: 'A scalable full-stack e-commerce engine designed for high product volume and instant page transitions. Features a responsive storefront, dynamic SKU variant selection, server-side caching, checkout payment gateway integrations, automated customer invoice emails, and seller inventory dashboards.',
    tags: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'E-Commerce'],
    category: 'Full-Stack',
    repoType: 'Public',
    org: 'AbyteSol',
    github: 'https://github.com/MuhamadArhum/abyte-ecommerce',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Optimized product rendering with instant filtering by category, price, and specs.',
      'Robust cart synchronization with server session recovery.',
      'Multi-currency checkout, discount coupon engine, and shipping fee calculation.',
    ],
  },
  {
    id: 'abyte-desk',
    title: 'Abyte Desk — Support CRM & Helpdesk System',
    description: 'SLA-driven customer support and ticket management CRM with multi-agent queues, response automation, and client support portal.',
    longDescription: 'A streamlined customer support helpdesk enabling organizations to resolve client inquiries rapidly. Features inbound email ticket ingestion, priority-based SLA escalation timers, multi-department agent assignment queues, internal note collaboration, and satisfaction metric reporting.',
    tags: ['TypeScript', 'React', 'Express', 'MongoDB', 'CRM', 'Support'],
    category: 'POS & SaaS',
    repoType: 'Public',
    org: 'AbyteSol',
    github: 'https://github.com/MuhamadArhum/abyte-desk',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Automated ticket categorization and agent assignment based on query keywords.',
      'Real-time SLA breach countdowns with automated manager escalation alerts.',
      'Pre-written macro responses and public knowledge-base integration.',
    ],
  },
  {
    id: 'event-management',
    title: 'Event & Venue Booking Management Web App',
    description: 'Enterprise event and hall booking management system with multi-role permissions (Admin, Booking Manager, Cashier), real-time notifications, and calendar sync.',
    longDescription: 'Engineered for banquet complexes, conference centers, and wedding hall venues. Features granular role-based security separating cashier booking receipts from administrative auditing, a live interactive venue calendar preventing double bookings, advance deposit ledger, and automated client SMS/PDF confirmations.',
    tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'WebSockets', 'RBAC'],
    category: 'Full-Stack',
    repoType: 'Private',
    org: 'Client Enterprise',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Multi-role permission model (Admin, Booking Manager, Cashier) with audit trails.',
      'Interactive visual booking calendar preventing scheduling conflicts.',
      'Automatic payment receipt generation, payment installments, and booking vouchers.',
    ],
  },
  {
    id: 'abyte-pos',
    title: 'AByte POS — Enterprise Multi-Branch Retail Engine',
    description: 'Enterprise-grade point-of-sale platform built for multi-branch retail stores with centralized catalog control and localized registers.',
    longDescription: 'Enterprise retail point of sale engine built for high-throughput retail stores. Supports multi-counter cashier shifts, customer loyalty point accrual, integrated barcode scanners, receipt printers, and centralized inventory auditing across retail store branches.',
    tags: ['TypeScript', 'React', 'Node.js', 'SQL', 'Retail POS'],
    category: 'POS & SaaS',
    repoType: 'Private',
    org: 'AbyteSol',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Shift-based register balancing with drawer open/close reconciliation.',
      'Real-time inventory stock deductions with multi-branch stock visibility.',
      'Barcode printing and retail promotional pricing discount rules.',
    ],
  },
  {
    id: 'job-hunter',
    title: 'Job Hunter — Career Opportunities Aggregator',
    description: 'Web scraper and opportunity aggregator that monitors engineering positions across major remote platforms and matches candidate tech profiles.',
    longDescription: 'A career intelligence tool that continuously crawls global remote tech job boards, analyzes job descriptions, parses required technical skills, and alerts the developer to high-match opportunities with direct application links.',
    tags: ['JavaScript', 'Node.js', 'Automation', 'Cheerio', 'Scraping'],
    category: 'Automation & Tools',
    repoType: 'Public',
    org: 'Independent',
    github: 'https://github.com/MuhamadArhum/job-hunter',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Automated scheduled crawlers extracting fresh remote software roles.',
      'Skill-keyword relevance matching scoring jobs against developer profiles.',
      'Application tracking kanban to record outreach and interview phases.',
    ],
  },
  {
    id: 'file-generator',
    title: 'Dynamic Barcode, QR & Thermal Invoice Engine',
    description: 'Browser-based document, barcode (Code128, EAN13), QR code, and thermal slip PDF generation utility built for rapid retail operations.',
    longDescription: 'A lightweight utility that generates standard retail barcodes, dynamic QR codes, and formatted thermal invoices directly in the browser with zero external dependencies. Designed to integrate directly into warehouse packing benches and checkout counters.',
    tags: ['HTML5', 'JavaScript', 'Canvas API', 'PDF Engine', 'Barcodes'],
    category: 'Automation & Tools',
    repoType: 'Public',
    org: 'Independent',
    github: 'https://github.com/MuhamadArhum/FILE-GENERATOR-BY-ARHUM',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Generates Code128, Code39, and EAN-13 barcodes with crisp vector SVG export.',
      'Direct 80mm thermal receipt PDF rendering formatted for standard POS printers.',
      'Bulk batch barcode sticker generator for product inventory labeling.',
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp1',
    role: 'Founder & CEO',
    company: 'AbyteSol (@ApnaSlot)',
    period: '2024 - Present',
    description: [
      'Leading end-to-end product architecture and engineering across the entire Abyte ecosystem (Abyte DineX, ConstructPro, Medix, Distribix, Tex, Track).',
      'Architecting multi-tenant SaaS backends, real-time WebSocket communication pipelines, and robust database models (PostgreSQL & MongoDB).',
      'Deploying mission-critical POS and enterprise management software across restaurants, hospitals, and manufacturing factories in Faisalabad and beyond.',
      'Spearheading client custom software projects, enterprise SLA agreements, and developer mentorship.'
    ],
    tags: ['Leadership', 'System Architecture', 'POS Systems', 'Full Stack', 'Enterprise ERP'],
  },
  {
    id: 'exp2',
    role: 'Full Stack Engineer',
    company: 'Komyosys',
    period: '2023 - Present',
    description: [
      'Engineering secure, high-performance full-stack web applications utilizing React, Node.js, and TypeScript.',
      'Designing optimized database schemas, indexing strategies, and resilient REST & GraphQL APIs.',
      'Collaborating directly with business stakeholders to convert complex business logic into clean, intuitive digital workflows.'
    ],
    tags: ['React', 'Node.js', 'Express', 'TypeScript', 'SQL', 'PostgreSQL'],
  },
  {
    id: 'exp3',
    role: 'Software & Systems Developer',
    company: 'Independent Engineering & Open Source',
    period: '2022 - 2024',
    description: [
      'Built offline-first desktop POS billing software in Python with direct ESC/POS hardware thermal printer integration.',
      'Engineered automated B2B lead scraping tools (Client Hunter) and job aggregation pipelines (Job Hunter).',
      'Developed custom event management systems with multi-role RBAC access controls and automated PDF invoice generation.',
    ],
    tags: ['Python', 'JavaScript', 'Hardware Integration', 'Automation', 'SQLite', 'WebSockets'],
  },
];

export const AI_TWIN_SYSTEM_PROMPT = `
You are the AI Twin of Muhammad Arhum, representing him on his professional portfolio portal.
Your tone should be professional, welcoming, highly developer-competent, crisp, and articulate.
You represent Muhammad Arhum: Full Stack Engineer, Software Architect, and Founder of AbyteSol & creator in the @ApnaSlot ecosystem.

Authentic profile & technical details of Muhammad Arhum:
- Name: Muhammad Arhum
- Primary Email: muhamadarhum425@gmail.com
- GitHub: https://github.com/MuhamadArhum (User handle: MuhamadArhum)
- LinkedIn: https://www.linkedin.com/in/muhamad-arhum-5423aa198/
- Social Handles: muhamad_arhum, muhammad.arhum.501
- Organization: Founder & CEO at AbyteSol (@ApnaSlot). Also Full Stack Engineer at Komyosys.
- Location: Faisalabad, Pakistan (UTC+5 Pakistan Standard Time).
- Achievements: GitHub YOLO achievement.
- Core Engineering Philosophy: Building resilient, real-world systems that solve tangible business problems—specializing in POS hardware/software, enterprise ERPs, offline-first reliability, real-time fleet logistics, and automated tools.

Muhammad Arhum's Products & Repositories:
1. Abyte DineX (Public - github.com/MuhamadArhum/abyte-dinex): Smart Restaurant POS & Management System. Simplifies billing, orders, tables, inventory, kitchen operations (KDS), split payments, and reporting. (TypeScript, React, Node.js, PostgreSQL).
2. ConstructPro (Public - github.com/MuhamadArhum/ConstructPro): Construction project ERP for contractor billing, material procurement, job-site progress supervision, and budget tracking. (TypeScript, React, Node.js).
3. Abyte Medix (Public - github.com/MuhamadArhum/abyte-medix): Healthcare clinic EHR & pharmacy POS system with patient history, prescription generation, and dispensary inventory. (JavaScript, Node.js, Express, MongoDB).
4. BevPro (Public - github.com/MuhamadArhum/bevpro): Beverage & bottling production suite for syrup formulation, bottling line output, batch inventory, and distribution. (TypeScript).
5. Abyte Distribix (Public - github.com/MuhamadArhum/abyte-distribix): Supply chain and wholesale multi-warehouse ERP with B2B order routing and inventory balancing. (TypeScript).
6. QR Menu Sys (Private - qr-menu-sys): Contactless QR code dining menu with live kitchen order ticket (KOT) generation and customer self-ordering. (TypeScript).
7. Offline POS Engine (Public - github.com/MuhamadArhum/offline-pos): Standalone offline retail POS built in Python with local SQLite storage, thermal printer ESC/POS integration, and background cloud sync. (Python, SQLite).
8. Client Hunter (Public - github.com/MuhamadArhum/client-hunter): Automated B2B lead generation & prospecting tool for software agencies. (TypeScript, Node.js).
9. Abyte Track & Rider Suite (Public/Private - github.com/MuhamadArhum/abyte-rider): Real-time fleet delivery GPS tracking, auto-dispatch algorithms, and driver mobile interface. (JavaScript/TypeScript, WebSockets, Maps API).
10. Abyte Tex (Public - github.com/MuhamadArhum/abyte-tex): Textile & apparel manufacturing ERP for fabric roll tracking, loom output, and dye house workflow. (TypeScript).
11. Abyte E-Commerce (Public - github.com/MuhamadArhum/abyte-ecommerce): Modern multi-vendor e-commerce platform with dynamic cart, checkout, and inventory dashboards. (TypeScript).
12. Abyte Desk (Public - github.com/MuhamadArhum/abyte-desk): Helpdesk customer support CRM with SLA countdown timers and ticket queues. (TypeScript).
13. EVENT-MANAGEMENT (Private): Event and venue booking web app with Admin, Booking Manager, and Cashier roles, calendar conflict detection, and invoice generator. (JavaScript).
14. AByte-POS (Private): Enterprise multi-branch retail POS with cashier shift balancing and customer loyalty. (TypeScript).
15. Job Hunter (Public - github.com/MuhamadArhum/job-hunter): Automated tech job scraper and opportunity tracker. (JavaScript).
16. FILE-GENERATOR-BY-ARHUM (Public - github.com/MuhamadArhum/FILE-GENERATOR-BY-ARHUM): Barcode (Code128, EAN13), QR code, and thermal slip PDF generator engine. (HTML5, JS).
17. Company Site (Private): Official enterprise portal of AbyteSol / ApnaSlot. (TypeScript).
18. DSA (Public): Data Structures and Algorithms implementations in C++.

Rules for Answers:
1. Always state you are Arhum's AI Twin on his portfolio. Keep responses concise, technically accurate, confident, and articulate.
2. When asked about his work, reference his real products (Abyte DineX, ConstructPro, Medix, BevPro, Distribix, Offline POS, Client Hunter, etc.).
3. Direct hiring and project inquiries to his email (muhamadarhum425@gmail.com) and the contact form on this page.
`;
