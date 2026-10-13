'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_PROJECTS } from '@/src/constants/portfolio';
import { PortfolioProject } from '@/src/types';
import { FaArrowLeft, FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

interface ProjectPageClientProps {
  project: PortfolioProject;
  prevProject: PortfolioProject | null;
  nextProject: PortfolioProject | null;
}

export default function ProjectPageClient({ project, prevProject, nextProject }: ProjectPageClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    // Hero animation
    const tl = gsap.timeline();

    tl.from(heroRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1.2,
      ease: 'power3.out',
    });

    tl.from(
      heroRef.current?.querySelectorAll('.hero-text') || [],
      {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    // Details
    gsap.from(detailsRef.current?.querySelectorAll('.detail-item') || [], {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: detailsRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Gallery images
    const galleryImages = galleryRef.current?.querySelectorAll('.gallery-image');
    if (galleryImages) {
      gsap.from(galleryImages, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? project.images.length - 1 : lightboxIndex - 1);
    }
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % project.images.length);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Fullscreen Hero */}
      <div ref={heroRef} className="relative h-[70vh] lg:h-[85vh] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.2)]" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="section-container">
            <span className="hero-text label-text block mb-4">{project.category}</span>
            <h1 className="hero-text heading-xl mb-4">{project.title}</h1>
          </div>
        </div>

        {/* Back button */}
        <Link
          href="/#shoots"
          className="absolute top-24 left-8 lg:left-16 flex items-center gap-2 text-sm text-foreground-muted hover:text-accent transition-colors"
        >
          <FaArrowLeft className="w-3 h-3" />
          Back to Shoots
        </Link>
      </div>

      {/* Project Details */}
      <div ref={detailsRef} className="section-container py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Description */}
          <div className="lg:col-span-2">
            <p className="detail-item body-lg text-lg leading-relaxed">{project.description}</p>
          </div>

          {/* Details Sidebar */}
          <div className="space-y-6">
            {project.client && (
              <div className="detail-item">
                <h4 className="label-text mb-2">Client</h4>
                <p className="text-white">{project.client}</p>
              </div>
            )}
            {project.date && (
              <div className="detail-item">
                <h4 className="label-text mb-2">Date</h4>
                <p className="text-white">{project.date}</p>
              </div>
            )}
            {project.location && (
              <div className="detail-item">
                <h4 className="label-text mb-2">Location</h4>
                <p className="text-white">{project.location}</p>
              </div>
            )}
            <div className="detail-item">
              <h4 className="label-text mb-2">Category</h4>
              <p className="text-white">{project.category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div ref={galleryRef} className="section-container pb-24">
        <h2 className="heading-md mb-12">
          Project <span className="text-accent">Gallery</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.images.map((image, index) => (
            <div
              key={index}
              className="gallery-image relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer image-hover-zoom group"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image}
                alt={`${project.title} - Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm tracking-widest uppercase">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous / Next Navigation */}
      <div className="border-t border-border">
        <div className="section-container">
          <div className="grid grid-cols-2 min-h-[120px]">
            {prevProject ? (
              <Link
                href={`/portfolio/${prevProject.slug}`}
                className="flex items-center gap-4 py-8 pr-4 group border-r border-border"
              >
                <FaArrowLeft className="w-4 h-4 text-foreground-muted group-hover:text-accent transition-colors" />
                <div>
                  <span className="label-text text-xs block mb-1">Previous</span>
                  <span className="text-white group-hover:text-accent transition-colors">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/portfolio/${nextProject.slug}`}
                className="flex items-center justify-end gap-4 py-8 pl-4 group text-right"
              >
                <div>
                  <span className="label-text text-xs block mb-1">Next</span>
                  <span className="text-white group-hover:text-accent transition-colors">
                    {nextProject.title}
                  </span>
                </div>
                <FaArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-accent transition-colors" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-6 right-6 text-white hover:text-accent transition-colors z-10"
            aria-label="Close lightbox"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-10"
            aria-label="Previous image"
          >
            <FaChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-10"
            aria-label="Next image"
          >
            <FaChevronRight className="w-8 h-8" />
          </button>

          <div
            className="relative w-[90vw] h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={project.images[lightboxIndex]}
              alt={`${project.title} - Image ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground-muted text-sm">
            {lightboxIndex + 1} / {project.images.length}
          </div>
        </div>
      )}
    </main>
  );
}
