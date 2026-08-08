'use client';

import dynamic from 'next/dynamic';
import EditorialHeader from '@/src/components/sections/EditorialHeader';
import EditorialFooter from '@/src/components/sections/EditorialFooter';
import Plans from '@/src/components/sections/Plans';

const CustomCursor = dynamic(() => import('@/src/components/layout/CustomCursor'), { ssr: false });
const SmoothScrollProvider = dynamic(() => import('@/src/components/layout/SmoothScrollProvider'), { ssr: false });

export default function PlansPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <EditorialHeader darkMode={true} />
      <main className="bg-[#050505] min-h-screen">
        <Plans />
      </main>
      <EditorialFooter />
      <div className="film-grain" aria-hidden="true" />
    </SmoothScrollProvider>
  );
}
