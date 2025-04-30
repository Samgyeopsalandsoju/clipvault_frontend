import type { NextConfig } from 'next';
const CircularDependencyPlugin = require('circular-dependency-plugin');

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true, // 모든 ESLint 규칙 무시
  },
  images: {
    domains: ['s3-clipvault.s3.ap-northeast-2.amazonaws.com'],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
