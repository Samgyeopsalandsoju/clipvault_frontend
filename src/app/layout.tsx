import MUIRegistry from '@/libs/MUI/registry';
import StyledComponentsRegistry from '@/libs/styled-components/registry';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { MainContainer } from '@/styles/MainContainer';
import type { Metadata } from 'next';
// app/layout.tsx 또는 최상위 컴포넌트

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
              <MainContainer>{children}</MainContainer>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </MUIRegistry>
      </body>
    </html>
  );
}
