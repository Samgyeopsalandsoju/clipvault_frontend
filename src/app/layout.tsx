import { AllProvider } from '@/providers/AllProvider';
import type { Metadata } from 'next';
import MUIRegistry from '@/providers/registries/mui-registry';
import StyledComponentsRegistry from '@/providers/registries/styled-registry';
import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/TailwindStyle.css';
import { SessionManager } from '@/components/SessionManager';

export const metadata: Metadata = {
  title: 'clipVault',
  description: 'save and share',
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
