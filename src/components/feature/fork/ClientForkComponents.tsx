'use client';

import { memo, useCallback, useRef } from 'react';
import { IForkedClipResponse } from '@/types';
import { useForkQuery } from '@/hooks';
import { ForkedList } from './ForkedList';
import { ForkedCard } from '../clip/ForkedCard';
import { ScrollUpButton } from '@/components/ui/buttons/ScrollUpButton';

const MemoizedClipList = memo(ForkedList);
const MemoizedForkCard = memo(ForkedCard);

export const ClientForkComponents = () => {
  const { list, deleteFork } = useForkQuery();
  const containerRef = useRef(null);

  const renderItem = useCallback((clip: IForkedClipResponse) => {
    return <MemoizedForkCard {...clip} onDelete={handleDeleteFork} />;
  }, []);

  const handleDeleteFork = (data: { clipId: string; forkId: string }) => {
    deleteFork(data);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 pb-12 overflow-auto dark:bg-background-primary-dark scrollbar-none no-scroll"
    >
      <MemoizedClipList list={list} renderItem={renderItem} />
      <ScrollUpButton scrollContainerRef={containerRef} />
    </div>
  );
};
