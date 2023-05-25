/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['wisey.app'],
  },
};

module.exports = nextConfig;
