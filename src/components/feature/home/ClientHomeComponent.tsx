'use client';

import { useForkQuery, useHomeClipQuery } from '@/hooks';
import { memo, useCallback, useRef } from 'react';
import { IClipResponse } from '@/types';
import { StatCountSection } from './StatCountSection';
import { ClipList } from '../clip/ClipList';
import { HomeCard } from '../clip/HomeCard';
import { ScrollUpButton } from '@/components/ui/buttons/ScrollUpButton';
import { SkeletonUI } from '@/components/skeleton/SkeletonUI';

const MemoizedClipList = memo(ClipList);
const MemoizedHomeCard = memo(HomeCard);

export const ClientHomeComponent = () => {
  const {
    home: { list, isClipLoading },
  } = useHomeClipQuery();
  const { doFork, isForking } = useForkQuery();
  const containerRef = useRef(null);

  const handleFork = useCallback((clipId: string) => {
    doFork({ clipId });
  }, []);

  const renderItem = useCallback((clip: IClipResponse) => {
    return <MemoizedHomeCard {...clip} onFork={handleFork} isForking={isForking} />;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 pb-12 overflow-auto dark:bg-background-primary-dark scrollbar-none no-scroll"
    >
      <StatCountSection />
      {isClipLoading ? (
        <div className="flex flex-col p-4 gap-3">
          <SkeletonUI.ClipList numCards={5} />
        </div>
      ) : (
        <MemoizedClipList list={list} renderItem={renderItem} />
      )}

      <ScrollUpButton scrollContainerRef={containerRef} />
    </div>
  );
};
