import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data';
import ProfileImage from './ProfileImage';
import { Github, Linkedin, Mail, FileText, MapPin, Sparkles, Cpu, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export default function Hero({ onContactClick, onProjectsClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-[82vh] flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden bg-white dark:bg-zinc-900 transition-colors duration-300">
      
      {/* Decorative Pristine Atmospheric Accents */}
      <div className="absolute inset-0 z-0 opacity-30 overflow-hidden pointer-events-none">
        <div className="absolute top-12 left-12 w-[380px] h-[380px] rounded-full bg-radial from-teal-50 dark:from-teal-950/20 to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-16 right-16 w-[480px] h-[480px] rounded-full bg-radial from-amber-50 dark:from-amber-950/20 to-transparent blur-3xl animate-pulse-slow" />
      </div>

      {/* Exquisite micro-dotted pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#27272a_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Info Bio Block (Left Column) */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start gap-6 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Active Status Badge in high-contrast Royal Blue */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/55 text-xs font-bold text-teal-800 dark:text-teal-300"
            id="availability-badge"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
            </span>
            {PERSONAL_INFO.availability}
          </motion.div>

          {/* Heading */}
          <div className="space-y-3">
            <motion.div variants={itemVariants} className="flex items-center gap-1.5 text-teal-605">
              <Sparkles size={13} className="text-teal-600 animate-pulse" />
              <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-zinc-500 dark:text-zinc-400">Systems & Solutions Portfolio</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.08]"
            >
              Hi, I am <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-605 bg-clip-text text-transparent block mt-1">{PERSONAL_INFO.name}</span>
            </motion.h1>
            
            <motion.h2 
              variants={itemVariants} 
              className="text-base sm:text-lg font-bold text-zinc-700 dark:text-zinc-300 tracking-wide flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
              {PERSONAL_INFO.title}
            </motion.h2>
          </div>

          {/* Short Bio */}
          <motion.p 
            variants={itemVariants} 
            className="text-sm sm:text-base text-zinc-650 dark:text-zinc-400 max-w-2xl leading-relaxed"
          >
            {PERSONAL_INFO.bioBrief}
          </motion.p>

          {/* Location details */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-550 dark:text-zinc-400 font-mono py-2.5 border-y border-zinc-150/80 dark:border-zinc-800 w-full md:w-auto"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-teal-600" />
              {PERSONAL_INFO.location}
            </span>
            <span className="flex items-center gap-1.5 sm:border-l sm:border-zinc-200 dark:sm:border-zinc-800 sm:pl-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              Timezone: {PERSONAL_INFO.timezone} (PKT offset)
            </span>
          </motion.div>

          {/* Primary Operations Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3.5 pt-1.5"
          >
            <button 
              onClick={onProjectsClick}
              className="px-5 py-2.5 rounded-lg font-bold text-white dark:text-zinc-950 bg-zinc-950 dark:bg-zinc-50 hover:bg-teal-650 dark:hover:bg-teal-500 active:scale-[0.98] transition-all duration-200 cursor-pointer text-xs uppercase tracking-wider"
              id="hero-explore-work-btn"
            >
              View My Work
            </button>
            <button 
              onClick={onContactClick}
              className="px-5 py-2.5 rounded-lg font-bold text-zinc-850 dark:text-zinc-250 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-750 border border-zinc-250 dark:border-zinc-700 active:scale-[0.98] transition-all duration-200 cursor-pointer text-xs uppercase tracking-wider"
              id="hero-get-in-touch-btn"
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Anchor channels */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-5 pt-5 text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 w-full"
          >
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">Directories</span>
            
            <a 
              href={PERSONAL_INFO.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-500 hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400 transition-colors duration-200"
              aria-label="GitHub Account Link"
            >
              <Github size={16} />
            </a>
            
            <a 
              href={PERSONAL_INFO.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-500 hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400 transition-colors duration-200"
              aria-label="LinkedIn Profile Link"
            >
              <Linkedin size={16} />
            </a>
            
            <a 
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-zinc-500 hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400 transition-colors duration-200"
              aria-label="Direct Email Connection"
            >
              <Mail size={16} />
            </a>

            <a 
              href={PERSONAL_INFO.resumeUrl} 
              className="text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-950/20 transition-all duration-250 flex items-center gap-1 text-[10px] font-mono font-bold uppercase border border-zinc-200 dark:border-zinc-750 px-2.5 py-1 rounded-lg"
              aria-label="Download Professional Resume Profile"
            >
              <FileText size={12} />
              <span>Resume</span>
              <ArrowUpRight size={10} className="text-zinc-400 dark:text-zinc-550" />
            </a>
          </motion.div>
        </motion.div>

        {/* Profile/Photo Frame (Right Column) */}
        <motion.div 
          className="lg:col-span-5 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <ProfileImage />
        </motion.div>

      </div>
    </section>
  );
}
