import ClientHomeComponent from '@/components/client/home/ClientHomeComponent';
import HeroSection from '@/components/server/home/HeroSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ClientHomeComponent />
    </>
  );
};

export default HomePage;
