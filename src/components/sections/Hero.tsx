'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { AnimatedText, AnimatedButton } from '@/components/ui';

// Dynamic import to avoid SSR issues with Three.js
const Scene3D = dynamic(() => import('@/components/ui/Scene3D').then(mod => mod.Scene3D), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
    </div>
  ),
});

export const Hero = () => {

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950"
    >
      {/* Simple decorative elements - no blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-500/5" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Greeting tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-6"
            >
              <span className="flex h-2 w-2">
                <span className="inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              Available for work
            </motion.div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <AnimatedText
                as="span"
                animation="wave"
                className="block"
                staggerChildren={0.05}
              >
                Hi, I&apos;m
              </AnimatedText>
              <span className="block bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                <AnimatedText
                  as="span"
                  animation="wave"
                  delay={0.3}
                  staggerChildren={0.05}
                >
                  Your Name
                </AnimatedText>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              I craft beautiful, interactive digital experiences with modern technologies.
              Let&apos;s build something amazing together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <AnimatedButton onClick={scrollToProjects} variant="primary" size="lg">
                View My Work
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg">
                Download CV
              </AnimatedButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { value: '50+', label: 'Projects' },
                { value: '5+', label: 'Years Exp.' },
                { value: '30+', label: 'Happy Clients' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, type: 'spring' }}
                >
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Scene - Low poly laptop, phone, and palette */}
          <motion.div
            className="relative h-[400px] lg:h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Scene3D className="w-full h-full" />
          </motion.div>
        </div>
      </div>

      {/* Wave divider to Projects */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-gray-50 dark:fill-gray-900"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
