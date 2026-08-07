'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';

const CustomCursor = dynamic(() => import('@/src/components/layout/CustomCursor'), { ssr: false });
const SmoothScrollProvider = dynamic(() => import('@/src/components/layout/SmoothScrollProvider'), { ssr: false });

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
      <div className="film-grain" aria-hidden="true" />
    </SmoothScrollProvider>
  );
}
