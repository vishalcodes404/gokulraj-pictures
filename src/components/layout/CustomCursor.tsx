'use client';

import { useEffect, useRef, useState } from 'react';
import { useIsTouchDevice } from '@/src/hooks/useMediaQuery';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const isTouch = useIsTouchDevice();
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    if (isTouch || !dotRef.current || !outlineRef.current) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;

    const mousePos = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const outlinePos = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const handleMouseEnterInteractive = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const cursorType = target.getAttribute('data-cursor');

      if (cursorType === 'view') {
        setCursorText('VIEW');
        dot.classList.add('cursor-view');
        outline.classList.add('cursor-view');
      } else {
        setCursorText('');
        dot.classList.add('hovering');
        outline.classList.add('hovering');
      }
    };

    const handleMouseLeaveInteractive = () => {
      setCursorText('');
      dot.classList.remove('hovering', 'cursor-view');
      outline.classList.remove('hovering', 'cursor-view');
    };

    const animate = () => {
      dotPos.x += (mousePos.x - dotPos.x) * 0.25;
      dotPos.y += (mousePos.y - dotPos.y) * 0.25;
      dot.style.left = `${dotPos.x}px`;
      dot.style.top = `${dotPos.y}px`;

      outlinePos.x += (mousePos.x - outlinePos.x) * 0.12;
      outlinePos.y += (mousePos.y - outlinePos.y) * 0.12;
      outline.style.left = `${outlinePos.x}px`;
      outline.style.top = `${outlinePos.y}px`;

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animId = requestAnimationFrame(animate);

    const setupListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor="button"], [data-cursor="view"], input, textarea, .image-hover-zoom'
      );

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };

    setupListeners();

    const observer = new MutationObserver(setupListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={outlineRef}
        className="cursor-outline flex items-center justify-center"
      >
        {cursorText && (
          <span
            ref={textRef}
            className="text-[10px] font-bold tracking-[0.2em] text-[#FFBA00] font-sans"
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
