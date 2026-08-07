'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from '@/src/constants/portfolio';
import { PortfolioProject, PortfolioCategory } from '@/src/types';
import PortfolioLightbox from '@/src/components/ui/PortfolioLightbox';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Filter projects by active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  // GSAP Entrance & ScrollTrigger Animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header reveal animation
    const headerElements = headerRef.current?.querySelectorAll('.portfolio-anim') || [];
    gsap.fromTo(
      headerElements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Filter bar stagger reveal
    const filterButtons = filterRef.current?.querySelectorAll('.filter-btn') || [];
    gsap.fromTo(
      filterButtons,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: filterRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Animate grid items on category change or load more
  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.portfolio-card');
    if (items && items.length > 0) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          overwrite: 'auto',
        }
      );
    }
  }, [activeCategory, visibleCount]);

  // Category switch handler
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  // Lightbox Navigation handlers
  const handleLightboxNavigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (!selectedProject) return;
      const currentIndex = PORTFOLIO_PROJECTS.findIndex(
        (p) => p.id === selectedProject.id
      );
      let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (newIndex >= PORTFOLIO_PROJECTS.length) newIndex = 0;
      if (newIndex < 0) newIndex = PORTFOLIO_PROJECTS.length - 1;
      setSelectedProject(PORTFOLIO_PROJECTS[newIndex]);
    },
    [selectedProject]
  );

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative pb-28 pt-4 bg-white text-[#111111] overflow-hidden select-none"
      aria-label="Portfolio Gallery"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        {/* Category Filter Bar */}
        <div
          ref={filterRef}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12 lg:mb-16"
        >
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`filter-btn px-4 py-1.5 rounded-full text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-transparent text-[#111111]/70 border-black/10 hover:border-black/40 hover:text-[#111111]'
                }`}
                data-cursor="button"
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Editorial Masonry Gallery Grid matching image2.png */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 items-start"
        >
          {visibleProjects.map((project, index) => {
            // Editorial staggered aspect ratio heights matching reference image
            const heightClasses =
              project.aspectRatio === 'tall'
                ? 'h-[520px] sm:h-[600px]'
                : project.aspectRatio === 'wide'
                ? 'h-[320px] sm:h-[380px]'
                : project.aspectRatio === 'square'
                ? 'h-[400px] sm:h-[450px]'
                : 'h-[450px] sm:h-[500px]';

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`portfolio-card group relative w-full ${heightClasses} overflow-hidden bg-[#FAFAFA] cursor-pointer transition-all duration-700 hover:opacity-95`}
                data-cursor="view"
              >
                {/* Image Component */}
                <Image
                  src={project.coverImage}
                  alt={`${project.title} - Gokulraj Pictures`}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />

                {/* Subtle Hover Gradient & Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                  <span className="text-[10px] tracking-[0.25em] text-[#FFBA00] uppercase font-semibold mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-display font-light text-white leading-tight">
                    {project.title}
                  </h3>
                  <span className="text-[11px] text-white/80 font-light mt-1">
                    {project.location || 'Chennai'} • {project.year || '2026'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Stories Button */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-16 lg:mt-20 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3.5 bg-transparent border border-[#111111] text-[#111111] font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#111111] hover:text-white"
              data-cursor="button"
            >
              Load More Stories
            </button>
          </div>
        )}
      </div>

      {/* Vertical Fixed BACK TO TOP indicator on Bottom Left matching image2.png */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-12 left-6 z-40 origin-bottom-left -rotate-90 text-[10px] tracking-[0.3em] font-sans text-[#111111]/60 hover:text-[#111111] uppercase font-medium cursor-pointer transition-colors duration-300 hidden md:block"
        aria-label="Back to top"
      >
        BACK TO TOP
      </div>

      {/* Fullscreen Lightbox Modal */}
      <PortfolioLightbox
        project={selectedProject}
        projects={PORTFOLIO_PROJECTS}
        onClose={() => setSelectedProject(null)}
        onNavigate={handleLightboxNavigate}
      />
    </section>
  );
}
