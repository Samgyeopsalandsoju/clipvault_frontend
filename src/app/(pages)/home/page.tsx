import { CommunityClips } from '@/features/clips/community-clips';
import Hero from '@/widgets/hero/ui/Hero';
import clsx from 'clsx';

const HomePage = () => {
  return (
    <main className={clsx('border-l border-r border-dotted ', 'lg:mx-[200px]')}>
      {/** 헤로 컴포넌트 */}
      <Hero />
      {/** 랜덤 링크 목록 */}
      <CommunityClips />
    </main>
  );
};

export default HomePage;
