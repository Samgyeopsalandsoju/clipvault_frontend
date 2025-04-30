'use client';

import { Card } from '@/shared/ui/card';
import { ClipRowEntry } from '@/entities/clip/ui/ClipRowEntry';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useClipListStore } from '@/shared/model/clips.store';
import { useUserClips } from '../hook/useUserClips';

// 유저 클립 리스트
export const UserClips = () => {
  const { data, isLoading } = useUserClips();
  // 클립 스토어 state set 호출
  const clips = useClipListStore((state) => state.filteredClips);
  const setClips = useClipListStore((state) => state.setClips);

  useEffect(() => {
    if (data) {
      console.log(data);
      setClips(data);
    }
  }, [data, setClips]);

  return (
    <div>
      <div className="flex justify-between pb-2 pt-3 px-5">
        <h3 className="text-sm md:text-lg font-semibold">클립 리스트</h3>
        <span className="text-sm text-gray-400">{data?.length}/100</span>
      </div>
      <Card className="p-5">
        {/** 로딩 중 인 경우 */}
        {isLoading ? (
          <div className="flex justify-center items-center h-[150px]">
            <Loader size={50} className="animate-spin transition-all duration-1000" />
          </div>
        ) : // 클립이 없는 경우
        clips.length === 0 ? (
          <div className="flex justify-center items-center h-[150px] text-gray-500">
            클립이 없습니다.
          </div>
        ) : (
          // 클립 있음
          <ul className="flex flex-col gap-4">
            {clips.map((clip) => (
              <ClipRowEntry key={clip.id} {...clip} />
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};
