'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function Hero() {
  const introRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    if (introRef.current) {
      tl.fromTo(
        introRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' }
      );
    }

    if (galleryRef.current) {
      tl.fromTo(
        galleryRef.current.children,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.18, ease: 'power2.out' },
        '-=0.6'
      );
    }
  }, []);

  return (
    <section
      id="home"
      className="w-full bg-white text-[#111111] select-none pt-8 pb-20 overflow-hidden"
      aria-label="Editorial Journal Homepage"
    >
      {/* SECTION 2: Studio Introduction Paragraph */}
      <div
        ref={introRef}
        className="max-w-3xl mx-auto text-center px-6 mb-16 lg:mb-20"
      >
        <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#111111]/85 leading-relaxed font-light">
          Gokulraj is an Indian based journalistic style wedding and lifestyle photographer, with a background in fashion photography and an eye for beautiful details. Gokulraj is available for commissions worldwide.
        </p>
      </div>

      {/* SECTION 3: Featured Editorial Gallery (Asymmetrical 3-Column Layout matching cassandraladru.com) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {/* COLUMN 1: Tall Vertical Portrait Image */}
          <div className="relative w-full h-[520px] sm:h-[640px] lg:h-[760px] rounded-2xl overflow-hidden bg-[#FAFAFA] border border-black/5 shadow-xs group cursor-pointer" data-cursor="view">
            <Image
              src="/images/portfolio/wedding-1.png"
              alt="Gokulraj Pictures Luxury Wedding"
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Subtle Gradient & Hover Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.25em] text-white/90 uppercase font-semibold">
                DESTINATION WEDDINGS
              </span>
            </div>
          </div>

          {/* COLUMN 2: Tall Vertical Moment Image */}
          <div className="relative w-full h-[520px] sm:h-[640px] lg:h-[760px] rounded-2xl overflow-hidden bg-[#FAFAFA] border border-black/5 shadow-xs group cursor-pointer" data-cursor="view">
            <Image
              src="/images/portfolio/candid.png"
              alt="Gokulraj Pictures Journalistic Wedding Moment"
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Subtle Gradient & Hover Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.25em] text-white/90 uppercase font-semibold">
                CANDID MOMENTS
              </span>
            </div>
          </div>

          {/* COLUMN 3: Stacked 2-Image Column */}
          <div className="flex flex-col gap-6 lg:gap-8 w-full md:col-span-2 lg:col-span-1">
            {/* Top Stacked Image (Portrait) */}
            <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[470px] rounded-2xl overflow-hidden bg-[#FAFAFA] border border-black/5 shadow-xs group cursor-pointer" data-cursor="view">
              <Image
                src="/images/portfolio/prewedding.png"
                alt="Gokulraj Pictures Lifestyle & Portraiture"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                <span className="text-[10px] tracking-[0.25em] text-white/90 uppercase font-semibold">
                  PRE-WEDDING & PORTRAITURE
                </span>
              </div>
            </div>

            {/* Bottom Stacked Image (Detail / Fashion) */}
            <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[266px] rounded-2xl overflow-hidden bg-[#FAFAFA] border border-black/5 shadow-xs group cursor-pointer" data-cursor="view">
              <Image
                src="/images/portfolio/fashion.png"
                alt="Gokulraj Pictures Editorial Details"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                <span className="text-[10px] tracking-[0.25em] text-white/90 uppercase font-semibold">
                  EDITORIAL DETAILS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Fixed BACK TO TOP link on Bottom Left matching cassandraladru.com */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-12 left-6 z-40 origin-bottom-left -rotate-90 text-[10px] tracking-[0.3em] font-sans text-[#111111]/60 hover:text-[#111111] uppercase font-medium cursor-pointer transition-colors duration-300 hidden md:block"
        aria-label="Back to top"
      >
        BACK TO TOP
      </div>
    </section>
  );
}
