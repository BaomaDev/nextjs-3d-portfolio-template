'use client';

import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useAnimations';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export const AnimatedButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  className = '',
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: AnimatedButtonProps) => {
  const magneticRef = useMagneticEffect(magnetic ? 0.3 : 0);

  const baseStyles = 'relative overflow-hidden font-medium rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500';
  
  const variants = {
    primary: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100',
    outline: 'border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white',
    ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.div
      ref={magneticRef}
      className="inline-block"
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        initial={false}
        whileHover="hover"
      >
        {/* Shine effect */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          variants={{
            hover: {
              translateX: '100%',
              transition: { duration: 0.5, ease: 'easeInOut' },
            },
          }}
        />
        
        {/* Ripple background */}
        <motion.span
          className="absolute inset-0 bg-white/10 rounded-full scale-0"
          variants={{
            hover: {
              scale: 2,
              opacity: 0,
              transition: { duration: 0.5 },
            },
          }}
        />
        
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default AnimatedButton;
