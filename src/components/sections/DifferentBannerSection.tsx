'use client';

import Image from 'next/image';
import { FaYoutube, FaPlay, FaExternalLinkAlt, FaUsers, FaVideo } from 'react-icons/fa';

interface DifferentBannerSectionProps {
  id?: string;
  className?: string;
}

const YOUTUBE_CHANNEL = {
  name: 'Different Banner PHOTOGRAPHY',
  company: 'A DIFFERENT BANNER MEDIA COMPANY',
  handle: '@differentbanner',
  subscribers: '13.1K subscribers',
  videoCount: '67 videos',
  url: 'https://www.youtube.com/@differentbanner',
  description:
    "We're providing event photography, cinematography for short films, editing, and cinematic wedding stories.",
  logo: '/images/different-banner/logo.png',
  banner: '/images/different-banner/banner.png',
};

const YOUTUBE_VIDEOS = [
  {
    id: 'U9nx43Idn7g',
    title: 'WEDDING DOCUMENTARY | MADHWA BRAHMIN WEDDING',
    category: 'Cinematic Documentary',
    channel: 'Different Banner Photography',
    url: 'https://youtu.be/U9nx43Idn7g?si=fBzUUFHoarskwN59',
    thumbnail: '/images/different-banner/video-1.jpg',
    tag: 'Full Wedding Film',
  },
  {
    id: 'aGjQG7xfjrA',
    title: 'KONGU WEDDING HIGHLIGHTS - MAHESH & POORNIKA',
    category: 'Wedding Highlights',
    channel: 'Different Banner Photography',
    url: 'https://youtu.be/aGjQG7xfjrA?si=7Xh0cVPVqEuj6Fbf',
    thumbnail: '/images/different-banner/video-2.jpg',
    tag: 'Cinematic Highlights',
  },
  {
    id: '-4rvc4B4Mmk',
    title: 'TRICHY MADHWA BRAHMIN WEDDING | TRADITIONAL',
    category: 'Traditional Heritage',
    channel: 'Different Banner Photography',
    url: 'https://youtu.be/-4rvc4B4Mmk?si=cTJhsoJrfbKRD8v0',
    thumbnail: '/images/different-banner/video-3.jpg',
    tag: 'Traditional Film',
  },
];

export default function DifferentBannerSection({
  id = 'different-banner',
  className = '',
}: DifferentBannerSectionProps) {
  return (
    <section
      id={id}
      className={`relative py-24 sm:py-32 px-6 sm:px-12 border-b border-black/10 bg-white text-[#111111] overflow-hidden ${className}`}
      aria-label="A Different Banner Media Company - YouTube Channel"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] sm:text-[11px] tracking-[0.45em] text-[#B8860B] uppercase font-sans font-medium block mb-4">
            CINEMATIC WEDDING FILMS IN MOTION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#111111] tracking-[0.05em] uppercase leading-tight">
            A DIFFERENT BANNER MEDIA COMPANY
          </h2>
          <div className="w-16 h-[1.5px] bg-[#B8860B] mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#555555] font-light leading-relaxed">
            Explore our official YouTube channel featuring cinematic wedding documentaries, traditional rituals,
            and highlight films crafted with emotion, fashion discipline, and timeless grace.
          </p>
        </div>

        {/* Channel Identity Showcase Card */}
        <div className="mb-16 p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#FAFAFA] border border-black/10 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Channel Logo and Meta */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
              {/* Circular Channel Logo */}
              <a
                href={YOUTUBE_CHANNEL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#111111] bg-black shadow-lg flex-shrink-0 group cursor-pointer"
                aria-label="Visit Different Banner Photography on YouTube"
              >
                <Image
                  src={YOUTUBE_CHANNEL.logo}
                  alt="Different Banner Photography Logo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="96px"
                />
              </a>

              {/* Text Info */}
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#111111] font-semibold tracking-wide">
                    {YOUTUBE_CHANNEL.name}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-sans font-semibold bg-red-600/10 text-red-600 border border-red-600/20">
                    <FaYoutube size={12} />
                    Official Channel
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-xs font-sans text-[#666666]">
                  <span className="font-medium text-[#111111]">{YOUTUBE_CHANNEL.handle}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <FaUsers size={11} className="text-[#888888]" />
                    {YOUTUBE_CHANNEL.subscribers}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <FaVideo size={11} className="text-[#888888]" />
                    {YOUTUBE_CHANNEL.videoCount}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#555555] font-light mt-2 max-w-xl">
                  {YOUTUBE_CHANNEL.description}
                </p>
              </div>
            </div>

            {/* Subscribe / Visit Channel Action Buttons */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center flex-shrink-0">
              <a
                href={YOUTUBE_CHANNEL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-sans font-semibold tracking-[0.18em] uppercase transition-all shadow-md hover:shadow-xl hover:scale-105 duration-300 cursor-pointer"
              >
                <FaYoutube size={16} />
                <span>SUBSCRIBE</span>
              </a>

              <a
                href={YOUTUBE_CHANNEL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-black hover:text-white border border-black/15 text-[#111111] text-xs font-sans font-semibold tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer"
              >
                <span>VISIT CHANNEL</span>
                <FaExternalLinkAlt size={10} />
              </a>
            </div>
          </div>
        </div>

        {/* 3 Featured Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {YOUTUBE_VIDEOS.map((video, idx) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAFAFA] border border-black/10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              aria-label={`Watch ${video.title} on YouTube`}
            >
              {/* Video Thumbnail with 16:9 Aspect Ratio and Overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={95}
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold text-white border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>{video.tag}</span>
                </div>

                {/* Top Right Episode Counter */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] tracking-[0.15em] font-sans font-bold text-[#111111]">
                  0{idx + 1}
                </div>

                {/* Centered YouTube Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center pl-1 group-hover:scale-115 group-hover:bg-[#FF0000] group-hover:border-[#FF0000] group-hover:text-white transition-all duration-300 shadow-2xl">
                    <FaPlay size={18} className="translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] tracking-wider text-white/90 font-mono">
                  <FaYoutube size={12} className="text-[#FF0000]" />
                  <span>YouTube</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-[#B8860B] uppercase font-sans font-semibold block mb-2">
                    {video.category}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg text-[#111111] group-hover:text-[#B8860B] font-medium leading-snug line-clamp-2 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-xs text-[#777777] font-sans mt-2 font-light">
                    {video.channel}
                  </p>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-5 mt-5 border-t border-black/5 flex items-center justify-between text-xs font-sans tracking-[0.18em] uppercase font-semibold text-[#111111] group-hover:text-[#FF0000] transition-colors">
                  <span className="flex items-center gap-2">
                    <FaYoutube size={15} className="text-[#FF0000]" />
                    <span>Watch on YouTube</span>
                  </span>
                  <FaExternalLinkAlt size={10} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
