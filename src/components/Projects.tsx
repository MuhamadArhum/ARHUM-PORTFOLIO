import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ExternalLink, Github, MessageSquareCode, Crosshair, Sparkles, Cpu, Blocks } from 'lucide-react';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Full-Stack' | 'Mobile' | 'Systems' | 'AI'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: ('All' | 'Full-Stack' | 'Mobile' | 'Systems' | 'AI')[] = [
    'All', 'Systems', 'Full-Stack', 'AI', 'Mobile'
  ];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Systems': return <Cpu className="text-teal-600" size={13} />;
      case 'Full-Stack': return <Blocks className="text-emerald-700" size={13} />;
      case 'AI': return <Sparkles className="text-amber-500" size={13} />;
      default: return <MessageSquareCode className="text-amber-600" size={13} />;
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white border-b border-zinc-100" id="projects-section">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header Block Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left space-y-3">
            <span className="font-mono text-xs tracking-widest uppercase text-teal-600 font-bold inline-flex items-center gap-1">
              <Sparkles size={11} className="text-teal-600 animate-pulse" /> Engineering Ledger
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-zinc-900 tracking-tight">
              Featured Systems & Artifacts
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
              High-throughput gateways, real-time sync systems, and cognitive semantic indices built around structural efficiency.
            </p>
          </div>

          {/* Filtering Category Horizontal Strips */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc-50 border border-zinc-200 p-1.5 rounded-xl select-none w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200/50'
                }`}
                id={`proj-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group flex flex-col bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-teal-500/20 hover:shadow-md transition-all duration-300 text-left"
                id={`project-card-${project.id}`}
              >
                {/* Visual Header */}
                <div className="relative aspect-video overflow-hidden bg-zinc-50 border-b border-zinc-150">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.005]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 px-3 py-1 rounded-lg border border-zinc-200 text-xs font-extrabold shadow-sm">
                    {getCategoryIcon(project.category)}
                    <span className="text-zinc-700 font-mono text-[9px] uppercase tracking-widest">{project.category}</span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 flex flex-col flex-grow gap-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-sans font-extrabold text-zinc-950 group-hover:text-teal-600 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-semibold line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 py-1">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-50 border border-zinc-200 text-zinc-500"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-teal-50 border border-teal-100 text-teal-800 font-extrabold">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1.5 cursor-pointer"
                      id={`project-view-details-${project.id}`}
                    >
                      <span>Explore Technical Docs</span>
                      <span>&rarr;</span>
                    </button>
                    
                    <div className="flex items-center gap-3 text-zinc-400">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors" aria-label="GitHub Repository Code">
                          <Github size={15} />
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors" aria-label="Live Demo Link">
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic modal detail overlay sheet */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
              id="project-details-overlay"
            >
              <motion.div
                initial={{ scale: 0.98, y: 12 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 12 }}
                className="bg-white border border-zinc-200 max-w-2xl w-full rounded-2xl overflow-hidden shadow-xl overflow-y-auto max-h-[88vh] text-left"
                id="project-details-modal"
              >
                {/* Visual Image container with blurry ambient background */}
                <div className="relative aspect-video w-full bg-zinc-50 border-b border-zinc-150">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Close dialogue button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-zinc-950/70 border border-zinc-800 hover:border-teal-500 text-white hover:text-teal-400 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer"
                    aria-label="Dismiss Dialogue overlay"
                    id="close-project-details-btn"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* technical texts metadata scroll container */}
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Header categorization tag */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono font-extrabold py-0.5 px-3 rounded-full bg-teal-50 border border-teal-150 text-teal-800 uppercase tracking-widest inline-block">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-sans font-extrabold text-zinc-950">
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-650"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* description block */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono tracking-wider uppercase text-zinc-405 font-bold">Concept Overview</h4>
                    <p className="text-zinc-750 text-xs sm:text-sm font-semibold leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Highlights section */}
                  <div className="space-y-3 pt-4 border-t border-zinc-150">
                    <h5 className="text-[10px] font-mono tracking-wider uppercase text-zinc-405 font-bold flex items-center gap-1.5">
                      <Crosshair className="text-teal-600 animate-pulse" size={13} /> Engineering Specs & milestones
                    </h5>
                    
                    <ul className="space-y-2 select-text">
                      {selectedProject.highlights.map((hlt, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-zinc-600 font-semibold leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0" />
                          <span>{hlt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions bottom strip */}
                  <div className="pt-5 border-t border-zinc-150 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-2.5">
                      {selectedProject.github && (
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold border border-zinc-200 hover:border-teal-500 hover:text-teal-600 rounded-lg text-zinc-600 transition"
                        >
                          <Github size={13} /> GitHub Source
                        </a>
                      )}
                      
                      {selectedProject.link && (
                        <a 
                          href={selectedProject.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-zinc-950 text-white rounded-lg hover:bg-teal-600 transition"
                        >
                          <ExternalLink size={13} /> Demo Deployment
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-3.5 py-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-600 rounded-lg cursor-pointer"
                    >
                      Close Document
                    </button>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
