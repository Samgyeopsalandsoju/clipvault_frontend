import HeaderComponent from '@/components/Header';
import { MainContainer } from '@/styles/MainContainer';
import Tabs from '@/components/Tabs';
import AuthModal from '@/components/modal/AuthModal';
import Footer from '@/components/Footer';
import HeaderServer from '@/components/server/header/Header';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainContainer>
      <HeaderServer />
      <Tabs />
      {children}
      <AuthModal />
      <Footer />
    </MainContainer>
  );
}
