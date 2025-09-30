import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "C:\\Users\\muril\\tractian-tec-case",
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
      pathname: '/**',
    }],
    qualities: [25, 50, 75, 100],
  }
};

export default nextConfig;
