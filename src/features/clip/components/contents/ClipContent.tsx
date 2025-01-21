import { TabType } from '../../types';
import ForkClipTab from '../tabs/ForkClipTab';
import MyClipTab from '../tabs/MyClipTab';

interface ContentsProps {
  currentTab: TabType;
}

const ClipContent = ({ currentTab }: ContentsProps) => {
  return <>{currentTab === 'clip' ? <MyClipTab /> : <ForkClipTab />}</>;
};

export default ClipContent;
