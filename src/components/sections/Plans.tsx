'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  FaCamera,
  FaVideo,
  FaHeart,
  FaCrown,
  FaCheck,
  FaStar,
  FaArrowRight,
} from 'react-icons/fa';

export interface PlanItem {
  id: string;
  badge: string;
  title: string;
  price: string;
  subtitle: string;
  description: string;
  recommended?: boolean;
  icons: React.ReactNode[];
  features: string[];
}

const PACKAGES: PlanItem[] = [
  {
    id: 'basic',
    badge: 'BASIC',
    title: 'Basic Membership',
    price: '₹ 35,000',
    subtitle: 'One-time • Full Day Access',
    description: 'Perfect for beginners starting their journey with full photography access.',
    icons: [<FaCamera key="cam" className="w-5 h-5 text-[#E5C158]" />],
    features: [
      '1 Professional Photographer',
      '200 Photos in Premium Album',
      '1 Premium Frame (12 × 15")',
    ],
  },
  {
    id: 'standard',
    badge: 'STANDARD',
    title: 'Standard',
    price: '₹ 65,000',
    subtitle: 'One-time • Full Day Access',
    description: 'A perfect balance of photography and videography for your big day.',
    icons: [<FaVideo key="vid" className="w-5 h-5 text-[#E5C158]" />],
    features: [
      '1 Professional Photographer',
      '1 Professional Videographer',
      '250 Photos in 2 Premium Albums',
      '2 Premium Frames (12 × 15")',
    ],
  },
  {
    id: 'candid',
    badge: 'CANDID PACK',
    title: 'Candid Pack',
    price: '₹ 1,00,000',
    subtitle: 'One-time • Full Day Access',
    description: 'Capture every emotion with candid photography and cinematic videos.',
    icons: [<FaHeart key="heart" className="w-5 h-5 text-[#E5C158]" />],
    features: [
      '1 Professional Photographer',
      '1 Professional Videographer',
      'Candid Photos & Candid Videos',
      '300 Photos in 3 Premium Albums',
      '2 Premium Frames (12 × 15")',
      'Premium Couple Photo Book',
      'Cinematic Candid Video Highlights',
    ],
  },
  {
    id: 'complete',
    badge: 'COMPLETE PACKAGE',
    title: 'Complete Package',
    price: '₹ 1,70,000',
    subtitle: 'One-time • Full Day Access',
    description: 'The all-inclusive premium experience for unforgettable memories.',
    recommended: true,
    icons: [<FaCrown key="crown" className="w-5 h-5 text-[#E5C158]" />],
    features: [
      '1 Professional Photographer',
      '1 Professional Videographer',
      'Candid Photos & Candid Videos',
      '1 Drone for Aerial Coverage',
      'Wedding Coverage',
      'Reception Coverage',
      'Pre-Wedding or Post-Wedding Shoot',
      '350 Photos in 3 Premium Albums',
      'Premium Couple Photo Book',
      'Cinematic Wedding Highlights',
      '4 Premium Frames (12 × 18")',
      '2 Premium USB Drives (Photos & Videos)',
    ],
  },
];

export default function Plans() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    if (cardsRef.current) {
      tl.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }
  }, []);

  const getWhatsAppUrl = (pkgTitle: string, price: string) => {
    const text = `Hi Gokulraj Pictures! I am interested in booking the ${pkgTitle} package (${price}). Please share more details with me.`;
    return `https://wa.me/919894738911?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      ref={containerRef}
      id="plans"
      className="relative min-h-screen bg-[#050505] text-white pt-[120px] pb-[120px] select-none flex flex-col justify-center items-center w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.08),rgba(255,255,255,0))]"
      aria-label="Wedding Packages"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-[#D4AF37]/10 blur-[190px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div ref={headerRef} className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center mb-16 relative z-10 px-4">
        <span className="text-xs tracking-[0.38em] text-[#E5C158] uppercase font-sans font-medium block mb-3 text-center">
          G O K U L R A J &nbsp; P I C T U R E S
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.75rem] font-light text-white tracking-[0.2em] uppercase leading-tight mb-3 text-center">
          WEDDING PACKAGES
        </h1>
        {/* Diamond Line Divider */}
        <div className="flex items-center justify-center gap-3 my-3 opacity-70">
          <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <span className="text-[#E5C158] text-xs">◆</span>
          <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>
        <p className="font-serif italic text-base sm:text-lg text-white/70 text-center max-w-xl mx-auto block">
          Choose the perfect photography package for your special day.
        </p>
      </div>

      {/* 4 Package Cards Grid - Replicating Provided Image Exactly */}
      <div
        ref={cardsRef}
        className="w-full max-w-[1440px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5 items-stretch"
      >
        {PACKAGES.map((pkg) => {
          const isRec = pkg.recommended;
          const whatsappUrl = getWhatsAppUrl(pkg.title, pkg.price);

          return (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between rounded-[24px] px-8 sm:px-9 lg:px-9 pt-9 pb-8 sm:pt-10 sm:pb-9 transition-all duration-500 group h-full min-h-[680px] lg:min-h-[710px] ${isRec
                ? 'bg-[#0a0a0c] text-white border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:-translate-y-2 z-20'
                : 'bg-[#0a0a0c] text-white border border-[#D4AF37]/25 hover:border-[#D4AF37]/55 hover:bg-[#0e0e11] hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)]'
                }`}
            >
              {/* Floating Recommended Pill Badge at Top Right */}
              {isRec && (
                <div className="absolute -top-3.5 right-10 bg-gradient-to-r from-[#d9a24a] via-[#f0cc71] to-[#c78f35] text-[#111111] text-[10px] font-extrabold tracking-[0.2em] uppercase py-1 px-4 rounded-full flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/40 z-30">
                  <FaStar className="w-3 h-3 fill-current" />
                  RECOMMENDED
                </div>
              )}

              {/* Main Vertical Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Top Row: Icon Box (Left) + Badge Pill (Right) */}
                  <div className="w-full h-12 flex items-center justify-between mb-7">
                    {/* Icon Box: 48px x 48px square container with uniform w-5 h-5 icon */}
                    <div className="w-12 h-12 rounded-xl border border-[#D4AF37]/35 flex items-center justify-center bg-transparent group-hover:scale-105 group-hover:border-[#D4AF37]/70 transition-all duration-300 shrink-0">
                      {pkg.icons}
                    </div>

                    {/* Category Badge Pill: Uniform h-7 pill height */}
                    <span
                      className={`h-7 flex items-center justify-center text-[10px] tracking-[0.2em] font-sans font-medium uppercase px-3.5 rounded-full border transition-colors ${
                        isRec
                          ? 'text-[#E5C158] border-[#D4AF37]/50 bg-[#D4AF37]/10'
                          : 'text-[#E5C158]/90 border-[#D4AF37]/35 bg-transparent'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Price: Uniform size across all 4 cards (elegant, non-overpowering) */}
                  <div className="h-[40px] flex items-baseline mb-2 text-left">
                    <span className="text-3xl sm:text-[2.2rem] font-serif font-bold text-white tracking-tight leading-none whitespace-nowrap">
                      {pkg.price}
                    </span>
                  </div>

                  {/* Subtitle */}
                  <div className="h-4 flex items-center mb-5 text-left">
                    <p className="text-xs text-white/50 font-sans tracking-wide">
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Package Title: Uniform typography hierarchy */}
                  <div className="h-8 flex items-center mb-3 text-left">
                    <h2 className="text-xl sm:text-[1.35rem] font-serif text-[#E5C158] font-normal leading-snug">
                      {pkg.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <div className="h-[42px] flex items-center mb-6 text-left max-w-[96%]">
                    <p className="text-xs sm:text-[13px] text-white/60 font-sans leading-relaxed line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Divider Line */}
                  <div className="w-full h-[#1px] bg-[#D4AF37]/20 mb-6" />

                  {/* Features List */}
                  <ul className="space-y-3.5 text-xs sm:text-[13px] text-white/80 font-sans leading-relaxed w-full text-left">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-left">
                        {/* Checkmark Icon in Subtle Circle */}
                        <div className="w-4.5 h-4.5 rounded-full border border-[#D4AF37]/50 text-[#E5C158] flex items-center justify-center shrink-0 mt-0.5">
                          <FaCheck className="w-2.5 h-2.5 stroke-[2]" />
                        </div>
                        <span className="leading-snug flex-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* BOOK NOW Metallic Gold Button */}
                <div className="mt-auto pt-6 w-full">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-[54px] relative flex items-center justify-center rounded-xl bg-gradient-to-r from-[#d9a24a] via-[#f0cc71] to-[#c78f35] text-[#111111] shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:brightness-110 transition-all duration-300 group/btn"
                  >
                    <span className="font-sans font-extrabold text-xs tracking-[0.2em] uppercase">
                      BOOK NOW
                    </span>
                    <FaArrowRight className="absolute right-6 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Tagline Decoration */}
      <div className="w-full max-w-[1380px] mx-auto px-4 mt-20 pt-8 border-t border-white/10 flex items-center justify-center gap-2 text-xs tracking-[0.3em] font-sans uppercase text-[#E5C158]/70 z-10">
        <FaCamera className="w-3.5 h-3.5 text-[#E5C158]" />
        <span>MEMORIES LAST FOREVER</span>
      </div>
    </section>
  );
}



