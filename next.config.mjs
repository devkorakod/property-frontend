/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // avif format intentionally excluded — Next 14's AVIF decoder in the built-in
    // Image Optimization API has a known RCE (GHSA-2xp9-vwfh-vxw4), fixed only in
    // Next 16. Not using next/image with remote AVIF sources yet, so omit it rather
    // than force a major-version upgrade for an MVP.
    formats: ['image/webp'],
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    }];
  },
};

export default nextConfig;
