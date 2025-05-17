'use client';

import { Card } from '@/shared/ui/shadcn';
import { useGetForks } from '../hooks/useGetForks';
import { Loader } from 'lucide-react';
import { useCallback } from 'react';
import { ForkRowEntry } from '@/entities/clip/ui/ForkRowEntry';
import { IFork } from '@/shared/data/types';

export const ForkList = () => {
  const { forks, isLoading } = useGetForks();

  // 메모이 제이션
  const renderItem = useCallback(
    (clip: IFork) => {
      return <ForkRowEntry {...clip} key={clip.clipId} />;
    },
    [forks]
  );
  console.log(forks);
  return (
    <Card className="p-2 pb-8">
      <div className="flex justify-between p-2">
        <h3 className="text-base md:text-lg font-semibold">포크 리스트</h3>
        <span className="text-sm text-gray-400">0/100</span>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[150px]">
          <Loader size={50} className="animate-spin transition-all duration-1000" />
        </div>
      ) : // 클립이 없는 경우
      forks.length === 0 ? (
        <div className="flex justify-center items-center h-[150px] text-gray-500">포크한 클립이 없습니다.</div>
      ) : (
        // 클립 있음
        <ul className="flex flex-col gap-3">{forks.map((clip) => renderItem(clip))}</ul>
      )}
    </Card>
  );
};
