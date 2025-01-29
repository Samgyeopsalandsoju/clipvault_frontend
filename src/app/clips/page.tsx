'use client';

import { useClipFilter } from '@/hooks/clip/useClipFilter';
import CategoriesTabs from './components/CategoriesTabs';
import ClipList from '@/components/ClipList';
import { ScrollContainer } from './components/styles';
import CreateClipButton from '@/components/CreateClipButton';
import { useClipQuery } from '@/hooks/clip/clip/useClipQuery';

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
