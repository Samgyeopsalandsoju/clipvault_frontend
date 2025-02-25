'use client';

import { useForkQuery, useHomeClipQuery } from '@/hooks';
import { memo, useCallback, useRef } from 'react';
import { IClipResponse } from '@/types';
import { ClipList, HomeCard } from '../clip';
import { StatCountSection } from './StatCountSection';
import { ScrollUpButton } from '@/components/ui';

const MemoizedClipList = memo(ClipList);
const MemoizedHomeCard = memo(HomeCard);

export const ClientHomeComponent = () => {
  const {
    home: { list },
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
      <MemoizedClipList list={list} renderItem={renderItem} />
      <ScrollUpButton scrollContainerRef={containerRef} />
    </div>
  );
};
