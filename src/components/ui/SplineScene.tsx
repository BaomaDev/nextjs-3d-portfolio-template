'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-900/20 to-indigo-900/20 rounded-2xl">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading 3D scene...</p>
      </div>
    </div>
  ),
});

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: () => void;
  interactive?: boolean;
}

export const SplineScene = ({
  scene,
  className = '',
  onLoad,
  interactive = true,
}: SplineSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoad = () => {
    onLoad?.();
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: interactive ? 'auto' : 'none' }}
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
          </div>
        }
      >
        <Spline scene={scene} onLoad={handleLoad} />
      </Suspense>
    </motion.div>
  );
};

// Pre-defined positions to avoid hydration mismatch from Math.random()
const particlePositions = [
  { left: 5, top: 10 }, { left: 15, top: 80 }, { left: 25, top: 30 },
  { left: 35, top: 60 }, { left: 45, top: 20 }, { left: 55, top: 90 },
  { left: 65, top: 45 }, { left: 75, top: 15 }, { left: 85, top: 70 },
  { left: 95, top: 40 }, { left: 10, top: 55 }, { left: 20, top: 85 },
  { left: 30, top: 25 }, { left: 40, top: 75 }, { left: 50, top: 5 },
  { left: 60, top: 65 }, { left: 70, top: 35 }, { left: 80, top: 95 },
  { left: 90, top: 50 }, { left: 12, top: 42 },
];

const particleDelays = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 0.2, 0.5, 0.8, 1.1, 1.4, 0.1, 0.4, 0.7, 1.0, 1.3, 0.25, 0.55, 0.85, 1.15];
const particleDurations = [2.5, 3, 2.8, 3.2, 2.6, 3.4, 2.9, 3.1, 2.7, 3.3, 2.4, 3.5, 2.5, 3, 2.8, 3.2, 2.6, 3.4, 2.9, 3.1];

// Placeholder component for when no Spline scene is provided
export const SplinePlaceholder = ({ className = '' }: { className?: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-violet-600/10 to-indigo-600/10 rounded-2xl ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
              />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            3D Scene Placeholder
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
            Add your Spline scene URL to activate
          </p>
        </div>
      </div>
      
      {/* Animated background elements - only render after mount to avoid hydration issues */}
      <div className="absolute inset-0 overflow-hidden">
        {isMounted && particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-violet-500/20"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particleDurations[i],
              repeat: Infinity,
              delay: particleDelays[i],
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplineScene;
