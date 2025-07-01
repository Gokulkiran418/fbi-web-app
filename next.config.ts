import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.fbi.gov',
        pathname: '/wanted/**', // Match FBI Wanted API image paths
      },
    ],
  },
};

export default nextConfig;