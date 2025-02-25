'use client';

import { useForkQuery, useHomeClipQuery } from '@/hooks';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { IClipResponse } from '@/types';
import { StatCountSection } from './StatCountSection';
import { ClipList } from '../clip/ClipList';
import { ScrollUpButton } from '@/components/ui/buttons/ScrollUpButton';
import { SkeletonUI } from '@/components/skeleton/SkeletonUI';
import { HomeCard } from './HomeCard';
import { ForkModal } from '@/components/modals/ForkModal';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { createToast } from '@/libs/toast';

const MemoizedClipList = memo(ClipList);
const MemoizedHomeCard = memo(HomeCard);

export const ClientHomeComponent = () => {
  const {
    home: { list, isClipLoading },
  } = useHomeClipQuery();
  const { doFork, isForking } = useForkQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const containerRef = useRef(null);
  const { data, status } = useSession();
  const toast = createToast();

  const handleFork = (clipId: string) => {
    console.log('status', status);
    if (!data?.accessToken) {
      toast.success('This service requires login.');
      return;
    }
    setIsOpen(true);
    doFork({ clipId });
  };

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
