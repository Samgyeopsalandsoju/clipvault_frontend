import type { Metadata } from 'next';

import '@/shared/styles/globals.css';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { Providers } from './_providers';
import { LoginForm } from '@/features/auth/login/ui/LoginForm';

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
