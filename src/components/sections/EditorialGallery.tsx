'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/*
  Long-form editorial masonry gallery — photos only, no clicks, no lightbox.
  Reads 25 image slots from /images/gallery/config.json (managed via /admin).
*/

interface GallerySlot {
  id: number;
  image: string;
  title: string;
  category: string;
  spanClass: string;
}

// Fallback data in case config hasn't loaded yet
const FALLBACK_SLOTS: GallerySlot[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  image: `/images/gallery/${i + 1}.png`,
  title: `Photo ${i + 1}`,
  category: 'Gallery',
  spanClass: '',
}));

export default function EditorialGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState<GallerySlot[]>(FALLBACK_SLOTS);
  const animatedRef = useRef(false);

  // Load gallery config
  useEffect(() => {
    fetch('/images/gallery/config.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.slots && data.slots.length > 0) {
          setSlots(data.slots);
        }
      })
      .catch(() => {
        // Fallback already set
      });
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    if (!galleryRef.current) return;

    const items = galleryRef.current.querySelectorAll('.editorial-masonry-item');
    if (!items || items.length === 0) return;

    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [slots]);

  return (
    <section id="gallery" aria-label="Editorial Gallery">
      <div className="editorial-gallery">
        <div ref={galleryRef} className="editorial-masonry">
          {slots.map((slot, index) => (
            <div
              key={`gallery-${slot.id}`}
              className={`editorial-masonry-item ${slot.spanClass}`}
            >
              <Image
                src={slot.image}
                alt={`${slot.title} — Gokulraj Pictures`}
                fill
                className="editorial-img"
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={index < 4 ? undefined : 'lazy'}
                priority={index < 4}
                quality={90}
                unoptimized={false}
              />

              {/* Hover overlay with caption — display only, no click */}
              <div className="editorial-overlay">
                <span className="caption-category">{slot.category}</span>
                <span className="caption-title">{slot.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
