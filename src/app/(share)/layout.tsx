import Footer from '@/components/layout/footers/Footer';
import { HeaderServer } from '@/components/layout/headers/Header';
import { AuthModal } from '@/components/modals/AuthModal';

export default function ShareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[480px] m-auto relative border-[1px] rounded-[18px] overflow-hidden h-[100vh] flex flex-col dark:border-border-secondary-dark dark:bg-background-primary-dark">
      <HeaderServer />
      {children}
      <AuthModal />
      <Footer />
    </div>
  );
}
