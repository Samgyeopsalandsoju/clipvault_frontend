import { TabType } from '@/features/clip/model/clip.type';
import MyClipTab from '../../navigation/MyClipTab';
import ForkClipTab from '../../navigation/ForkClipTab.tsx';

interface ContentsProps {
  currentTab: TabType;
}

const ClipContent = ({ currentTab }: ContentsProps) => {
  return <>{currentTab === 'clip' ? <MyClipTab /> : <ForkClipTab />}</>;
};

export default ClipContent;
