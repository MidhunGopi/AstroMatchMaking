/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Static export for GitHub Pages
  output: "export",

  // Base path for GitHub Pages (repo name)
  basePath: "/AstroMatchMaking",

  // Asset prefix for GitHub Pages
  assetPrefix: "/AstroMatchMaking/",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slash for better GitHub Pages compatibility
  trailingSlash: true,
};

module.exports = nextConfig;
