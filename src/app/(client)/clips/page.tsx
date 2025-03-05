'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useCategoryQuery, useClipQuery, useEditClipForm } from '@/hooks';
import { ICategoryResponse, IClipResponse } from '@/types';
import { useClipStore } from '@/stores';
import { SkeletonUI } from '@/components/skeleton/SkeletonUI';
import { ClipCard } from '@/components/feature/clip/ClipCard';
import { CategoriesTags } from '@/components/ui/tags/CategoriesTags';
import { ClipList } from '@/components/feature/clip/ClipList';
import { ScrollUpButton } from '@/components/ui/buttons/ScrollUpButton';
import { ShareListButton } from '@/components/ui/buttons/ShareListButton';

const MemoizationClipCard = memo(ClipCard);

const ClipsPage = () => {
  const {
    clips: { clipList, isClipsLoading },
  } = useClipQuery();
  const {
    category: { categoryList, loading },
  } = useCategoryQuery();
  const { getFilteredClips, setSelectedCategoryId } = useClipStore();
  const { handleClipClick } = useEditClipForm();

  const containerRef = useRef<HTMLDivElement>(null);
  const filteredClipsList = getFilteredClips(clipList);

  const renderItem = useCallback((clip: IClipResponse) => {
    return (
      <div onClick={() => handleClipClick(clip.id)}>
        <MemoizationClipCard {...clip} />
      </div>
    );
  }, []);
  return (
    <div className="flex flex-col flex-1 h-full">
      {loading ? (
        <SkeletonUI.Tag />
      ) : (
        <CategoriesTags categories={categoryList || []} onSelect={setSelectedCategoryId} />
      )}

      <div
        ref={containerRef}
        className="relative flex-1 pb-8 overflow-auto dark:bg-background-primary-dark scrollbar-none no-scroll"
      >
        {isClipsLoading ? (
          <div className="flex flex-col p-4 gap-3">
            <SkeletonUI.ClipList numCards={5} />
          </div>
        ) : (
          <>
            {filteredClipsList.length > 0 ? (
              <>
                <ClipList list={filteredClipsList} renderItem={renderItem} />
                <ScrollUpButton scrollContainerRef={containerRef} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center select-none h-[50%] dark:text-text-placeholder-dark">
                Looks like you don't have any clips yet...
                <br /> start adding some!
              </div>
            )}
          </>
        )}
      </div>

      {filteredClipsList.length && <ShareListButton list={filteredClipsList} />}
    </div>
  );
};
export default ClipsPage;
