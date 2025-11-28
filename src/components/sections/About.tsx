'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedText } from '@/components/ui';

// Timeline data - replace with your actual experience
const timelineData = [
  {
    year: '2023 - Present',
    title: 'Senior Frontend Developer',
    company: 'Tech Innovators Inc.',
    description: 'Leading frontend architecture and building scalable design systems with React and TypeScript.',
    icon: '🚀',
  },
  {
    year: '2021 - 2023',
    title: 'Full Stack Developer',
    company: 'Digital Agency Co.',
    description: 'Developed full-stack applications and mentored junior developers on best practices.',
    icon: '💻',
  },
  {
    year: '2019 - 2021',
    title: 'Frontend Developer',
    company: 'Startup Labs',
    description: 'Built interactive web applications and implemented responsive design systems.',
    icon: '⚡',
  },
  {
    year: '2017 - 2019',
    title: 'Junior Developer',
    company: 'Code Academy',
    description: 'Started my journey in web development, learning modern frameworks and tools.',
    icon: '🌱',
  },
];

const TimelineItem = ({ item, index }: { item: typeof timelineData[0]; index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.5 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} mb-8 md:mb-0`}
    >
      {/* Content */}
      <motion.div
        className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg ${isLeft ? 'md:mr-4' : 'md:ml-4'}`}>
          <span className="text-sm text-violet-600 dark:text-violet-400 font-medium">
            {item.year}
          </span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
            {item.title}
          </h3>
          <p className="text-violet-600 dark:text-violet-400 font-medium text-sm">
            {item.company}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            {item.description}
          </p>
        </div>
      </motion.div>

      {/* Center icon */}
      <motion.div
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full items-center justify-center text-2xl shadow-lg z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, type: 'spring', delay: 0.3 }}
      >
        {item.icon}
      </motion.div>

      {/* Empty space for opposite side */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
};

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative pt-8 pb-20 md:pt-12 md:pb-32 bg-white dark:bg-gray-950"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-violet-500/5" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 rounded-full bg-indigo-500/5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-600 dark:text-violet-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <AnimatedText as="span" animation="slideUp">
              My Story & Journey
            </AnimatedText>
          </h2>
        </div>

        {/* About content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-3xl rotate-3" />
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl -rotate-3" />
              
              {/* Image placeholder - replace with your photo */}
              <div className="relative w-full h-full bg-gradient-to-br from-violet-500 to-indigo-500 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center text-4xl">
                      👨‍💻
                    </div>
                    <p className="text-sm opacity-80">Your Photo Here</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hello! I&apos;m a passionate developer
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                With over 5 years of experience in web development, I specialize in creating
                beautiful, performant, and accessible digital experiences. My journey began
                with a curiosity about how websites work, and it evolved into a passion for
                crafting innovative solutions.
              </p>
              <p>
                I believe in the power of clean code, thoughtful design, and continuous learning.
                When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with the community.
              </p>
              <p>
                My approach combines technical expertise with creative problem-solving,
                ensuring every project I work on delivers exceptional value and user experience.
              </p>
            </div>

            {/* Fun facts */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: '☕', label: 'Cups of Coffee', value: '2,847' },
                { icon: '🎯', label: 'Commits This Year', value: '1,200+' },
                { icon: '📚', label: 'Books Read', value: '24' },
                { icon: '🌍', label: 'Countries Visited', value: '12' },
              ].map((fact, index) => (
                <motion.div
                  key={fact.label}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-2xl">{fact.icon}</span>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                    {fact.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{fact.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative mt-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            <AnimatedText as="span" animation="slideUp">
              My Career Journey
            </AnimatedText>
          </h3>

          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 to-indigo-500" />

          {/* Timeline items */}
          <div className="space-y-8 md:space-y-0">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider to Skills */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 60L48 53.3C96 46.7 192 33.3 288 33.3C384 33.3 480 46.7 576 53.3C672 60 768 60 864 53.3C960 46.7 1056 33.3 1152 26.7C1248 20 1344 20 1392 20L1440 20V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" className="fill-gray-50 dark:fill-gray-900"/>
        </svg>
      </div>
    </section>
  );
};

export default About;
