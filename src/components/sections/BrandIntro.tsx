'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface BrandIntroProps {
  onComplete?: () => void;
  isActive?: boolean;
  isStandalonePage?: boolean;
}

export default function BrandIntro({
  onComplete,
  isActive = true,
  isStandalonePage = false,
}: BrandIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const signatureSvgRef = useRef<SVGSVGElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const paths = signatureSvgRef.current?.querySelectorAll<SVGPathElement>('.signature-path');
    if (!paths) return;

    // Measure exact path lengths for smooth stroke-dashoffset handwriting writing effect
    paths.forEach((path) => {
      const len = Math.ceil(path.getTotalLength());
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    });

    // Animate signature paths sequentially using GSAP timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (!isStandalonePage && onComplete) {
            gsap.to(containerRef.current, {
              opacity: 0,
              scale: 1.04,
              filter: 'blur(16px)',
              duration: 1.2,
              ease: 'power2.inOut',
              delay: 1.2,
              onComplete: () => onComplete(),
            });
          }
        },
      });

      // 1. Capital 'G' outer arch & bowl (Path 0)
      if (paths[0]) {
        tl.to(paths[0], {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power2.inOut',
        });
      }
      // 2. Capital 'G' inner crossbar connecting to 'o' (Path 1)
      if (paths[1]) {
        tl.to(paths[1], {
          strokeDashoffset: 0,
          duration: 0.4,
          ease: 'power1.out',
        });
      }
      // 3. Cursive 'okulraj' letter paths (Path 2)
      if (paths[2]) {
        tl.to(
          paths[2],
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: 'power1.inOut',
          },
          '-=0.1'
        );
      }
      // 4. 'j' Dot (Path 3)
      if (paths[3]) {
        tl.to(paths[3], {
          strokeDashoffset: 0,
          duration: 0.2,
          ease: 'back.out(2)',
        });
      }
      // 5. Sweeping Baseline Underline Flourish (Path 4)
      if (paths[4]) {
        tl.to(
          paths[4],
          {
            strokeDashoffset: 0,
            duration: 1.0,
            ease: 'power2.out',
          },
          '+=0.1'
        );
      }
      // 6. Parallel Tip Flourish on Right (Path 5)
      if (paths[5]) {
        tl.to(paths[5], {
          strokeDashoffset: 0,
          duration: 0.3,
          ease: 'power1.out',
        });
      }

      // 7. White 'PICTURES' Subtext Fade In
      tl.to(
        '.brand-pictures-subtext',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive, onComplete, isStandalonePage, animationKey]);

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      key={animationKey}
      className={`relative w-full min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center overflow-hidden select-none ${!isStandalonePage ? 'fixed inset-0 z-[99999]' : ''
        }`}
      aria-label="Gokulraj Pictures Signature Intro"
    >
      {/* Faint Luminous Warm Gold Radial Fade Behind Signature */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 58%, rgba(229, 184, 42, 0.10) 0%, rgba(184, 138, 20, 0.025) 50%, rgba(3, 3, 3, 0) 100%)',
        }}
      />

      {/* Main Signature Content Container - Slightly Smaller Scale & Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-3xl">
        <svg
          ref={signatureSvgRef}
          viewBox="0 0 960 350"
          className="w-[240px] sm:w-[350px] md:w-[440px] lg:w-[500px] max-w-[85vw] h-auto drop-shadow-[0_0_10px_rgba(255,200,0,0.5)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Vibrant Rich Logo Gold Gradient */}
            <linearGradient id="warmGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D6A928" />
              <stop offset="35%" stopColor="#F0C84B" />
              <stop offset="65%" stopColor="#E5B93D" />
              <stop offset="100%" stopColor="#C99A22" />
            </linearGradient>

            {/* Tight Sharp Golden Glow Filter */}
            <filter id="softGoldGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="
                     1 0 0 0 0.15
                     0 1 0 0 0.12
                     0 0 0.3 0 0
                     0 0 0 0.35 0
                      "
                result="softGlow"
              />
              <feMerge>
                <feMergeNode in="softGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Under-layer Soft Warm Golden Glow Halo */}
          <g filter="url(#softGoldGlow)" opacity="0.9">
            {/* 1. Capital 'G' High Top Arch & Bottom Bowl */}
            <path
              d="M 315,68 C 265,48 190,75 165,130 C 140,185 160,250 220,275 C 280,295 335,265 335,210 C 335,175 285,175 250,175"
              stroke="#FFC800"
              strokeWidth="4.0"
              strokeLinecap="round"
              className="signature-path"
            />
            {/* 2. Capital 'G' Inner Crossbar */}
            <path
              d="M 250,175 L 348,175"
              stroke="#FFC800"
              strokeWidth="4.0"
              strokeLinecap="round"
              className="signature-path"
            />
            {/* 3. 'okulraj' Letters */}
            <path
              d="M 352,175 C 352,152 388,152 388,175 C 388,198 352,198 352,175 M 420,95 L 420,212 M 448,155 L 420,178 L 452,212 M 478,155 C 478,198 508,198 508,155 L 508,212 M 538,95 L 538,212 M 562,155 L 562,212 M 562,170 C 568,155 585,155 588,160 M 612,175 C 612,152 642,152 642,175 C 642,198 612,198 612,175 M 642,155 L 642,212 M 670,140 L 670,275 C 670,295 650,300 638,288"
              stroke="#FFC800"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="signature-path"
            />
            {/* 4. 'j' Dot */}
            <path
              d="M 670,112 A 2.5,2.5 0 1,1 670,112.1"
              stroke="#FFC800"
              strokeWidth="4.2"
              strokeLinecap="round"
              className="signature-path"
            />
            {/* 5. Baseline Underline Flourish */}
            <path
              d="M 130,268 C 280,280 540,284 760,258 C 845,245 920,222 945,205"
              stroke="#FFC800"
              strokeWidth="3.6"
              strokeLinecap="round"
              className="signature-path"
            />
            {/* 6. Right Parallel Tip Flourish */}
            <path
              d="M 878,200 L 940,192"
              stroke="#FFC800"
              strokeWidth="3.0"
              strokeLinecap="round"
              className="signature-path"
            />
          </g>

          {/* Crisp Sharp Foreground Warm Gold Stroke Layer */}
          <g>
            {/* 1. Capital 'G' High Top Arch & Bottom Bowl */}
            <path
              d="M 315,68 C 265,48 190,75 165,130 C 140,185 160,250 220,275 C 280,295 335,265 335,210 C 335,175 285,175 250,175"
              stroke="url(#warmGoldGrad)"
              strokeWidth="3.0"
              strokeLinecap="round"
              className="signature-path"
            />
            {/* 2. Capital 'G' Inner Crossbar */}
            <path
              d="M 250,175 L 348,175"
              stroke="url(#warmGoldGrad)"
              strokeWidth="3.0"
              strokeLinecap="round"
              className="signature-path"
            />
            {/* 3. 'okulraj' Letters */}
            <path
              d="M 352,175 C 352,152 388,152 388,175 C 388,198 352,198 352,175 M 420,95 L 420,212 M 448,155 L 420,178 L 452,212 M 478,155 C 478,198 508,198 508,155 L 508,212 M 538,95 L 538,212 M 562,155 L 562,212 M 562,170 C 568,155 585,155 588,160 M 612,175 C 612,152 642,152 642,175 C 642,198 612,198 612,175 M 642,155 L 642,212 M 670,140 L 670,275 C 670,295 650,300 638,288"
              stroke="url(#warmGoldGrad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="signature-path"
            />
            {/* 4. 'j' Dot */}
            <path
              d="M 670,112 A 2.5,2.5 0 1,1 670,112.1"
              stroke="url(#warmGoldGrad)"
              strokeWidth="3.8"
              strokeLinecap="round"
              className="signature-path"
            />
            {/* 5. Baseline Underline Flourish */}
            <path
              d="M 130,268 C 280,280 540,284 760,258 C 845,245 920,222 945,205"
              stroke="url(#warmGoldGrad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              className="signature-path"
            />
            {/* 6. Right Parallel Tip Flourish */}
            <path
              d="M 878,200 L 940,192"
              stroke="url(#warmGoldGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="signature-path"
            />
          </g>
        </svg>

        {/* Sub-text: PICTURES */}
        <div className="brand-pictures-subtext opacity-0 translate-y-3 scale-95 mt-4 flex items-center justify-center gap-6 w-full max-w-sm">
          <span className="text-[12px] sm:text-sm font-sans font-medium tracking-[0.65em] uppercase text-white drop-shadow-[0_1px_4px_rgba(255,255,255,0.3)]">
            PICTURES
          </span>
        </div>

        {/* Standalone Replay Control */}
        {isStandalonePage && (
          <div className="mt-8 flex items-center justify-center z-20">
            <button
              onClick={handleReplay}
              className="px-5 py-2 rounded-full border border-[#E5B82A]/30 bg-[#E5B82A]/10 hover:bg-[#E5B82A]/20 text-[#F5CF47] text-[11px] uppercase tracking-widest font-semibold transition-all duration-300 shadow-[0_0_12px_rgba(229,184,42,0.12)] cursor-pointer active:scale-95"
            >
              Replay Animation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}










