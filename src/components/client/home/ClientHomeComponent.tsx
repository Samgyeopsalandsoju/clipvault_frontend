'use client';

import ClipList from '@/components/clip/ClipList';
import HomeCard from '@/components/clip/HomeCard';
import StatCount from '@/components/count/StatCount';
import ScrollUpButton from '@/components/ScrollUpButton';
import { useHomeClipQuery } from '@/hooks/home/useHomeClipQuery';
import { useRef } from 'react';

const ClientHomeComponent = () => {
  const {
    home: { list },
  } = useHomeClipQuery();
  const containerRef = useRef(null);
  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-auto dark:bg-background-primary-dark scrollbar-none no-scroll"
    >
      <div className="flex items-center justify-evenly">
        <StatCount title={'Total Clips'} count={10} />
        <StatCount title={'Total Shared'} count={12} />
      </div>
      <ClipList list={list} renderItem={(clip) => <HomeCard {...clip} />} />
      {/* <ScrollUpButton scrollContainerRef={containerRef} /> */}
    </div>
  );
};

export default ClientHomeComponent;
