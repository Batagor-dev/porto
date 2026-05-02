import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 allowedDevOrigins: ['*'],

 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Tambahkan juga jika kamu pakai domain image lain nantinya
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
