'use client';

import { Card } from '@/shared/ui/shadcn';
import { useShareLinks } from '../hook/useShareLinks';
import { Loader } from 'lucide-react';
import { ShareRowEntry } from '@/entities/share/ui/ShareRowEntry';
import { useCallback, useState } from 'react';
import { IShareLink } from '../model/type';

export const ShareList = () => {
  const { isLoading, list, remove } = useShareLinks();

  const onDelete = async ({ id, link }: { id: string; link: string }) => {
    const result = window.confirm('쉐어 링크를 삭제 하시겠습니까?');

    if (result) {
      await remove({ id, link });
    }
  };

  const renderItems = useCallback((link: IShareLink) => {
    return <ShareRowEntry {...link} key={link.link} onDelete={() => onDelete(link)} />;
  }, []);

  return (
    <Card className="p-2 pb-8">
      <div className="flex justify-between p-2">
        <h3 className="text-base md:text-lg font-semibold">쉐어 리스트</h3>
        <span className="text-sm text-gray-400">{list.length}/10</span>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[150px]">
          <Loader size={50} className="animate-spin transition-all duration-1000" />
        </div>
      ) : // 클립이 없는 경우
      list.length === 0 ? (
        <div className="flex justify-center items-center h-[150px] text-gray-500">쉐어한 리스트가 없습니다.</div>
      ) : (
        // 클립 있음
        <ul className="flex flex-col gap-3"> {list.map((link) => renderItems(link))}</ul>
      )}
    </Card>
  );
};
