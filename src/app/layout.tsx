import { AllProvider } from '@/providers/AllProvider';
import type { Metadata } from 'next';
import MUIRegistry from '@/providers/registries/mui-registry';
import StyledComponentsRegistry from '@/providers/registries/styled-registry';
import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/TailwindStyle.css';
import { SessionManager } from '@/components/SessionManager';

export const metadata: Metadata = {
  title: 'ClipVault',
  description: "Explore the community's curated links",
  metadataBase: new URL('https://clipvault.info'),
  openGraph: {
    title: '📎 clipVault',
    description: 'Save, share, and explore your favorite links.',
    url: 'https://clipvault.info',
    siteName: 'clipVault',
    images: [
      {
        url: '/meta.png', // public 폴더에 저장된 이미지 경로
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
    images: ['/meta.png'], // public 폴더에 저장된 이미지 경로
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
      <body suppressHydrationWarning={true} className="dark">
        <MUIRegistry>
          <StyledComponentsRegistry>
            <AllProvider>
              <GlobalStyles />
              {children}
              <SessionManager />
            </AllProvider>
          </StyledComponentsRegistry>
        </MUIRegistry>
      </body>
    </html>
  );
}
