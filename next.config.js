/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['wisey.app'],
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer(nextConfig);
