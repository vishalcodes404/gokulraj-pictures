'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
}

export default function ImageReveal({
  children,
  className = '',
  direction = 'left',
  delay = 0,
  duration = 1.2,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const clipPaths: Record<string, { from: string; to: string }> = {
      left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
      right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
      up: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
      down: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
    };

    gsap.set(container, {
      clipPath: clipPaths[direction].from,
    });

    gsap.to(container, {
      clipPath: clipPaths[direction].to,
      duration,
      delay,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Also animate the inner image scale
    const img = container.querySelector('img');
    if (img) {
      gsap.from(img, {
        scale: 1.3,
        duration: duration + 0.4,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [direction, delay, duration]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
