// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.blandskron.com', pathname: '/**' },
      { protocol: 'https', hostname: 'blandskron.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
