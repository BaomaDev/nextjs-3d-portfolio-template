/**
 * GSAP Animation Utilities
 * Reusable animation configurations and helpers
 */

import gsap from 'gsap';

// Animation Presets
export const animationPresets = {
  // Fade animations
  fadeIn: {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  },
  fadeInUp: {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out',
  },
  fadeInDown: {
    opacity: 0,
    y: -50,
    duration: 0.8,
    ease: 'power3.out',
  },
  fadeInLeft: {
    opacity: 0,
    x: -50,
    duration: 0.8,
    ease: 'power3.out',
  },
  fadeInRight: {
    opacity: 0,
    x: 50,
    duration: 0.8,
    ease: 'power3.out',
  },

  // Scale animations
  scaleIn: {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    ease: 'back.out(1.7)',
  },
  scaleInBounce: {
    opacity: 0,
    scale: 0.5,
    duration: 0.8,
    ease: 'elastic.out(1, 0.5)',
  },

  // Bouncy animations
  bounceIn: {
    opacity: 0,
    scale: 0,
    duration: 1,
    ease: 'elastic.out(1, 0.3)',
  },
  bounceInUp: {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: 'elastic.out(1, 0.5)',
  },

  // Playful animations
  wiggle: {
    rotation: 5,
    duration: 0.1,
    yoyo: true,
    repeat: 5,
    ease: 'power1.inOut',
  },
  pulse: {
    scale: 1.05,
    duration: 0.3,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut',
  },
};

// Stagger configurations
export const staggerConfigs = {
  default: { each: 0.1, from: 'start' },
  center: { each: 0.1, from: 'center' },
  edges: { each: 0.1, from: 'edges' },
  random: { each: 0.1, from: 'random' },
  grid: { each: 0.05, grid: 'auto', from: 'center' },
};

// ScrollTrigger defaults
export const scrollTriggerDefaults = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
};

// Create timeline with common defaults
export const createTimeline = (defaults?: gsap.TimelineVars) => {
  return gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: 'power3.out',
      ...defaults,
    },
  });
};

// Text split animation helper
export const splitTextAnimation = (
  element: Element,
  options?: {
    type?: 'chars' | 'words' | 'lines';
    stagger?: number;
    duration?: number;
  }
) => {
  const text = element.textContent || '';
  const { type = 'chars', stagger = 0.03, duration = 0.5 } = options || {};

  let items: string[] = [];
  switch (type) {
    case 'chars':
      items = text.split('');
      break;
    case 'words':
      items = text.split(' ');
      break;
    case 'lines':
      items = text.split('\n');
      break;
  }

  element.innerHTML = items
    .map((item, i) => `<span class="split-item" style="display: inline-block">${item === ' ' ? '&nbsp;' : item}</span>`)
    .join(type === 'words' ? ' ' : '');

  const splitItems = element.querySelectorAll('.split-item');

  return gsap.from(splitItems, {
    opacity: 0,
    y: 20,
    rotationX: -90,
    stagger,
    duration,
    ease: 'back.out(1.7)',
  });
};

// Magnetic effect for buttons/elements
export const createMagneticEffect = (element: HTMLElement, strength = 0.3) => {
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
};

// Parallax effect helper
export const createParallaxEffect = (
  element: HTMLElement,
  speed = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
) => {
  const handleScroll = () => {
    const scrolled = window.scrollY;
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + scrolled;
    const offset = (scrolled - elementTop) * speed;

    if (direction === 'vertical') {
      gsap.set(element, { y: offset });
    } else {
      gsap.set(element, { x: offset });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Cursor follow effect
export const createCursorFollower = (cursor: HTMLElement, options?: {
  speed?: number;
  scale?: number;
}) => {
  const { speed = 0.15, scale = 1 } = options || {};
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  const animate = () => {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    gsap.set(cursor, {
      x: cursorX,
      y: cursorY,
      scale,
    });

    requestAnimationFrame(animate);
  };

  window.addEventListener('mousemove', handleMouseMove);
  animate();

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
};

// Reveal animation on scroll
export const createRevealAnimation = (
  element: Element,
  options?: {
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
    delay?: number;
  }
) => {
  const { direction = 'up', duration = 0.8, delay = 0 } = options || {};

  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return gsap.from(element, {
    ...directions[direction],
    opacity: 0,
    duration,
    delay,
    ease: 'power3.out',
  });
};
