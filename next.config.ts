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
  },
  rewrites: async () => {
    return [
      {
        source: '/api/auth/:path*',
        destination: process.env.NEXT_PUBLIC_PROXY_AUTH_URL ?? "",
      },
    ]
  }
};

export default nextConfig;
