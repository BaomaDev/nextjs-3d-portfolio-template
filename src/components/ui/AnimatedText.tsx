'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  animation?: 'fade' | 'slideUp' | 'typewriter' | 'reveal' | 'wave';
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
}

export const AnimatedText = ({
  children,
  as: Component = 'p',
  animation = 'fade',
  className = '',
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.03,
}: AnimatedTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const MotionComponent = motion.create(Component);

  // Split text into words for wave animation
  const words = children.split(' ');
  const letters = children.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration, ease: 'easeOut' as const } },
    },
    typewriter: {
      hidden: { opacity: 0, x: -10 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.05 } },
    },
    reveal: {
      hidden: { opacity: 0, y: '100%' },
      visible: { opacity: 1, y: 0, transition: { duration, ease: [0.6, 0.01, -0.05, 0.95] as const } },
    },
    wave: {
      hidden: { opacity: 0, y: 20, rotateX: -90 },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration, ease: 'backOut' as const },
      },
    },
  };

  // For reveal animation, wrap in overflow hidden container
  if (animation === 'reveal') {
    return (
      <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
        <MotionComponent
          className="inline-block"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={childVariants.reveal}
          style={{ transitionDelay: `${delay}s` }}
        >
          {children}
        </MotionComponent>
      </span>
    );
  }

  // For typewriter or wave, split into letters
  if (animation === 'typewriter' || animation === 'wave') {
    return (
      <MotionComponent
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-label={children}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={childVariants[animation]}
            style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  // For fade and slideUp, animate words
  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      aria-label={children}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          variants={childVariants[animation]}
        >
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  );
};

export default AnimatedText;
