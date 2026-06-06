import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILLS } from '../data';
import { Code2, Database, Smartphone, Cloud, Wrench, BarChart2, Sparkles } from 'lucide-react';

type SkillCat = 'all' | 'frontend' | 'backend' | 'mobile' | 'cloud' | 'tools';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCat>('all');

  const categories = [
    { id: 'all', label: 'All Technologies', icon: BarChart2 },
    { id: 'frontend', label: 'Frontend & UI', icon: Code2 },
    { id: 'backend', label: 'Backend APIs', icon: Database },
    { id: 'mobile', label: 'Mobile Engine', icon: Smartphone },
    { id: 'cloud', label: 'DevOps & Cloud', icon: Cloud },
    { id: 'tools', label: 'Core Paradigms', icon: Wrench },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? SKILLS 
    : SKILLS.filter(skill => skill.category === activeCategory);

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'frontend': 
        return 'text-teal-700 bg-teal-50 border-teal-100';
      case 'backend': 
        return 'text-amber-700 bg-amber-50 border-amber-100';
      case 'mobile': 
        return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'cloud': 
        return 'text-orange-700 bg-orange-50 border-orange-100';
      default: 
        return 'text-zinc-700 bg-zinc-50 border-zinc-200';
    }
  };

  const getBarColor = (cat: string) => {
    switch (cat) {
      case 'frontend': return 'bg-teal-600';
      case 'backend': return 'bg-amber-600';
      case 'mobile': return 'bg-emerald-600';
      case 'cloud': return 'bg-orange-600';
      default: return 'bg-zinc-800';
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-zinc-50/50 border-y border-zinc-200/50" id="skills-section">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header Block Description */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs tracking-widest uppercase text-teal-600 font-bold inline-flex items-center gap-1">
            <Sparkles size={11} className="text-teal-600 animate-pulse" /> Engineering Ecosystem
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-zinc-900 tracking-tight">
            Technical Stack & Frameworks
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
            Architecting robust applications with optimized modular backend nodes, fluid interfaces, and fully integrated automated pipeline testing.
          </p>
        </div>

        {/* Filter Categories Horizontal Bar */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as SkillCat)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 border cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 border-zinc-950 text-white shadow-xs'
                    : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300'
                }`}
                id={`sk-category-${cat.id}`}
              >
                <IconComponent size={13} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="p-5 rounded-xl bg-white border border-zinc-200/60 hover:border-teal-500/15 hover:shadow-2xs transition-all duration-250 text-left"
                key={skill.name}
                id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans font-extrabold text-zinc-900 text-sm">{skill.name}</span>
                  <span className={`text-[8.5px] px-2 py-0.5 rounded-md font-mono uppercase tracking-widest font-extrabold border ${getCategoryTheme(skill.category)}`}>
                    {skill.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[9px] text-zinc-400 font-mono font-bold uppercase tracking-wider">
                    <span>Performance Rating</span>
                    <span>{skill.level}%</span>
                  </div>
                  
                  {/* Performance loader progress track */}
                  <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.55, ease: 'easeOut' }}
                      className={`h-full rounded-full ${getBarColor(skill.category)}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Continuous Policy card */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-zinc-400 font-mono inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-zinc-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
            Continuous Integration Policy: Up-to-date with current API revisions.
          </p>
        </div>

      </div>
    </section>
  );
}
