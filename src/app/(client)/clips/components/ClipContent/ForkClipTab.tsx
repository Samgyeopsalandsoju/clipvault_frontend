import { IClipResponse } from '@/types/clip';
import { ScrollContainer } from '../../styles';
import ClipList from '@/components/ClipList';

const FORK_CLIP_LIST: IClipResponse[] = [
  {
    id: '1',
    title: '타이틀',
    link: '링크',
    category: { id: '123', name: '카테고리', color: 'lightblue' },
    createdBy: '2025-01-25',
    visible: 'private',
    fork: '1',
  },
];

const ForkClipTab = () => {
  return (
    <ScrollContainer>
      <ClipList list={FORK_CLIP_LIST} />
    </ScrollContainer>
  );
};

export default ForkClipTab;
