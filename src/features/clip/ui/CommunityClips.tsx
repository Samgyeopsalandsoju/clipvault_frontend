'use client';

import { ClipCardEntry } from '@/entities/clip';
import { useCommunityClips } from '../hooks/useCommunityClips';
import { markIntersectingElementsAsForked } from '../model/utils';
import { useSession } from 'next-auth/react';

// 홈 클립 리스트
export const CommunityClips = () => {
  const { clips, isLoading, ids } = useCommunityClips();

  // 포크 유아이 업데이트
  const markedClips = markIntersectingElementsAsForked(clips, ids);

  return (
    <section className="px-[16px] md:px-[16px] lg:px-[60px] py-[50px]">
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-5">퍼블릭 링크 리스트</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
          {markedClips?.map((clip) => {
            return <ClipCardEntry key={clip.id} {...clip} />;
          })}
        </ul>
      )}
    </section>
  );
};
