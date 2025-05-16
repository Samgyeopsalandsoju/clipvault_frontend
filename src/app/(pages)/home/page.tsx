import { Hero } from '@/widgets/hero/home';
import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
// 레이지 렌더링
const CommunityClips = dynamic(() =>
  import('@/widgets/list/community').then((mod) => ({
    default: mod.CommunityClips,
  }))
);

const HomePage = () => {
  return (
    <main>
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
