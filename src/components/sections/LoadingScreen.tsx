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

  useEffect(() => {
    // 1. Preload Hero Image
    if (typeof window !== 'undefined') {
      const heroImage = new window.Image();
      heroImage.src = '/images/hero/hero-bg.png';
    }

    // 2. Animate logo entrance
    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' }
    );

    // 3. Transition out after loading finishes (~2.5s)
    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => {
          onComplete();
        },
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100000] bg-[#050505] flex items-center justify-center select-none cursor-wait"
      aria-label="Loading Gokulraj Pictures"
    >
      {/* Centered Logo with soft gold glow and breathing effect */}
      <div
        ref={logoRef}
        className="relative flex items-center justify-center logo-glow"
      >
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-[#FFBA00]/30 shadow-[0_0_50px_rgba(255,186,0,0.25)]">
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
    </div>
  );
}
