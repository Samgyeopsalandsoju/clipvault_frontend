'use client';

import { Card } from '@/shared/ui/shadcn';
import { useShareLinks } from '../hook/useShareLinks';
import { Loader } from 'lucide-react';

export const ShareList = () => {
  const { isLoading, list } = useShareLinks();
  return (
    <Card className="p-2 pb-8">
      <div className="flex justify-between p-2">
        <h3 className="text-base md:text-lg font-semibold">쉐어 리스트</h3>
        <span className="text-sm text-gray-400">0/100</span>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[150px]">
          <Loader size={50} className="animate-spin transition-all duration-1000" />
        </div>
      ) : // 클립이 없는 경우
      list.length === 0 ? (
        <div className="flex justify-center items-center h-[150px] text-gray-500">포크한 클립이 없습니다.</div>
      ) : (
        // 클립 있음
        <></>
      )}
    </Card>
  );
};
