import HeaderComponent from '@/components/Header';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { MainContainer } from '@/styles/MainContainer';
import type { Metadata } from 'next';
import Tabs from '@/components/Tabs';
import AuthModal from '@/components/modal/AuthModal';
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
      <body>
        <MUIRegistry>
          <StyledComponentsRegistry>
            <ThemeProvider>
              <GlobalStyles />
              <MainContainer>
                <HeaderComponent />
                <Tabs />
                {children}
                <AuthModal />
              </MainContainer>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </MUIRegistry>
      </body>
    </html>
  );
}
