'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import Contact from '@/src/components/sections/Contact';

const CustomCursor = dynamic(() => import('@/src/components/layout/CustomCursor'), { ssr: false });
const SmoothScrollProvider = dynamic(() => import('@/src/components/layout/SmoothScrollProvider'), { ssr: false });

export default function ContactPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar />
      <main className="pt-24">
        <Contact />
      </main>
      <Footer />
      <div className="film-grain" aria-hidden="true" />
    </SmoothScrollProvider>
  );
}
