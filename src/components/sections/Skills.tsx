'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Simplified skills data
const skills = [
  { name: 'React / Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'Git', category: 'Tools' },
  { name: 'Figma', category: 'Tools' },
  { name: 'Docker', category: 'Tools' },
];

const SkillPill = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  return (
    <motion.span
      className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      {skill.name}
    </motion.span>
  );
};

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative pt-8 pb-20 md:pt-12 md:pb-28 bg-gray-50 dark:bg-gray-900"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-violet-500/5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.span
            className="inline-block px-3 py-1 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-600 dark:text-violet-400 text-sm font-medium mb-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          >
            Skills
          </motion.span>
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
          >
            Technologies I Work With
          </motion.h2>
        </div>

        {/* Skills as simple pills */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {skills.map((skill, index) => (
            <SkillPill key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Simple learning note */}
        <motion.p
          className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          Always exploring new technologies — currently diving into WebGL and AI/ML
        </motion.p>
      </div>

      {/* Wave divider to Contact */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 40L60 46.7C120 53.3 240 66.7 360 66.7C480 66.7 600 53.3 720 46.7C840 40 960 40 1080 46.7C1200 53.3 1320 66.7 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V40Z" className="fill-white dark:fill-gray-950"/>
        </svg>
      </div>
    </section>
  );
};

export default Skills;
