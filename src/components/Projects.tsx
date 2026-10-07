import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { 
  ExternalLink, 
  Github, 
  Lock, 
  Search, 
  Sparkles, 
  Layers, 
  Database, 
  Wrench, 
  Truck, 
  Store, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

type CategoryFilter = 'All' | 'POS & SaaS' | 'Enterprise ERP' | 'Full-Stack' | 'Automation & Tools' | 'Mobile & Logistics';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { label: CategoryFilter; count: number }[] = useMemo(() => {
    return [
      { label: 'All', count: PROJECTS.length },
      { label: 'POS & SaaS', count: PROJECTS.filter(p => p.category === 'POS & SaaS').length },
      { label: 'Enterprise ERP', count: PROJECTS.filter(p => p.category === 'Enterprise ERP').length },
      { label: 'Full-Stack', count: PROJECTS.filter(p => p.category === 'Full-Stack').length },
      { label: 'Automation & Tools', count: PROJECTS.filter(p => p.category === 'Automation & Tools').length },
      { label: 'Mobile & Logistics', count: PROJECTS.filter(p => p.category === 'Mobile & Logistics').length },
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch = 
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.longDescription.toLowerCase().includes(q) ||
        project.tags.some(tag => tag.toLowerCase().includes(q)) ||
        (project.org && project.org.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'POS & SaaS': 
        return <Store className="text-teal-600 dark:text-teal-400" size={13} />;
      case 'Enterprise ERP': 
        return <Building2 className="text-emerald-600 dark:text-emerald-400" size={13} />;
      case 'Full-Stack': 
        return <Database className="text-cyan-600 dark:text-cyan-400" size={13} />;
      case 'Automation & Tools': 
        return <Wrench className="text-amber-500 dark:text-amber-400" size={13} />;
      case 'Mobile & Logistics': 
        return <Truck className="text-purple-500 dark:text-purple-400" size={13} />;
      default: 
        return <Layers className="text-teal-600 dark:text-teal-400" size={13} />;
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300" id="projects-section">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header Block Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left space-y-3">
            <span className="font-mono text-xs tracking-widest uppercase text-teal-600 dark:text-teal-400 font-bold inline-flex items-center gap-1.5">
              <Sparkles size={12} className="text-teal-600 dark:text-teal-400 animate-pulse" /> Engineering Ecosystem & Products
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Products Built by Muhammad Arhum
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-semibold">
              Production-tested restaurant & retail POS engines, clinical EHRs, construction ERPs, offline hardware billing tools, and automated B2B engines built across @ApnaSlot & AbyteSol.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[260px] md:w-72">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, tech, or tags..."
              className="w-full pl-9 pr-3.5 py-2 text-xs font-semibold rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-teal-500 transition-colors"
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.label
                  ? 'bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 shadow-xs'
                  : 'bg-zinc-50 dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300'
              }`}
              id={`proj-filter-${cat.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeCategory === cat.label 
                  ? 'bg-white/20 dark:bg-zinc-900/20 text-white dark:text-zinc-950' 
                  : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group flex flex-col bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-teal-500/40 dark:hover:border-teal-500/40 hover:shadow-lg transition-all duration-300 text-left"
                id={`project-card-${project.id}`}
              >
                {/* Visual Header Image */}
                <div className="relative aspect-video overflow-hidden bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Category Chip */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-zinc-200/80 dark:border-zinc-800 text-[10px] font-extrabold shadow-sm">
                    {getCategoryIcon(project.category)}
                    <span className="text-zinc-700 dark:text-zinc-300 font-mono uppercase tracking-wider">{project.category}</span>
                  </div>

                  {/* Public / Private Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold backdrop-blur-md border shadow-sm">
                    {project.repoType === 'Public' ? (
                      <span className="bg-emerald-500/90 text-white border-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Public Repo
                      </span>
                    ) : (
                      <span className="bg-zinc-900/90 text-zinc-300 border-zinc-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock size={10} />
                        Private / Enterprise
                      </span>
                    )}
                  </div>

                  {/* Organization tag */}
                  {project.org && (
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono font-bold text-white/90 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                      {project.org}
                    </div>
                  )}
                </div>

                {/* Details Body */}
                <div className="p-5 flex flex-col flex-grow gap-3">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-sans font-extrabold text-zinc-950 dark:text-zinc-50 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed font-semibold line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 py-1">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50 text-teal-700 dark:text-teal-300 font-extrabold">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="mt-auto pt-3.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1 cursor-pointer transition-colors"
                      id={`project-view-details-${project.id}`}
                    >
                      <span>Explore Specs</span>
                      <span>&rarr;</span>
                    </button>
                    
                    <div className="flex items-center gap-2.5 text-zinc-400 dark:text-zinc-500">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1" 
                          aria-label={`GitHub Repository for ${project.title}`}
                        >
                          <Github size={15} />
                        </a>
                      )}
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1" 
                          aria-label={`Live Link for ${project.title}`}
                        >
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

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              No products found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-3 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Dynamic Modal Detail Sheet */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
              id="project-details-overlay"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.98, y: 12 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 12 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh] text-left"
                id="project-details-modal"
              >
                {/* Visual Image container */}
                <div className="relative aspect-video w-full bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 dark:from-zinc-900/95 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-zinc-950/80 border border-zinc-800 hover:border-teal-500 text-white hover:text-teal-400 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer"
                    aria-label="Dismiss Dialogue overlay"
                    id="close-project-details-btn"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Technical texts metadata */}
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Category and Org tag */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-extrabold py-0.5 px-3 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-150 dark:border-teal-900/50 text-teal-800 dark:text-teal-300 uppercase tracking-widest inline-block">
                        {selectedProject.category}
                      </span>
                      {selectedProject.org && (
                        <span className="text-[10px] font-mono font-bold py-0.5 px-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                          {selectedProject.org}
                        </span>
                      )}
                      <span className={`text-[10px] font-mono font-bold py-0.5 px-2.5 rounded-full ${
                        selectedProject.repoType === 'Public' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40' 
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                      }`}>
                        {selectedProject.repoType === 'Public' ? 'Public Repository' : 'Private Enterprise'}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-sans font-extrabold text-zinc-950 dark:text-zinc-50">
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description block */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500 font-bold">
                      System Architecture & Overview
                    </h4>
                    <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-semibold leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Highlights section */}
                  <div className="space-y-3 pt-4 border-t border-zinc-150 dark:border-zinc-800">
                    <h5 className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="text-teal-600 dark:text-teal-400" size={13} /> Engineering Capabilities & Real-World Features
                    </h5>
                    
                    <ul className="space-y-2.5 select-text">
                      {selectedProject.highlights.map((hlt, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-zinc-650 dark:text-zinc-300 font-semibold leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0" />
                          <span>{hlt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions bottom strip */}
                  <div className="pt-5 border-t border-zinc-150 dark:border-zinc-800 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-2.5">
                      {selectedProject.github && (
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold border border-zinc-200 dark:border-zinc-800 hover:border-teal-500 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-300 rounded-lg text-zinc-700 dark:text-zinc-300 transition"
                        >
                          <Github size={14} /> Open GitHub Repo
                        </a>
                      )}
                      
                      {selectedProject.link && (
                        <a 
                          href={selectedProject.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-lg hover:bg-teal-600 dark:hover:bg-teal-400 transition"
                        >
                          <ExternalLink size={14} /> Live System
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-lg cursor-pointer"
                    >
                      Close Window
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
