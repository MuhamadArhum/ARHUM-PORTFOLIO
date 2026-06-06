import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import AITwin from './components/AITwin';
import Contact from './components/Contact';
import { PERSONAL_INFO } from './data';
import { Home, Cpu, MessageSquare, Briefcase, Code, Mail, Menu, X, ArrowUp, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to show Back-To-Top button and calculate active sections
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back-to-top visibility
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Scroll-spy to keep navigation highlighted
      const sections = ['home', 'ai-twin', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section === 'home' ? 'root' : `${section}-section`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = id === 'home' ? document.getElementById('root') : document.getElementById(`${id}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(id);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'ai-twin', label: 'AI Twin', icon: MessageSquare },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'My Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Cpu },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-teal-50 selection:text-teal-700">
      
      {/* Pristine modern fluid header */}
      <nav 
        className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-zinc-100 z-40 flex items-center justify-between px-6 md:px-12 transition-all duration-300 shadow-xs shadow-zinc-50/50"
        id="main-navigation-navbar"
      >
        <div 
          onClick={() => scrollToSection('home')} 
          className="cursor-pointer flex items-center gap-2.5 group"
          id="navbar-site-title"
        >
          {/* Minimal design mark */}
          <div className="h-8.5 w-8.5 rounded-lg bg-zinc-950 flex items-center justify-center text-white font-mono font-bold text-sm tracking-tighter group-hover:bg-teal-600 transition-colors duration-250">
            M
          </div>
          <span className="font-sans font-bold text-base text-zinc-900 group-hover:text-teal-600 transition-colors duration-200 tracking-tight">
            Arhum<span className="text-teal-600">.dev</span>
          </span>
        </div>

        {/* Desktop navbar pills with floating zinc backgrounds */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-50 p-1 rounded-xl border border-zinc-200/50">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/40'
                }`}
                id={`navlink-desktop-${link.id}`}
              >
                <Icon size={12} className={isActive ? 'text-teal-400' : 'text-zinc-400'} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>

        {/* Accent CTA button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4.5 py-2 rounded-lg bg-zinc-900 hover:bg-teal-650 text-white font-bold text-xs tracking-wider transition-all duration-250 cursor-pointer text-center"
            id="navbar-action-hire-btn"
          >
            Get In Touch
          </button>
        </div>

        {/* Mobile Hamburger control */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-600 hover:text-zinc-950 p-2.5 border border-zinc-200/80 rounded-xl cursor-pointer bg-zinc-50"
          aria-label="Toggle Navigation Menu"
          id="navbar-mobile-toggle-btn"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* Floating Side Drawer mobile layout */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 bg-white border-b border-zinc-200 z-30 p-6 flex flex-col gap-4 text-left shadow-lg md:hidden"
            id="mobile-navigation-drawer"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block px-3 font-semibold mb-1">Index Menu</span>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-teal-50 text-teal-700 font-bold'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                    id={`navlink-mobile-${link.id}`}
                  >
                    <Icon size={14} className={isActive ? "text-teal-600" : "text-zinc-400"} />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-1 w-full text-center py-2.5 rounded-lg bg-zinc-950 hover:bg-teal-600 text-white font-bold text-xs cursor-pointer shadow-sm transition"
              id="mobile-nav-action-hire-btn"
            >
              Collaborate With Arhum
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Landing Main viewport */}
      <main className="flex-grow pt-16 z-10 bg-white" id="portfolio-main-viewport">
        
        {/* Landing Hero block */}
        <Hero 
          onContactClick={() => scrollToSection('contact')} 
          onProjectsClick={() => scrollToSection('projects')} 
        />

        {/* Neural AI Twin Chat clone workspace */}
        <AITwin />

        {/* Experience chrono track block */}
        <Timeline />

        {/* Technical skills list metrics */}
        <Skills />

        {/* Project card compositions portal */}
        <Projects />

        {/* Availability timeclock and contact box */}
        <Contact />

      </main>

      {/* Modern Studio Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200/60 py-12 px-6 lg:px-12 text-center" id="footer-container">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start text-left gap-1">
            <span className="font-sans font-extrabold text-zinc-900 text-base">
              {PERSONAL_INFO.name} <span className="text-xs font-mono font-normal text-zinc-400">/ portfolio</span>
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              Minimalist Studio Edition. Powered by React, Tailwind, and Google Gemini.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            <button onClick={() => scrollToSection('home')} className="hover:text-teal-600 cursor-pointer transition-colors">Top</button>
            <button onClick={() => scrollToSection('ai-twin')} className="hover:text-teal-600 cursor-pointer transition-colors">AI Twin</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-teal-600 cursor-pointer transition-colors">Experience</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-teal-600 cursor-pointer transition-colors">Projects</button>
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>

        </div>
      </footer>

      {/* Floating Scroll back to top circle */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={() => scrollToSection('home')}
            className="fixed bottom-6 right-6 p-2.5 rounded-full bg-zinc-950 hover:bg-teal-600 text-white shadow-md z-40 transition cursor-pointer border border-zinc-800"
            aria-label="Back to Top"
            id="back-to-top-btn"
          >
            <ArrowUp size={14} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
