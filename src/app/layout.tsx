import type { Metadata } from 'next';

import '@/shared/styles/globals.css';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <Providers>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
