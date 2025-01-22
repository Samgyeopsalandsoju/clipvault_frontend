import { ScrollContainer } from '@/features/clip/pages/shared/styles';
import ClipList from '../../clips/ClipList';
import CategoryTabSection from '../categorytab/CategoryTabSection';

const MyClipTab = () => {
  return (
    <ScrollContainer>
      <CategoryTabSection />
      <ClipList />
    </ScrollContainer>
  );
};

export default MyClipTab;
