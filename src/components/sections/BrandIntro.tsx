'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface BrandIntroProps {
  onComplete: () => void;
  isActive?: boolean;
}

export default function BrandIntro({ onComplete, isActive = true }: BrandIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SVGSVGElement>(null);
  const picturesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Smooth transition out into Hero
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.04,
          filter: 'blur(12px)',
          duration: 1.1,
          ease: 'power2.inOut',
          onComplete: () => onComplete(),
        });
      },
    });

    // 1. Prepare SVG paths for animated pen drawing
    const paths = signatureRef.current?.querySelectorAll('path');
    if (paths) {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

      // Live cursive writing animation (slow, elegant, premium)
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 3.2,
        stagger: 0.25,
        ease: 'power2.inOut',
      });
    }

    // 2. Reveal "PICTURES" text with fade and blur animation
    tl.fromTo(
      picturesRef.current,
      {
        opacity: 0,
        y: 25,
        filter: 'blur(10px)',
        letterSpacing: '0.8em',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        letterSpacing: '0.45em',
        duration: 1.2,
        ease: 'power3.out',
      },
      '-=0.6'
    );

    // 3. Hold for 1 second as requested
    tl.to({}, { duration: 1.0 });
  }, [onComplete, isActive]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden select-none"
      aria-label="Gokulraj Pictures Brand Intro"
    >
      {/* Background soft ambient gold glow */}
      <div className="absolute w-[500px] h-[300px] bg-[#FFBA00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center z-10 px-4">
        {/* Handwritten Cursive "Gokulraj" SVG Signature */}
        <svg
          ref={signatureRef}
          viewBox="0 0 800 240"
          className="w-[85vw] max-w-[650px] h-auto filter drop-shadow-[0_0_15px_rgba(255,186,0,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Letter 'G' */}
          <path
            d="M 180,70 C 120,40 60,90 70,150 C 80,210 160,200 170,130 C 175,95 130,85 105,100 M 130,140 L 190,140"
            stroke="#FFBA00"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'o' */}
          <path
            d="M 205,140 C 200,120 225,115 235,135 C 245,155 210,165 205,140 C 205,130 230,125 245,130"
            stroke="#FFBA00"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'k' */}
          <path
            d="M 255,80 L 255,160 M 255,135 C 275,120 285,115 285,130 M 255,135 L 290,160"
            stroke="#FFBA00"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'u' */}
          <path
            d="M 305,125 L 305,150 C 305,165 330,165 330,150 L 330,125"
            stroke="#FFBA00"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'l' */}
          <path
            d="M 345,75 L 345,160"
            stroke="#FFBA00"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'r' */}
          <path
            d="M 360,125 L 360,160 M 360,135 C 365,125 385,120 395,130"
            stroke="#FFBA00"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'a' */}
          <path
            d="M 425,140 C 420,120 400,120 400,140 C 400,160 425,160 425,140 M 425,125 L 425,160"
            stroke="#FFBA00"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'j' with loop & dot */}
          <path
            d="M 440,125 L 440,185 C 440,215 410,210 405,195 M 440,105 L 440,110"
            stroke="#FFBA00"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Elegant finishing swash curve underneath */}
          <path
            d="M 50,190 Q 250,225 600,170 T 730,140"
            stroke="#FFBA00"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Revealed "PICTURES" text in white color & wide letter spacing */}
        <div
          ref={picturesRef}
          className="mt-6 text-white text-sm md:text-xl font-light uppercase tracking-[0.45em] font-sans opacity-0"
        >
          PICTURES
        </div>
      </div>
    </div>
  );
}
