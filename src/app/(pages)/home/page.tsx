import { Hero } from '@/widgets/hero';
import clsx from 'clsx';
import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CommunityClips = dynamic(() =>
  import('@/features/clips/community-clips').then((mod) => ({
    default: mod.CommunityClips,
  }))
);

const HomePage = () => {
  return (
    <main className={clsx('flex-grow border-l border-r border-dotted ', 'lg:mx-[200px]')}>
      {/** 헤로 컴포넌트 */}
      <Hero />
      {/** 랜덤 링크 목록 */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-full">
            <Loader size={50} className="animate-spin" />
          </div>
        }
      >
        <CommunityClips />
      </Suspense>
    </main>
  );
};

export default HomePage;
