import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  turbopack: {},
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "landing-page-043005634019-sa-east-1-an.s3.sa-east-1.amazonaws.com",
      pathname: "/images/**"
    }],
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
  },
  cacheComponents: true,
  webpack: (config) => {
    config.externals.push('three');
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ]
      }
    ]
  }
};

export default nextConfig;