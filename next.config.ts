import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 allowedDevOrigins: ['192.168.1.10'],

 images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
