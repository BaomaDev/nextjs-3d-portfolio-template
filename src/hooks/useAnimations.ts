'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for GSAP animations with automatic cleanup
 */
export const useGSAP = (
  callback: (gsapContext: typeof gsap) => void | gsap.core.Timeline | gsap.core.Tween,
  dependencies: React.DependencyList = []
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      callback(gsap);
    }, containerRef);

    return () => ctx.revert();
  }, dependencies);

  return containerRef;
};

/**
 * Hook for scroll-triggered animations
 */
export const useScrollAnimation = (
  options?: {
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
  }
) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const {
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      pin = false,
      markers = false,
    } = options || {};

    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: trigger || elementRef.current,
        start,
        end,
        scrub,
        pin,
        markers,
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      timelineRef.current?.scrollTrigger?.kill();
      timelineRef.current?.kill();
    };
  }, [options]);

  return { ref: elementRef, timeline: timelineRef.current };
};

/**
 * Hook for intersection observer based animations
 */
export const useInView = (
  options?: IntersectionObserverInit & { once?: boolean }
) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const { once = true, ...observerOptions } = options || {};

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            setHasAnimated(true);
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        threshold: 0.1,
        ...observerOptions,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref: elementRef, isInView, hasAnimated };
};

/**
 * Hook for magnetic button effect
 */
export const useMagneticEffect = (strength = 0.3) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
};

/**
 * Hook for parallax effect
 */
export const useParallax = (speed = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const offset = (scrolled - elementTop + window.innerHeight) * speed;

      gsap.set(element, { y: offset });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return elementRef;
};

/**
 * Hook for staggered children animations
 */
export const useStaggerAnimation = (
  options?: {
    stagger?: number;
    duration?: number;
    ease?: string;
    y?: number;
    opacity?: number;
  }
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    if (!containerRef.current) return;

    const {
      stagger = 0.1,
      duration = 0.6,
      ease = 'power3.out',
      y = 30,
      opacity = 0,
    } = options || {};

    const children = containerRef.current.children;

    gsap.from(children, {
      y,
      opacity,
      stagger,
      duration,
      ease,
    });
  }, [options]);

  return { ref: containerRef, animate };
};

/**
 * Hook for mouse position tracking
 */
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setNormalizedPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { position, normalizedPosition };
};

/**
 * Hook for smooth scroll progress
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / docHeight;
      setProgress(Math.min(1, Math.max(0, scrollProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return progress;
};

/**
 * Hook for reduced motion preference
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};
