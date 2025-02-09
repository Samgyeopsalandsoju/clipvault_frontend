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
    <div className="max-w-[480px] m-auto relative border-[1px] rounded-[12px] overflow-hidden h-[100vh] flex flex-col dark:border-border-secondary-dark dark:bg-background-primary-dark">
      <HeaderServer />
      <Tabs />
      {children}
      <AuthModal />
      <Footer />
    </div>
  );
}
