import { Metadata } from 'next';
import BrandIntro from '@/src/components/sections/BrandIntro';

export const metadata: Metadata = {
  title: 'Signature Animation | Gokulraj Pictures',
  description: 'Interactive luxury 3D gold calligraphic signature animation for Gokulraj Pictures.',
};

export default function SignaturePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative">
      {/* Signature Component mounted in standalone mode */}
      <BrandIntro isStandalonePage={true} />

      {/* Navigation Header */}
      <div className="absolute top-6 left-6 z-30 flex items-center gap-4">
        <a
          href="/"
          className="text-xs uppercase tracking-widest text-[#D4AF37]/80 hover:text-[#FFF] transition-colors flex items-center gap-2 border border-[#D4AF37]/30 rounded-full px-4 py-2 bg-black/40 backdrop-blur-sm"
        >
          ← Return to Website
        </a>
      </div>
    </main>
  );
}
