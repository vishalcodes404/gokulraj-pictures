'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function EditorialIntro() {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introRef.current) return;

    gsap.fromTo(
      introRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, delay: 0.6, ease: 'power2.out' }
    );
  }, []);

  return (
    <section aria-label="Studio Introduction">
      <div ref={introRef} className="editorial-intro" style={{ opacity: 0 }}>
        <p>
          Gokulraj is an award-winning Indian fine-art wedding and portrait
          photographer. Based in Coimbatore, Tamil Nadu, he travels globally to
          capture timeless, narrative-driven stories with a fashion sensibility
          and fine-art elegance.
        </p>
      </div>

      {/* Subtle divider */}
      <div className="editorial-divider" style={{ marginBottom: 48 }} />
    </section>
  );
}
