/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add remote image patterns here when needed
    ],
  },
};

module.exports = nextConfig;
