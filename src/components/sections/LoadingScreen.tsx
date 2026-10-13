'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Preload Hero Image
    if (typeof window !== 'undefined') {
      const heroImage = new window.Image();
      heroImage.src = '/images/hero/hero-bg.png';
    }

    // 2. Animate logo and subtitle entrance
    const tl = gsap.timeline();

    // Logo entrance
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.82, filter: 'blur(12px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' }
    );

    // "A DIFFERENT BANNER MEDIA COMPANY" animated reveal in white with font-size 20px
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 18, letterSpacing: '0.15em', filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        letterSpacing: '0.35em',
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    // 3. Smooth transition out after ~5 seconds
    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          onComplete();
        },
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[100000] bg-[#050505] flex flex-col items-center justify-center select-none cursor-pointer"
      aria-label="Loading Gokulraj Pictures"
    >
      {/* Centered Glowing Yellow Circle Logo */}
      <div
        ref={logoRef}
        className="relative flex items-center justify-center mb-8"
      >
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-[#FFBA00]/60 shadow-[0_0_70px_rgba(255,186,0,0.7)] bg-[#FFB800] flex items-center justify-center transition-transform duration-700 hover:scale-105">
          <Image
            src="/images/logo.png"
            alt="Gokulraj Pictures Logo"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 144px, 176px"
          />
        </div>
      </div>

      {/* "A DIFFERENT BANNER MEDIA COMPANY" in White (Font Size 19px) with Cinematic Typography & Animation */}
      <div
        ref={textRef}
        className="flex items-center justify-center text-center px-6 opacity-0"
      >
        <span className="text-white text-[15px] sm:text-[17px] md:text-[19px] font-sans font-light uppercase tracking-[0.25em] sm:tracking-[0.32em] md:tracking-[0.36em] leading-relaxed drop-shadow-[0_0_18px_rgba(255,255,255,0.45)]">
          A DIFFERENT BANNER MEDIA COMPANY
        </span>
      </div>
    </div>
  );
}
