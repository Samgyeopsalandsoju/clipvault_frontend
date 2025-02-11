import { AuthModal, Footer, HeaderServer } from '@/components';
import { MainContainer } from '@/styles/MainContainer';
export default function ShareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainContainer>
      <HeaderServer />
      {children}
      <AuthModal />
      <Footer />
    </MainContainer>
  );
}
