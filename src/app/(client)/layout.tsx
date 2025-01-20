import AuthModal from '@/features/auth/ui/AuthModal';
import Header from '@/widgets/header/Header';

export default function RootLayout({
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
