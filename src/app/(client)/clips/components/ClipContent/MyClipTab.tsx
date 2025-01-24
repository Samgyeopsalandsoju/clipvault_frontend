import { ScrollContainer } from '../../styles';
import CategoriesTabs from '../CategoriesTabs';
import ClipList from '@/components/ClipList';
import { useClipManagement } from '@/hooks/clip/useClipManagement';

const MyClipTab = () => {
  const { filteredClipList, categories, handleCategorySelect } = useClipManagement();

  return (
    <ScrollContainer>
      <CategoriesTabs categories={categories} onSelect={handleCategorySelect} />
      <ClipList list={filteredClipList} />
    </ScrollContainer>
  );
};

export default MyClipTab;
