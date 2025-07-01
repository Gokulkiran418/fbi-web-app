import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React strict mode for better error detection
  images: {
    domains: ['www.fbi.gov'], // Allow FBI API image domains
    // Add Cloudinary/Imgix domains if used in production
    // Example: domains: ['www.fbi.gov', 'res.cloudinary.com', 'images.imgix.net'],
  },
};

export default nextConfig;