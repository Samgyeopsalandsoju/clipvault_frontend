import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // 모든 ESLint 규칙 무시
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // 서버 전용 모듈 제거
        path: false,
      };
    }

    // Webpack 최적화 설정 추가
    config.optimization = {
      ...config.optimization,
      usedExports: true, // 사용된 export만 번들 포함
      sideEffects: false, // 불필요한 코드 제거 방지
    };

    return config;
  },
};

export default nextConfig;
