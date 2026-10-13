'use client';

import dynamic from 'next/dynamic';
import EditorialHeader from '@/src/components/sections/EditorialHeader';
import EditorialFooter from '@/src/components/sections/EditorialFooter';
import About from '@/src/components/sections/About';
import DifferentBannerSection from '@/src/components/sections/DifferentBannerSection';

const CustomCursor = dynamic(() => import('@/src/components/layout/CustomCursor'), { ssr: false });
const SmoothScrollProvider = dynamic(() => import('@/src/components/layout/SmoothScrollProvider'), { ssr: false });

export default function AboutPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <EditorialHeader />
      <main className="bg-white text-[#111111] min-h-screen pt-2">
        <About />
        <DifferentBannerSection className="bg-[#FAFAFA]" />
      </main>
      <EditorialFooter />
      <div className="film-grain" aria-hidden="true" />
    </SmoothScrollProvider>
  );
}
