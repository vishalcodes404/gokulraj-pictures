import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Support high-resolution DSLR images (large file sizes)
  images: {
    // Allow large images to be optimized
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90, 95],
    // Increase the limit for DSLR-quality source images (50MB)
    minimumCacheTTL: 60,
  },
  // Increase body size limit for uploads
  serverExternalPackages: [],
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;
