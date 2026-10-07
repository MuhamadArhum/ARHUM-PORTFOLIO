export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'POS & SaaS' | 'Enterprise ERP' | 'Full-Stack' | 'Automation & Tools' | 'Mobile & Logistics' | 'Systems';
  link?: string;
  github?: string;
  image: string;
  highlights: string[];
  repoType?: 'Public' | 'Private' | 'Enterprise';
  org?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'cloud' | 'tools';
  level: number; // 0 to 100
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
