import HeaderComponent from '@/components/Header';
import { MainContainer } from '@/styles/MainContainer';
import AuthModal from '@/components/modal/AuthModal';
import Footer from '@/components/Footer';

export default function ShareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainContainer>
      <HeaderComponent />
      {children}
      <AuthModal />
      <Footer />
    </MainContainer>
  );
}
