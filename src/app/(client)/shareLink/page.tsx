import { ClientShareLinkComponents } from '@/components/feature/share/ClientShareLinkComponents';
import { ShareTitleSection } from '@/components/feature/share/ShareTitleSection';

const shareLink = () => {
  return (
    <div>
      <ShareTitleSection />
      <ClientShareLinkComponents />
    </div>
  );
};

export default shareLink;
