'use client';

import { memo, useCallback, useRef, useState } from 'react';
import { IForkedClipResponse } from '@/types';
import { useForkQuery } from '@/hooks';
import { ForkedList } from './ForkedList';
import { ScrollUpButton } from '@/components/ui/buttons/ScrollUpButton';
import { SkeletonUI } from '@/components/skeleton/SkeletonUI';
import { ForkedCard } from './ForkedCard';
import { ConfirmModal } from '@/components/modals/ConfirmModal';

const MemoizedClipList = memo(ForkedList);
const MemoizedForkCard = memo(ForkedCard);

export const ClientForkComponents = () => {
  const { list, isClipLoading, deleteFork } = useForkQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ids, setIds] = useState({ clipId: '', forkId: '' });
  const containerRef = useRef(null);

  const renderItem = useCallback((clip: IForkedClipResponse) => {
    return <MemoizedForkCard {...clip} onDelete={handleDeleteFork} />;
  }, []);

  const handleDeleteFork = (data: { clipId: string; forkId: string }) => {
    setIsOpen(true);
    setIds(data);
  };

  const handleOpenModal = () => {
    setIsOpen(false);
    deleteFork(ids);
  };
  return (
    <div
      ref={containerRef}
      className="relative flex-1 pb-12 overflow-auto dark:bg-background-primary-dark scrollbar-none no-scroll"
    >
      {isClipLoading ? (
        <div className="flex flex-col p-4 gap-3">
          <SkeletonUI.ClipList numCards={3} />
        </div>
      ) : (
        <>
          {list.length > 0 ? (
            <MemoizedClipList list={list} renderItem={renderItem} />
          ) : (
            <div className="h-full pt-[220px]">
              <p className="dark:text-text-placeholder-dark text-center">
                There are no forked links yet. <br />
                Try forking some interesting links!
              </p>
            </div>
          )}
        </>
      )}

      <ScrollUpButton scrollContainerRef={containerRef} />
      {isOpen && (
        <ConfirmModal
          setIsOpen={setIsOpen}
          text="Delete this fork?"
          onAgree={() => {
            handleOpenModal();
          }}
          onCancel={() => {
            setIds({ clipId: '', forkId: '' });
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};
