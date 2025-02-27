'use client';

import { useAuthModal, useForkQuery, useHomeClipQuery } from '@/hooks';
import { memo, useCallback, useRef, useState } from 'react';
import { IClipResponse } from '@/types';
import { StatCountSection } from './StatCountSection';
import { ClipList } from '../clip/ClipList';
import { ScrollUpButton } from '@/components/ui/buttons/ScrollUpButton';
import { SkeletonUI } from '@/components/skeleton/SkeletonUI';
import { HomeCard } from './HomeCard';
import { ForkModal } from '@/components/modals/ForkModal';
import { useRouter } from 'next/navigation';
import { createToast } from '@/libs/toast';
import { authRef } from '@/stores';

const MemoizedClipList = memo(ClipList);
const MemoizedHomeCard = memo(HomeCard);

export const ClientHomeComponent = () => {
  const {
    home: { list, isClipLoading },
  } = useHomeClipQuery();
  const { doFork, isForking } = useForkQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setIsAuthModalOpen } = useAuthModal();
  const router = useRouter();
  const containerRef = useRef(null);
  const toast = createToast();

  const checkIsAuthenticated = () => authRef.isAuthenticated;
  // 포크 처리 핸들러
  const handleFork = useCallback(
    (clipId: string) => {
      const isCurrentlyAuthenticated = checkIsAuthenticated();

      console.log('isCurrentlyAuthenticated', isCurrentlyAuthenticated);
      if (!isCurrentlyAuthenticated) {
        toast.success('Please log in to fork this clip to your favorites.');
        setIsAuthModalOpen(true);
        return;
      }
      setIsOpen(true);
      doFork({ clipId });
    },
    [doFork, setIsAuthModalOpen, toast]
  );

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
