'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaCamera, FaArrowRight } from 'react-icons/fa';

export interface ShootCategory {
  id: string;
  number: string;
  title: string;
  tagline: string;
  tags: string[];
  image: string;
  isFullWidth?: boolean;
}

const SHOOT_CATEGORIES: ShootCategory[] = [
  {
    id: 'wedding',
    number: '01',
    title: 'WEDDING',
    tagline: 'Your story. Your day. Your forever.',
    tags: [
      'Wedding Photography  •  Candid  •  Cinematic',
      'Traditional  •  Videography  •  Highlights',
    ],
    image:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    isFullWidth: true,
  },
  {
    id: 'pre-wedding',
    number: '02',
    title: 'PRE-WEDDING',
    tagline: 'Two people. One story.',
    tags: ['Couple Shoots  •  Outdoor  •  Cinematic Concepts  •  Save-the-Date'],
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'baby-newborn',
    number: '03',
    title: 'BABY & NEWBORN',
    tagline: 'Little moments. Lifetime memories.',
    tags: [
      'Newborn  •  Baby Portraits  •  1st Birthday Cake Smash  •  Milestone Shoots',
    ],
    image:
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'model-fashion',
    number: '04',
    title: 'MODEL / FASHION',
    tagline: 'Your look. Our lens.',
    tags: [
      'Fashion Portraits  •  Portfolio  •  Editorial Brand Shoots  •  Professional Portfolios',
    ],
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    isFullWidth: true,
  },
  {
    id: 'events-celebrations',
    number: '05',
    title: 'EVENTS & CELEBRATIONS',
    tagline: 'Celebrate it. Remember it.',
    tags: [
      'Birthdays  •  Engagements  •  Anniversaries',
      'Private Parties  •  Corporate Events',
    ],
    image:
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'commercial-brand',
    number: '06',
    title: 'COMMERCIAL / BRAND',
    tagline: 'Make your brand impossible to ignore.',
    tags: [
      'Product Photography  •  Brand Campaigns',
      'Social Media Content  •  Corporate Videos',
    ],
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
  },
];

export default function Shoots() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.15 });

    if (headerRef.current) {
      tl.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );
    }

    if (gridRef.current) {
      tl.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }
  }, []);

  const whatsappUrl = `https://wa.me/919894738911?text=${encodeURIComponent(
    'Hi Gokulraj Pictures! I would like to book a shoot. Please share details with me.'
  )}`;

  return (
    <section
      ref={containerRef}
      id="shoots"
      className="relative min-h-screen bg-[#050505] text-white pt-[140px] pb-[120px] select-none flex flex-col justify-center items-center w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.08),rgba(255,255,255,0))]"
      aria-label="Shoots Category Gallery"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#D4AF37]/10 blur-[200px] pointer-events-none rounded-full" />

      {/* Hero Header Section */}
      <div
        ref={headerRef}
        className="w-full max-w-[1380px] mx-auto px-6 sm:px-8 mb-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        {/* Left Header Content */}
        <div className="flex-1 text-left">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-[0.2em] uppercase leading-tight mb-2">
            SHOOTS
          </h1>

          <span className="text-xs sm:text-sm tracking-[0.38em] text-[#E5C158] uppercase font-sans font-medium block mb-4">
            EVERY STORY DESERVES A FRAME
          </span>

          {/* Camera Line Divider */}
          <div className="flex items-center gap-3 my-4 opacity-80">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <FaCamera className="text-[#E5C158] text-xs" />
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          <p className="font-serif italic text-sm sm:text-base text-white/75 leading-relaxed max-w-md">
            We capture celebrations, connections, personalities and moments that
            deserve to live forever.
          </p>
        </div>

        {/* Right Side Romantic Image Vignette */}
        <div className="w-full md:w-[500px] lg:w-[580px] h-[280px] sm:h-[320px] rounded-2xl overflow-hidden relative border border-[#D4AF37]/25 shadow-[0_0_40px_rgba(0,0,0,0.9)]">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
            alt="Romantic Couple Silhouette Shoot"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
        </div>
      </div>

      {/* Section Divider: WHAT WE CAPTURE */}
      <div className="w-full max-w-[1380px] mx-auto px-6 my-10 relative z-10 flex items-center justify-center gap-4">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />
        <span className="text-xs tracking-[0.35em] text-[#E5C158] uppercase font-sans font-semibold">
          ◆ &nbsp; WHAT WE CAPTURE &nbsp; ◆
        </span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />
      </div>

      {/* Bento Cards Grid (Exact Layout matching User Screenshot) */}
      <div
        ref={gridRef}
        className="w-full max-w-[1380px] mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 relative z-10"
      >
        {SHOOT_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className={`relative rounded-[22px] border border-[#D4AF37]/25 bg-[#0a0a0c] overflow-hidden group hover:border-[#D4AF37]/65 transition-all duration-500 min-h-[310px] sm:min-h-[340px] flex flex-col justify-between ${
              cat.isFullWidth ? 'md:col-span-2' : 'md:col-span-1'
            }`}
          >
            {/* Background Image (Right Aligned) */}
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-y-0 right-0 w-full sm:w-[62%] md:w-[58%] h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none opacity-85"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/90 sm:via-[#0a0a0c]/80 to-transparent z-10 pointer-events-none" />

            {/* Content Box */}
            <div className="relative z-20 p-7 sm:p-9 flex flex-col justify-between h-full max-w-lg text-left">
              <div>
                {/* Number */}
                <span className="text-xs text-[#E5C158] font-mono tracking-widest font-semibold block mb-1">
                  {cat.number}
                </span>

                {/* Title */}
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl text-white tracking-[0.15em] uppercase leading-tight mb-2">
                  {cat.title}
                </h2>

                {/* Tagline */}
                <p className="font-serif italic text-xs sm:text-sm text-[#E5C158]/90 mb-4 block">
                  {cat.tagline}
                </p>

                {/* Divider Line */}
                <div className="w-10 h-[1px] bg-[#D4AF37]/45 mb-4" />

                {/* Sub-services / Tags */}
                <div className="space-y-1 text-xs text-white/75 font-sans leading-relaxed tracking-wide">
                  {cat.tags.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.25em] text-[#E5C158] font-extrabold uppercase inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300"
                >
                  <span>EXPLORE</span>
                  <FaArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-8 mt-14 relative z-10">
        <div className="rounded-[22px] border border-[#D4AF37]/35 bg-[#0a0a0c] p-6 sm:p-8 lg:p-9 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.85)]">
          {/* Left Icon & Text */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5">
            <div className="w-14 h-14 rounded-2xl border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158] bg-white/[0.03] shrink-0">
              <FaCamera className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif text-sm sm:text-base lg:text-lg tracking-[0.25em] text-white uppercase font-medium">
                HAVE A MOMENT WORTH CAPTURING?
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-white/60 mt-1 block">
                Let's create something unforgettable.
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#d9a24a] via-[#f0cc71] to-[#c78f35] text-[#111111] font-extrabold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all shrink-0"
          >
            <span>BOOK YOUR SHOOT</span>
            <FaArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
