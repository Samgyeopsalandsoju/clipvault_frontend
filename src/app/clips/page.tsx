'use client';

import { useClipManagement } from '@/hooks/clip/useClipManagement';
import CategoriesTabs from './components/CategoriesTabs';
import ClipList from '@/components/ClipList';
import { ScrollContainer } from './components/styles';
import CreateClipButton from '@/components/CreateClipButton';

const ClipsPage = () => {
  const { filteredClipList, categories, handleCategorySelect } = useClipManagement();
  return (
    <ScrollContainer>
      <CategoriesTabs categories={categories} onSelect={handleCategorySelect} />
      <ClipList list={filteredClipList} />
      <CreateClipButton />
    </ScrollContainer>
  );
};
export default ClipsPage;
