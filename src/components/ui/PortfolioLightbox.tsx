'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortfolioProject } from '@/src/types';

interface PortfolioLightboxProps {
  project: PortfolioProject | null;
  projects: PortfolioProject[];
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
}

export default function PortfolioLightbox({
  project,
  projects,
  onClose,
  onNavigate,
}: PortfolioLightboxProps) {
  useEffect(() => {
    if (!project) return;

    // Handle Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigate('next');
      } else if (e.key === 'ArrowLeft') {
        onNavigate('prev');
      }
    };

    // Lock body scroll when modal open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, onNavigate]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);

  return (
    <div
      className="fixed inset-0 z-[100000] bg-[#050505]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 select-none animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${project.title}`}
    >
      {/* Background Dim Backdrop */}
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#FFBA00] hover:border-[#FFBA00]/50 transition-all duration-300 group"
        aria-label="Close preview"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">✕</span>
      </button>

      {/* Main Content Modal Container */}
      <div className="relative z-10 w-full max-w-6xl max-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-8 pointer-events-auto">
        {/* Previous Button */}
        <button
          onClick={() => onNavigate('prev')}
          className="absolute left-0 lg:-left-16 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#FFBA00] hover:border-[#FFBA00]/50 transition-all duration-300"
          aria-label="Previous project"
        >
          <span className="text-xl">←</span>
        </button>

        {/* Large Enlarged Image Display */}
        <div className="relative w-full lg:w-2/3 h-[50vh] lg:h-[75vh] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-[#111111]">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-contain p-2 md:p-4"
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </div>

        {/* Project Metadata Side Panel */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center text-left space-y-6 px-2">
          {/* Category Tag */}
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFBA00]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#FFBA00] uppercase font-sans">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-3xl sm:text-4xl font-display font-normal text-white leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#CFCFCF] font-light leading-relaxed">
            {project.description}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs">
            <div>
              <span className="block text-white/50 uppercase tracking-widest text-[10px] mb-1">
                LOCATION
              </span>
              <span className="text-white font-medium">{project.location || 'Tamil Nadu'}</span>
            </div>
            <div>
              <span className="block text-white/50 uppercase tracking-widest text-[10px] mb-1">
                YEAR
              </span>
              <span className="text-white font-medium">{project.year || '2026'}</span>
            </div>
            {project.client && (
              <div className="col-span-2">
                <span className="block text-white/50 uppercase tracking-widest text-[10px] mb-1">
                  CLIENT / COUPLE
                </span>
                <span className="text-white font-medium">{project.client}</span>
              </div>
            )}
          </div>

          {/* View Full Story CTA Button */}
          <div className="pt-2 flex items-center gap-4">
            <Link
              href={`/portfolio/${project.slug}`}
              className="px-8 py-3.5 bg-[#FFBA00] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_0_20px_rgba(255,186,0,0.4)] transition-all duration-300 hover:bg-[#FFD24D] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,186,0,0.6)] active:scale-95 text-center"
            >
              View Full Story
            </Link>
            <span className="text-xs font-mono text-white/40">
              {currentIndex + 1} / {projects.length}
            </span>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => onNavigate('next')}
          className="absolute right-0 lg:-right-16 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#FFBA00] hover:border-[#FFBA00]/50 transition-all duration-300"
          aria-label="Next project"
        >
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
}
