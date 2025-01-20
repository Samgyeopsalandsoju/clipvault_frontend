import MUIRegistry from '@/configs/MUI/registry';
import StyledComponentsRegistry from '@/configs/styled-components/registry';
import { ThemeProvider } from '@/providers/ThemeProvider';
import type { Metadata } from 'next';

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
              <div
                style={{
                  maxWidth: '480px',
                  margin: '0 auto',
                  position: 'relative',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: '100vh',
                }}
              >
                {children}
              </div>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </MUIRegistry>
      </body>
    </html>
  );
}
