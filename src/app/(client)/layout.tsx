import HeaderComponent from '@/components/Header';
import { MainContainer } from '@/styles/MainContainer';
import Tabs from '@/components/Tabs';
import AuthModal from '@/components/modal/AuthModal';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainContainer>
      <HeaderComponent />
      <Tabs />
      {children}
      <AuthModal />
    </MainContainer>
  );
}
