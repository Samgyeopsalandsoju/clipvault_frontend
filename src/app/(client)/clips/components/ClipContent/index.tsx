import { TabType } from '@/types/clip';
import MyClipTab from './MyClipTab';
import ForkClipTab from './ForkClipTab';

interface ContentsProps {
  currentTab: TabType;
}

const ClipContent = ({ currentTab }: ContentsProps) => {
  return <>{currentTab === 'clip' ? <MyClipTab /> : <ForkClipTab />}</>;
};

export default ClipContent;
