import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 allowedDevOrigins: ['192.168.1.10'],

 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bwwpcsloeohvkhqlmrzd.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
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
