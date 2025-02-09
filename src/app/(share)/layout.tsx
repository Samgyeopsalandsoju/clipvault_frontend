import HeaderComponent from '@/components/Header';
import { MainContainer } from '@/styles/MainContainer';
import AuthModal from '@/components/modal/AuthModal';
import Footer from '@/components/Footer';
import HeaderServer from '@/components/server/header/Header';

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
