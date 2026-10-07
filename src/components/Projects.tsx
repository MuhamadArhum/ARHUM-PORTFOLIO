import { useState, useMemo, useEffect } from 'react';
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
  Building2,
  X,
  Code2,
  Globe
} from 'lucide-react';

type CategoryFilter = 'All' | 'POS & SaaS' | 'Enterprise ERP' | 'Full-Stack' | 'Automation & Tools' | 'Mobile & Logistics';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

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
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300" id="projects-section">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header Block Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl text-left space-y-2.5 sm:space-y-3">
            <span className="font-mono text-xs tracking-widest uppercase text-teal-600 dark:text-teal-400 font-bold inline-flex items-center gap-1.5">
              <Sparkles size={12} className="text-teal-600 dark:text-teal-400 animate-pulse" /> Engineering Ecosystem & Products
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Products Built by Muhammad Arhum
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-semibold">
              Production-tested restaurant & retail POS engines, clinical EHRs, construction ERPs, offline hardware billing tools, and automated B2B engines built across @ApnaSlot & AbyteSol.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
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
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
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

        {/* Dynamic Project Cards Grid with Staggered Entrance Animation */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.05,
              },
            },
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.96 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      duration: 0.45,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }
                  },
                }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group flex flex-col bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-teal-500/50 dark:hover:border-teal-500/50 hover:shadow-xl dark:hover:shadow-zinc-950/50 transition-all duration-300 text-left"
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
        </motion.div>

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

        {/* Dynamic Modal Detail Sheet - Ultra-Responsive & Expansive Desktop View */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 pt-18 sm:pt-20 md:pt-8 overflow-y-auto"
              id="project-details-overlay"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 28, stiffness: 340 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-5xl xl:max-w-6xl w-full rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[88vh] sm:max-h-[85vh] lg:max-h-[90vh] my-auto flex flex-col text-left"
                id="project-details-modal"
              >
                {/* Modal Top Header Bar */}
                <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 border-b border-zinc-150 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60 backdrop-blur-md shrink-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-extrabold py-1 px-3 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/60 text-teal-800 dark:text-teal-300 uppercase tracking-widest inline-flex items-center gap-1.5">
                      {getCategoryIcon(selectedProject.category)}
                      {selectedProject.category}
                    </span>
                    {selectedProject.org && (
                      <span className="text-[11px] font-mono font-bold py-1 px-3 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300">
                        {selectedProject.org}
                      </span>
                    )}
                    <span className={`text-[11px] font-mono font-bold py-1 px-3 rounded-full flex items-center gap-1.5 ${
                      selectedProject.repoType === 'Public' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50' 
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'
                    }`}>
                      {selectedProject.repoType === 'Public' ? (
                        <>
                          <Globe size={11} className="text-emerald-600 dark:text-emerald-400" />
                          <span>Public Repository</span>
                        </>
                      ) : (
                        <>
                          <Lock size={11} className="text-zinc-500" />
                          <span>Private Enterprise Code</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Close button with ESC indicator */}
                  <div className="flex items-center gap-2.5">
                    <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-0.5">
                      ESC
                    </span>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-1.5 sm:p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 hover:dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
                      aria-label="Close project modal"
                      id="close-project-details-btn"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Scrollable Modal Content */}
                <div className="overflow-y-auto flex-1">
                  <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                    
                    {/* Left Column: Visual Showcase, Tech Badges & Actions */}
                    <div className="lg:col-span-5 p-5 sm:p-6 lg:p-7 bg-zinc-50/60 dark:bg-zinc-950/40 border-b lg:border-b-0 lg:border-r border-zinc-150 dark:border-zinc-800 flex flex-col gap-6">
                      
                      {/* Project Image Box */}
                      <div className="relative aspect-video lg:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm group">
                        <img 
                          src={selectedProject.image} 
                          alt={selectedProject.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                          <span className="bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-bold">
                            {selectedProject.repoType === 'Public' ? 'Open Source' : 'Enterprise'}
                          </span>
                          <span className="bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-medium text-teal-300">
                            {selectedProject.tags[0]}
                          </span>
                        </div>
                      </div>

                      {/* Tech Stack Modules Box */}
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[11px] font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-bold flex items-center gap-1.5">
                            <Code2 size={13} className="text-teal-600 dark:text-teal-400" /> Technology Stack
                          </h4>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {selectedProject.tags.length} modules
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="mt-auto pt-4 space-y-2.5">
                        {selectedProject.github && (
                          <a 
                            href={selectedProject.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 shadow-sm transition-all"
                          >
                            <Github size={15} />
                            <span>View on GitHub</span>
                            <ExternalLink size={13} className="opacity-70 ml-auto" />
                          </a>
                        )}
                        {selectedProject.link && (
                          <a 
                            href={selectedProject.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition-all"
                          >
                            <ExternalLink size={15} />
                            <span>Access Live Deployment</span>
                            <span className="ml-auto text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded">LIVE</span>
                          </a>
                        )}
                      </div>

                    </div>

                    {/* Right Column: Deep Specifications & Architecture Details */}
                    <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 lg:space-y-8">
                      
                      <div className="space-y-6">
                        {/* Title & Tagline */}
                        <div className="space-y-2">
                          <h3 className="text-2xl sm:text-3xl lg:text-3xl font-sans font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight leading-tight">
                            {selectedProject.title}
                          </h3>
                          <p className="text-sm sm:text-base text-teal-700 dark:text-teal-400 font-medium">
                            {selectedProject.description}
                          </p>
                        </div>

                        {/* System Architecture Section */}
                        <div className="space-y-2.5">
                          <h4 className="text-[11px] font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-bold flex items-center gap-1.5">
                            <Layers size={13} className="text-teal-600 dark:text-teal-400" />
                            System Architecture & Overview
                          </h4>
                          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/90 dark:border-zinc-800/90">
                            <p className="text-zinc-750 dark:text-zinc-300 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed">
                              {selectedProject.longDescription}
                            </p>
                          </div>
                        </div>

                        {/* Engineering Capabilities & Features Section */}
                        <div className="space-y-3">
                          <h4 className="text-[11px] font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-bold flex items-center gap-1.5">
                            <CheckCircle2 size={14} className="text-teal-600 dark:text-teal-400" />
                            Engineering Capabilities & Real-World Features
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedProject.highlights.map((hlt, idx) => (
                              <div 
                                key={idx} 
                                className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-2.5 hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-colors"
                              >
                                <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                                <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                                  {hlt}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Modal Footer Attributions */}
                      <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-200">Muhammad Arhum</span>
                          <span>•</span>
                          <span className="font-mono text-[11px]">Production Systems & Full-Stack</span>
                        </div>
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                        >
                          Close Window
                        </button>
                      </div>

                    </div>

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
