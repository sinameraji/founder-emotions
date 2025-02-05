import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'cdn.midjourney.com', 'media.licdn.com', 'encrypted-tbn0.gstatic.com'],
  },
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
