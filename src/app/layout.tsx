import type { Metadata } from 'next';

import '@/shared/ui/styles/globals.css';
import dynamic from 'next/dynamic';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { Providers } from './_providers';

export const metadata: Metadata = {
  title: 'clipVault',
  description: "Explore the community's curated links",
  metadataBase: new URL('https://clipvault.info'),
  openGraph: {
    title: '📎 clipVault',
    description: 'Save, share, and explore your favorite links.',
    url: 'https://clipvault.info',
    siteName: 'clipVault',
    images: [
      {
        url: '/meta.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '📎 clipVault',
    description: 'Save, share, and explore your favorite links.',
    images: ['/meta.png'],
  },
  icons: {
    icon: '/clipvault-favicon.svg',
  },
};

export const viewport = {
  // viewport 관련 설정을 여기에 작성
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // 기타 필요한 viewport 설정
};

// 모달 컴포넌트 레이지 로딩
const LoginForm = dynamic(
  () => import('@/features/auth/login/ui/LoginForm').then((mod) => ({ default: mod.LoginForm })),
  {
    loading: () => null, // 모달이므로 로딩 UI가 필요 없음
  }
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex flex-col  min-h-screen">
        <Providers>
          <Header />
          {children}
          <Footer />
          <LoginForm />
        </Providers>
      </body>
    </html>
  );
}
