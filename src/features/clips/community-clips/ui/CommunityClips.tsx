'use client';

import CommunityClipEntry from '@/entities/clip/ui/CommunityClipEntry';
import { useCommunityClips } from '../hook';

// 홈 클립 리스트
function CommunityClips() {
  const { data, isLoading } = useCommunityClips();

  return (
    <section className="px-[16px] md:px-[16px] lg:px-[60px] py-[50px]">
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-5">퍼블릭 링크 리스트</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
          {data?.map((item) => {
            return <CommunityClipEntry key={item.id} {...item} />;
          })}
        </ul>
      )}
    </section>
  );
}

export default CommunityClips;
