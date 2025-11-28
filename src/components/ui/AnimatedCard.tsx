'use client';

import { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'tilt' | 'lift' | 'glow' | 'none';
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

export const AnimatedCard = ({
  children,
  className = '',
  hoverEffect = 'tilt',
  onClick,
  as: Component = 'div',
}: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || hoverEffect === 'none') return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = motion.create(Component);

  const hoverEffects = {
    tilt: {
      style: { rotateX, rotateY, transformStyle: 'preserve-3d' as const },
      whileHover: {},
    },
    lift: {
      style: {},
      whileHover: { y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' },
    },
    glow: {
      style: {},
      whileHover: { boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)' },
    },
    none: {
      style: {},
      whileHover: {},
    },
  };

  return (
    <MotionComponent
      ref={cardRef}
      className={`relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden ${className}`}
      style={hoverEffects[hoverEffect].style}
      whileHover={hoverEffects[hoverEffect].whileHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Glow overlay for tilt effect */}
      {hoverEffect === 'tilt' && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(139, 92, 246, 0.15), transparent 50%)`,
          }}
        />
      )}
      
      {children}
    </MotionComponent>
  );
};

export default AnimatedCard;
