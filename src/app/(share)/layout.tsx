import HeaderComponent from '@/components/Header';
import { MainContainer } from '@/styles/MainContainer';
import AuthModal from '@/components/modal/AuthModal';

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
    </MainContainer>
  );
}
