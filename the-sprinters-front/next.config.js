const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['www.google.com', 'www.viata-libera.ro', 'www.caritate.md', 'ziarulceahlaul.ro', 'www.unicef.org', "www.caritas.eu"],
  },
});
