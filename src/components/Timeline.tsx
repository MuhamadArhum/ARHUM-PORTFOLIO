import { motion } from 'motion/react';
import { EXPERIENCE } from '../data';
import { Briefcase, Calendar, Award, Sparkles } from 'lucide-react';

export default function Timeline() {
  const cardVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.4, ease: 'easeOut' } 
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white border-b border-zinc-100" id="experience-section">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header Block Description */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="font-mono text-xs tracking-widest uppercase text-teal-600 font-bold inline-flex items-center gap-1">
            <Sparkles size={11} className="text-teal-600 animate-pulse" /> Career Chronology
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-zinc-900 tracking-tight">
            Work Experience & Milestones
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
            An established track record of guiding team microservices, designing hybrid apps, and decreasing server payload times.
          </p>
        </div>

        {/* Timeline Line Container */}
        <div className="relative max-w-3xl mx-auto pl-6 md:pl-10 border-l border-zinc-200/80 space-y-12 py-3">
          
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={cardVariants}
              className="relative group text-left"
              id={`timeline-card-${exp.id}`}
            >
              {/* Timeline tracker circle */}
              <span className="absolute -left-[31px] md:-left-[47px] top-1 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-white border border-zinc-300 group-hover:border-teal-600 transition-colors z-10 shadow-xs">
                <Briefcase size={8} className="text-zinc-400 group-hover:text-teal-600 transition-colors" />
              </span>

              <div className="p-6 md:p-8 bg-zinc-50/40 border border-zinc-200/50 rounded-xl relative hover:border-teal-500/20 hover:bg-white hover:shadow-xs transition-all duration-250">
                
                {/* Header elements */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-base md:text-lg font-sans font-extrabold text-zinc-950 group-hover:text-teal-600 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-teal-600">
                      {exp.company}
                    </p>
                  </div>
                  
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-[10px] font-mono font-bold text-zinc-500 w-fit uppercase tracking-wider">
                    <Calendar size={11} className="text-teal-500" />
                    {exp.period}
                  </span>
                </div>

                {/* Achieved list bullet points */}
                <ul className="space-y-2.5 mb-5 select-text">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-xs sm:text-sm text-zinc-600 leading-relaxed font-semibold items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500/70 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags footer */}
                <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-zinc-150">
                  {exp.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-500 hover:border-teal-400/35 hover:text-zinc-700 transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}

          {/* Education timeline item */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="relative group text-left pt-1"
            id="timeline-card-education"
          >
            {/* Education icon circle */}
            <span className="absolute -left-[31px] md:-left-[47px] top-6.5 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-white border border-zinc-300 group-hover:border-teal-600 transition-colors z-10 shadow-xs">
              <Award size={9} className="text-zinc-400 group-hover:text-teal-600" />
            </span>

            <div className="p-6 md:p-8 bg-zinc-50/40 border border-zinc-200/50 rounded-xl hover:border-teal-500/20 hover:bg-white hover:shadow-xs transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base md:text-lg font-sans font-extrabold text-zinc-950">
                    B.S. in Computer Science
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-teal-600">
                    Academic Degree Program
                  </p>
                </div>
                
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-[10px] font-mono font-bold text-zinc-500 w-fit uppercase tracking-wider">
                  <Calendar size={11} className="text-teal-500" />
                  Graduated
                </span>
              </div>
              <p className="text-zinc-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Focused research into systems programming, concurrent algorithms, distributed schemas, containerization benchmarks, and modern visual application design workflows.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
