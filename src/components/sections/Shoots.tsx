'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
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
      'Wedding Photography',
      'Candid & Sacred Moments',
      'Cinematic 4K Highlights',
      'Traditional Ceremonies',
    ],
    image: '/images/portfolio/wedding-1.png',
    isFullWidth: true,
  },
  {
    id: 'pre-wedding',
    number: '02',
    title: 'PRE-WEDDING',
    tagline: 'Two people. One story.',
    tags: [
      'Couple Shoots',
      'Outdoor Heritage Concepts',
      'Cinematic Love Stories',
      'Save-the-Date Visuals',
    ],
    image: '/images/portfolio/prewedding.png',
  },
  {
    id: 'baby-newborn',
    number: '03',
    title: 'BABY & NEWBORN',
    tagline: 'Little moments. Lifetime memories.',
    tags: [
      'Newborn Fine Art',
      'Baby Portraits',
      '1st Birthday Cake Smash',
      'Milestone Memories',
    ],
    image: '/images/portfolio/baby.png',
  },
  {
    id: 'model-fashion',
    number: '04',
    title: 'MODEL / FASHION',
    tagline: 'Your look. Our lens.',
    tags: [
      'Fashion Portraits',
      'Agency Lookbooks',
      'Editorial Brand Campaigns',
      'High-Fashion Portfolios',
    ],
    image: '/images/portfolio/fashion.png',
    isFullWidth: true,
  },
  {
    id: 'events-celebrations',
    number: '05',
    title: 'EVENTS & CELEBRATIONS',
    tagline: 'Celebrate it. Remember it.',
    tags: [
      'Birthdays & Galas',
      'Engagements & Sangeet',
      'Anniversaries',
      'Private Family Parties',
    ],
    image: '/images/portfolio/event.png',
  },
  {
    id: 'commercial-brand',
    number: '06',
    title: 'COMMERCIAL / BRAND',
    tagline: 'Make your brand impossible to ignore.',
    tags: [
      'Product Photography',
      'Brand Commercials',
      'Social Media Visuals',
      'Corporate Films',
    ],
    image: '/images/portfolio/commercial.png',
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
      className="relative min-h-screen bg-white text-[#111111] pt-[120px] pb-[120px] select-none flex flex-col justify-center items-center w-full"
      aria-label="Shoots Category Gallery"
    >
      {/* Hero Header Section */}
      <div
        ref={headerRef}
        className="w-full max-w-[1380px] mx-auto px-6 sm:px-8 mb-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        {/* Left Header Content */}
        <div className="flex-1 text-left">
          <span className="text-[10px] sm:text-xs tracking-[0.45em] text-[#B8860B] uppercase font-sans font-semibold block mb-3">
            EVERY STORY DESERVES A FRAME
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#111111] tracking-[0.1em] uppercase leading-tight mb-4">
            OUR SHOOTS
          </h1>

          {/* Camera Line Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="w-12 h-[1px] bg-[#B8860B]" />
            <FaCamera className="text-[#B8860B] text-xs" />
            <div className="w-12 h-[1px] bg-[#B8860B]" />
          </div>

          <p className="font-serif italic text-sm sm:text-base text-[#555555] leading-relaxed max-w-md">
            We capture celebrations, connections, personalities and moments that
            deserve to live forever.
          </p>
        </div>

        {/* Right Side Curated Showcase */}
        <div className="w-full md:w-[500px] lg:w-[580px] h-[280px] sm:h-[320px] rounded-2xl overflow-hidden relative border border-black/10 shadow-lg">
          <Image
            src="/images/portfolio/wedding-1.png"
            alt="Royal Indian Wedding Shoot by Gokulraj Pictures"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 580px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 text-white pointer-events-none">
            <span className="font-serif text-lg tracking-[0.15em] uppercase font-light block">
              Heirloom Artistry
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5C158] font-sans">
              Coimbatore &amp; Worldwide
            </span>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="w-full max-w-[1380px] mx-auto px-6 my-10 relative z-10 flex items-center justify-center gap-4">
        <div className="flex-1 h-[1px] bg-black/10" />
        <span className="text-xs tracking-[0.35em] text-[#B8860B] uppercase font-sans font-semibold">
          ◆ &nbsp; WHAT WE CAPTURE &nbsp; ◆
        </span>
        <div className="flex-1 h-[1px] bg-black/10" />
      </div>

      {/* Bento Cards Grid */}
      <div
        ref={gridRef}
        className="w-full max-w-[1380px] mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10"
      >
        {SHOOT_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className={`relative rounded-[22px] border border-black/10 bg-[#FAFAFA] overflow-hidden group hover:border-[#B8860B]/60 hover:shadow-xl transition-all duration-500 min-h-[320px] sm:min-h-[350px] flex flex-col justify-between ${
              cat.isFullWidth ? 'md:col-span-2' : 'md:col-span-1'
            }`}
          >
            {/* Background Image (Right Aligned) */}
            <div className="absolute inset-y-0 right-0 w-full sm:w-[58%] md:w-[55%] h-full overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/90 sm:via-[#FAFAFA]/75 to-transparent pointer-events-none" />
            </div>

            {/* Content Box */}
            <div className="relative z-20 p-7 sm:p-9 flex flex-col justify-between h-full max-w-lg text-left">
              <div>
                {/* Number */}
                <span className="text-xs text-[#B8860B] font-mono tracking-widest font-semibold block mb-1">
                  {cat.number}
                </span>

                {/* Title */}
                <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] tracking-[0.12em] uppercase leading-tight mb-2 group-hover:text-[#B8860B] transition-colors">
                  {cat.title}
                </h2>

                {/* Tagline */}
                <p className="font-serif italic text-xs sm:text-sm text-[#B8860B] font-medium mb-4 block">
                  {cat.tagline}
                </p>

                {/* Divider Line */}
                <div className="w-10 h-[1px] bg-[#B8860B] mb-4" />

                {/* Sub-services / Tags */}
                <div className="space-y-1 text-xs text-[#555555] font-sans leading-relaxed tracking-wide">
                  {cat.tags.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-6">
                <a
                  href={`https://wa.me/919894738911?text=${encodeURIComponent(
                    `Hi Gokulraj Pictures! I would like to book a ${cat.title} shoot.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.25em] text-[#111111] group-hover:text-[#B8860B] font-semibold uppercase inline-flex items-center gap-2 group-hover:translate-x-1 transition-all duration-300"
                >
                  <span>BOOK THIS SHOOT</span>
                  <FaArrowRight className="w-3 h-3 text-[#B8860B]" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-8 mt-14 relative z-10">
        <div className="rounded-[22px] border border-black/10 bg-[#FAFAFA] p-6 sm:p-8 lg:p-9 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          {/* Left Icon & Text */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5">
            <div className="w-14 h-14 rounded-2xl border border-black/10 flex items-center justify-center text-[#B8860B] bg-white shrink-0 shadow-sm">
              <FaCamera className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif text-sm sm:text-base lg:text-lg tracking-[0.2em] text-[#111111] uppercase font-medium">
                HAVE A MOMENT WORTH CAPTURING?
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-[#666666] mt-1 block">
                Let&apos;s create something unforgettable.
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#111111] text-white hover:bg-[#B8860B] font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer"
          >
            <span>BOOK YOUR SHOOT</span>
            <FaArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
