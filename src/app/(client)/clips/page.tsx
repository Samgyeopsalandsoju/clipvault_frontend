'use client';

import { memo, useCallback, useRef } from 'react';
import { useClipFilter, useClipQuery, useEditClipForm } from '@/hooks';
import { CategoriesTags, ClipCard, ClipList, ScrollUpButton, ShareListButton } from '@/components';
import { IClipResponse } from '@/types';

const MemoizationClipCard = memo(ClipCard);

const ClipsPage = () => {
  const {
    clipList: { data },
  } = useClipQuery();
  const { filteredClipList, categories, handleCategorySelect } = useClipFilter(data);
  const { handleClipClick } = useEditClipForm();
  const containerRef = useRef<HTMLDivElement>(null);

  const renderItem = useCallback((clip: IClipResponse) => {
    return (
      <div onClick={() => handleClipClick(clip.id)}>
        <MemoizationClipCard {...clip} />
      </div>
    );
  }, []);

  return (
    <div className="flex flex-col flex-1 h-full">
      {!!filteredClipList.length && <CategoriesTags categories={categories} onSelect={handleCategorySelect} />}
      <div
        ref={containerRef}
        className="relative flex-1 pb-8 overflow-auto dark:bg-background-primary-dark scrollbar-none no-scroll"
      >
        {filteredClipList.length > 0 ? (
          <>
            <ClipList list={filteredClipList} renderItem={renderItem} />

            <ScrollUpButton scrollContainerRef={containerRef} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center select-none h-[50%] dark:text-text-placeholder-dark">
            Looks like you don't have any clips yet...
            <br /> start adding some!
          </div>
        )}
      </div>

      {filteredClipList.length && <ShareListButton list={filteredClipList} />}
    </div>
  );
};
export default ClipsPage;
