import { ThemeProvider } from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import MUIRegistry from '@/providers/registries/mui-registry';
import StyledComponentsRegistry from '@/providers/registries/styled-registry';
import GlobalStyles from '@/styles/GlobalStyles';

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
      <body suppressHydrationWarning={true}>
        <MUIRegistry>
          <StyledComponentsRegistry>
            <ThemeProvider>
              <GlobalStyles />
              {children}
            </ThemeProvider>
          </StyledComponentsRegistry>
        </MUIRegistry>
      </body>
    </html>
  );
}
