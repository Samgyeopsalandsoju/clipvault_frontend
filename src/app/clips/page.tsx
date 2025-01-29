'use client';

import { useClipFilter } from '@/hooks/clip/useClipFilter';
import CreateClipButton from '@/components/CreateClipButton';
import { useClipQuery } from '@/hooks/clip/useClipQuery';
import ClipList from '@/components/clip/ClipList';
import { ScrollContainer } from './clips.styles';
import CategoriesTabs from '@/components/CategoriesTabs';

const ClipsPage = () => {
  const {
    clipList: { data },
  } = useClipQuery();
  const { filteredClipList, categories, handleCategorySelect } = useClipFilter(data);
  return (
    <ScrollContainer>
      <CategoriesTabs categories={categories} onSelect={handleCategorySelect} />
      <ClipList list={filteredClipList} />
      <CreateClipButton />
    </ScrollContainer>
  );
};
export default ClipsPage;
