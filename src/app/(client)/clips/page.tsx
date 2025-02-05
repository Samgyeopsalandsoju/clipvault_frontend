'use client';

import { useClipFilter } from '@/hooks/clip/useClipFilter';
import CreateClipButton from '@/components/CreateClipButton';
import { useClipQuery } from '@/hooks/clip/useClipQuery';
import ClipList from '@/components/clip/ClipList';
import { ScrollContainer } from './clips.styles';
import { useEditClipForm } from '@/hooks/form/useEditClipForm';
import ClipCard from '@/components/clip/ClipCard';
import { Stack } from '@mui/material';
import styled from 'styled-components';
import CategoriesTags from '@/components/CategoriesTags';
import ShareListButton from '@/components/ShareListButton';

const ClipsPage = () => {
  const {
    clipList: { data },
  } = useClipQuery();
  const { filteredClipList, categories, handleCategorySelect } = useClipFilter(data);
  const { handleClipClick } = useEditClipForm();

  return (
    <PageContainer>
      <CategoriesTags categories={categories} onSelect={handleCategorySelect} />
      <ScrollContainer>
        <ClipList
          list={filteredClipList}
          renderItem={(clip) => (
            <div onClick={() => handleClipClick(clip.id)}>
              <ClipCard {...clip} />
            </div>
          )}
        />
        <CreateClipButton />
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
