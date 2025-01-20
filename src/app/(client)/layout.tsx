import LoginModal from '@/features/auth/ui/LoginModal';
import Header from '@/widgets/header/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <LoginModal />
      {children}
    </>
  );
}
