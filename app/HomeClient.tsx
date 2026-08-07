'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import loading screen (client-only)
const LoadingScreen = dynamic(() => import('@/src/components/sections/LoadingScreen'), { ssr: false });

// Import BrandIntro directly (not dynamic) so it's ready immediately when loading finishes
import BrandIntro from '@/src/components/sections/BrandIntro';

import EditorialHeader from '@/src/components/sections/EditorialHeader';
import EditorialIntro from '@/src/components/sections/EditorialIntro';
import EditorialGallery from '@/src/components/sections/EditorialGallery';
import EditorialFooter from '@/src/components/sections/EditorialFooter';

type Phase = 'loading' | 'brandIntro' | 'main';

export default function HomeClient() {
  const [phase, setPhase] = useState<Phase>('loading');

  const handleLoadingComplete = useCallback(() => {
    setPhase('brandIntro');
  }, []);

  const handleBrandIntroComplete = useCallback(() => {
    setPhase('main');
  }, []);

  return (
    <>
      {/* 1. Loading Screen — sits on top of everything */}
      {phase === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* 2. Brand Intro — preloaded behind loading screen, visible once loading completes */}
      {(phase === 'loading' || phase === 'brandIntro') && (
        <BrandIntro onComplete={handleBrandIntroComplete} isActive={phase === 'brandIntro'} />
      )}

      {/* 3. Main Editorial Homepage */}
      {phase === 'main' && (
        <main
          className="relative min-h-screen"
          style={{ background: '#FFFFFF', color: '#1a1a1a' }}
        >
          <EditorialHeader />
          <EditorialIntro />
          <EditorialGallery />
          <EditorialFooter />

          <button
            className="vertical-back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            BACK TO TOP
          </button>
        </main>
      )}
    </>
  );
}
