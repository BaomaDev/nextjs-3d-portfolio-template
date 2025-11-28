'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'none';
  background?: 'default' | 'gradient' | 'dark' | 'light';
  fullHeight?: boolean;
}

export const Section = ({
  children,
  id,
  className = '',
  animationType = 'fade',
  background = 'default',
  fullHeight = false,
}: SectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const backgrounds = {
    default: 'bg-white dark:bg-gray-950',
    gradient: 'bg-gradient-to-b from-white via-violet-50/30 to-white dark:from-gray-950 dark:via-violet-950/20 dark:to-gray-950',
    dark: 'bg-gray-900 dark:bg-gray-950',
    light: 'bg-gray-50 dark:bg-gray-900',
  };

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slide: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
    },
    none: {
      initial: {},
      animate: {},
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative ${backgrounds[background]} ${fullHeight ? 'min-h-screen' : ''} ${className}`}
      initial={animations[animationType].initial}
      animate={isInView ? animations[animationType].animate : animations[animationType].initial}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;
