import { AuthModal, Footer, HeaderServer, Tabs } from '@/components';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[480px] m-auto relative border-[1px] rounded-[18px] overflow-hidden h-[100vh] flex flex-col dark:border-border-secondary-dark dark:bg-background-primary-dark">
      <HeaderServer />
      <Tabs />
      {children}
      <AuthModal />
      <Footer />
    </div>
  );
}
