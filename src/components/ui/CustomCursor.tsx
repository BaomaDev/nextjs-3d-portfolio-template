'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CustomCursorProps {
  color?: string;
  size?: number;
  mixBlendMode?: 'difference' | 'exclusion' | 'normal';
}

export const CustomCursor = ({
  color = 'rgb(139, 92, 246)',
  size = 20,
  mixBlendMode = 'difference',
}: CustomCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isWindowFocused, setIsWindowFocused] = useState(true);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Add cursor-custom class to body on mount
    document.body.classList.add('cursor-custom');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      setIsPointer(isInteractive);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Animation loop
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      gsap.set(cursor, {
        x: cursorX - size / 2,
        y: cursorY - size / 2,
      });

      gsap.set(cursorDot, {
        x: mouseX - 4,
        y: mouseY - 4,
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleWindowFocus = () => {
      setIsWindowFocused(true);
      document.body.classList.add('cursor-custom');
    };
    const handleWindowBlur = () => {
      setIsWindowFocused(false);
      document.body.classList.remove('cursor-custom');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
      // Remove cursor-custom class on unmount
      document.body.classList.remove('cursor-custom');
    };
  }, [size]);

  // Handle cursor state changes with GSAP
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isPointer) {
      gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  }, [isPointer]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isClicking) {
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
    } else {
      gsap.to(cursor, { scale: isPointer ? 1.5 : 1, duration: 0.3, ease: 'elastic.out(1, 0.3)' });
    }
  }, [isClicking, isPointer]);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: size,
          height: size,
          opacity: isHidden || !isWindowFocused ? 0 : 1,
          transition: 'opacity 0.3s',
          mixBlendMode,
        }}
        aria-hidden="true"
      >
        <div
          className="w-full h-full rounded-full border-2 transition-colors duration-200"
          style={{
            borderColor: color,
            backgroundColor: isPointer ? `${color}20` : 'transparent',
          }}
        />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 8,
          height: 8,
          opacity: isHidden || !isWindowFocused ? 0 : 1,
          transition: 'opacity 0.3s',
        }}
        aria-hidden="true"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
