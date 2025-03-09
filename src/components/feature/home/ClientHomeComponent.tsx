'use client';

import { useForkQuery, useHomeClipQuery } from '@/hooks';
import { memo, useCallback, useRef, useState } from 'react';
import { ClipWithForked } from '@/types';
import { StatCountSection } from './StatCountSection';
import { ScrollUpButton } from '@/components/ui/buttons/ScrollUpButton';
import { SkeletonUI } from '@/components/skeleton/SkeletonUI';
import { HomeCard } from './HomeCard';
import { ForkModal } from '@/components/modals/ForkModal';
import { useRouter } from 'next/navigation';
import { createToast } from '@/libs/toast';
import { markIntersectingElementsAsForked } from '@/utils';
import { HomeClipList } from './HomeClipList';

const MemoizedClipList = memo(HomeClipList);
const MemoizedHomeCard = memo(HomeCard);

export const ClientHomeComponent = () => {
  const {
    home: { list, isClipLoading, forked },
  } = useHomeClipQuery();
  const { doFork } = useForkQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const containerRef = useRef(null);
  const toast = createToast();

  // 포크 처리 핸들러
  const handleFork = useCallback(
    async (clipId: string) => {
      const code = await doFork({ clipId });
      if (code === '5000') {
        setIsOpen(true);
      }
    },
    [doFork, toast]
  );

  const markedList = markIntersectingElementsAsForked(list, forked);

  const renderItem = useCallback((clip: ClipWithForked) => {
    return <MemoizedHomeCard {...clip} onFork={handleFork} />;
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
        <MemoizedClipList list={markedList || []} renderItem={renderItem} scrollAreaRef={containerRef} />
      )}

      <ScrollUpButton scrollContainerRef={containerRef} />
      {isOpen && (
        <ForkModal
          setIsOpen={setIsOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          onGoForks={() => {
            setIsOpen(false);
            router.push('/forks');
          }}
        />
      )}
    </div>
  );
};
