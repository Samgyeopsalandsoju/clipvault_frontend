'use client';

import { useClipFilter } from '@/hooks/clip/useClipFilter';
import CreateClipButton from '@/components/CreateClipButton';
import { useClipQuery } from '@/hooks/clip/useClipQuery';
import ClipList from '@/components/clip/ClipList';
import { useEditClipForm } from '@/hooks/form/useEditClipForm';
import ClipCard from '@/components/clip/ClipCard';
import { Stack } from '@mui/material';
import styled from 'styled-components';
import CategoriesTags from '@/components/CategoriesTags';
import ShareListButton from '@/components/ShareListButton';
import { ScrollContainer } from '@/components/styled-components/ScrollContainer';
import { useRef } from 'react';
import ScrollUpButton from '@/components/ScrollUpButton';

const ClipsPage = () => {
  const {
    clipList: { data },
  } = useClipQuery();
  const { filteredClipList, categories, handleCategorySelect } = useClipFilter(data);
  const { handleClipClick } = useEditClipForm();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <PageContainer>
      <CategoriesTags categories={categories} onSelect={handleCategorySelect} />
      <ScrollContainer ref={containerRef}>
        <ClipList
          list={filteredClipList}
          renderItem={(clip) => (
            <div onClick={() => handleClipClick(clip.id)}>
              <ClipCard {...clip} />
            </div>
          )}
        />
        <CreateClipButton />
        <ScrollUpButton scrollContainerRef={containerRef} />
      </ScrollContainer>
      <ShareListButton list={filteredClipList} />
    </PageContainer>
  );
};
export default ClipsPage;

const PageContainer = styled(Stack)`
  flex: 1;
  height: 100%;
`;
