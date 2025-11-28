'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LottieAnimationProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  onComplete?: () => void;
  speed?: number;
  playOnHover?: boolean;
  playOnView?: boolean;
}

export const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
  onComplete,
  speed = 1,
  playOnHover = false,
  playOnView = false,
}: LottieAnimationProps) => {
  const lottieRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lottieRef.current) return;

    // Set animation speed
    lottieRef.current.setSpeed(speed);

    // Play on view using intersection observer
    if (playOnView && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            lottieRef.current?.play();
          } else {
            lottieRef.current?.pause();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(containerRef.current);

      return () => observer.disconnect();
    }
  }, [speed, playOnView]);

  const handleMouseEnter = () => {
    if (playOnHover && lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (playOnHover && lottieRef.current) {
      lottieRef.current.stop();
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Animated illustration"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay && !playOnHover && !playOnView}
        onComplete={onComplete}
      />
    </div>
  );
};

export default LottieAnimation;
