'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;
  delay?: number;
  duration?: number;
  scrub?: boolean;
  once?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = 'p',
  className = '',
  type = 'words',
  stagger = 0.03,
  delay = 0,
  duration = 0.8,
  scrub = false,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const container = containerRef.current;
    const text = children;
    let elements: HTMLSpanElement[] = [];

    container.innerHTML = '';

    if (type === 'chars') {
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.overflow = 'hidden';
        const inner = document.createElement('span');
        inner.style.display = 'inline-block';
        inner.textContent = char === ' ' ? '\u00A0' : char;
        span.appendChild(inner);
        container.appendChild(span);
        elements.push(inner);
      });
    } else if (type === 'words') {
      text.split(' ').forEach((word, i) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.overflow = 'hidden';
        span.style.marginRight = '0.3em';
        const inner = document.createElement('span');
        inner.style.display = 'inline-block';
        inner.textContent = word;
        span.appendChild(inner);
        container.appendChild(span);
        elements.push(inner);
      });
    } else {
      const lines = text.split('\n');
      lines.forEach((line) => {
        const div = document.createElement('div');
        div.style.overflow = 'hidden';
        const inner = document.createElement('div');
        inner.textContent = line;
        div.appendChild(inner);
        container.appendChild(div);
        elements.push(inner);
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        scrub: scrub ? 1 : false,
      },
    });

    tl.from(elements, {
      y: '110%',
      opacity: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
    });

    hasAnimated.current = true;

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [children, type, stagger, delay, duration, scrub, once]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Tag ref={containerRef as any} className={className}>{children}</Tag>;
}
