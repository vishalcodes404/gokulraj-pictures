'use client';

import dynamic from 'next/dynamic';
import EditorialHeader from '@/src/components/sections/EditorialHeader';
import EditorialFooter from '@/src/components/sections/EditorialFooter';
import Shoots from '@/src/components/sections/Shoots';

const CustomCursor = dynamic(() => import('@/src/components/layout/CustomCursor'), { ssr: false });
const SmoothScrollProvider = dynamic(() => import('@/src/components/layout/SmoothScrollProvider'), { ssr: false });

export default function ShootsPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <EditorialHeader darkMode={true} />
      <main className="bg-[#050505] min-h-screen">
        <Shoots />
      </main>
      <EditorialFooter />
      <div className="film-grain" aria-hidden="true" />
    </SmoothScrollProvider>
  );
}
