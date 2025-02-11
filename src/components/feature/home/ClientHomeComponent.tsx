'use client';

import { useHomeClipQuery } from '@/hooks';
import { useRef } from 'react';
import { ScrollUpButton, ClipList, StatCount, HomeCard } from '@/components';

export const ClientHomeComponent = () => {
  const {
    home: { list },
  } = useHomeClipQuery();
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 pb-12 overflow-auto dark:bg-background-primary-dark scrollbar-none no-scroll"
    >
      <div className="flex items-center justify-evenly">
        <StatCount title={'Total Clips'} count={10} />
        <StatCount title={'Total Shared'} count={12} />
      </div>
      <ClipList list={list} renderItem={(clip) => <HomeCard {...clip} />} />
      <ScrollUpButton scrollContainerRef={containerRef} />
    </div>
  );
};
