import { AllProvider } from '@/providers/AllProvider';
import type { Metadata } from 'next';
import MUIRegistry from '@/providers/registries/mui-registry';
import StyledComponentsRegistry from '@/providers/registries/styled-registry';
import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/TailwindStyle.css';

export const metadata: Metadata = {
  title: 'clipVault',
  description: 'save and share',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('@@@@@@@@@@@@@@@@@ 환경변수 확인 @@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.log('NEXTAUTH_SECRET : ', process.env.NEXTAUTH_SECRET);
  console.log('AWS_REGION : ', process.env.AWS_REGION);
  console.log('NEXTAUTH_URL : ', process.env.NEXTAUTH_URL);
  console.log('API_URL : ', process.env.API_URL);
  console.log('@@@@@@@@@@@@@@@@@ 환경변수 확인 @@@@@@@@@@@@@@@@@@@@@@@@@@');
  return (
    <html>
      <body suppressHydrationWarning={true} className="dark">
        <MUIRegistry>
          <StyledComponentsRegistry>
            <AllProvider>
              <GlobalStyles />
              {children}
            </AllProvider>
          </StyledComponentsRegistry>
        </MUIRegistry>
      </body>
    </html>
  );
}
