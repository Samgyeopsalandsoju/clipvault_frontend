import { AllProvider } from '@/providers/AllProvider';
import type { Metadata } from 'next';
import MUIRegistry from '@/providers/registries/mui-registry';
import '@/styles/TailwindStyle.css';
import { SessionManager } from '@/components/SessionManager';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="dark dark:bg-background-primary-dark" suppressHydrationWarning={true}>
        <MUIRegistry>
          <AllProvider>
            {children}
            <SessionManager />
          </AllProvider>
        </MUIRegistry>
      </body>
    </html>
  );
}
