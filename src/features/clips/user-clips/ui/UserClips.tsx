'use client';

import { Card } from '@/shared/ui/card';
import { ClipRowEntry } from '@/entities/clip/ui/ClipRowEntry';
import { useEffect, useCallback } from 'react';
import { Loader } from 'lucide-react';
import { useClipListStore } from '@/shared/model/clips.store';
import { useUserClips } from '../hook/useUserClips';
import { useModifyModalStore } from '../../modify-clip/model/store';
import { IUserClip } from '@/shared/types';

// 유저 클립 리스트
export const UserClips = () => {
  const setIsOpen = useModifyModalStore((state) => state.setIsOpen);
  const setClipId = useModifyModalStore((state) => state.setClipId);
  const { data, isLoading } = useUserClips();
  // 클립 스토어 state set 호출
  const clips = useClipListStore((state) => state.filteredClips);
  const setClips = useClipListStore((state) => state.setClips);

  useEffect(() => {
    if (data) {
      setClips(data);
    }
  }, [data, setClips]);

  // 클립 클릭 이벤트 핸들러
  const handleClick = useCallback(
    (id: string) => {
      setIsOpen(true);
      setClipId(id);
    },
    [setIsOpen, setClipId]
  );

  // 클립 렌더링 함수
  const renderItem = useCallback(
    (clip: IUserClip) => {
      return <ClipRowEntry key={clip.id} {...clip} onClick={() => handleClick(clip.id)} />;
    },
    [handleClick]
  );

  return (
    <Card className="p-2 pb-8">
      <div className="flex justify-between p-2">
        <h3 className="text-base md:text-lg font-semibold">클립 리스트</h3>
        <span className="text-sm text-gray-400">{data?.length}/100</span>
      </div>
      {/** 로딩 중 인 경우 */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[150px]">
          <Loader size={50} className="animate-spin transition-all duration-1000" />
        </div>
      ) : // 클립이 없는 경우
      clips.length === 0 ? (
        <div className="flex justify-center items-center h-[150px] text-gray-500">클립이 없습니다.</div>
      ) : (
        // 클립 있음
        <ul className="flex flex-col gap-3">{clips.map((clip) => renderItem(clip))}</ul>
      )}
    </Card>
  );
};
