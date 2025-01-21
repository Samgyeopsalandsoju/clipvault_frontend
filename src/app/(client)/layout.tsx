import AuthModal from '@/features/auth/ui/modal/AuthModal';
import Header from '@/features/shared/ui/Header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <AuthModal />
      {children}
    </>
  );
}
