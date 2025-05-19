import { openInNewTab } from '@/shared/core/utils';
import { ExternalLink } from 'lucide-react';

export const ExternalLinkButton = ({ link }: { link: string }) => {
  return (
    <div
      className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={(e) => openInNewTab(e, link)}
    >
      <ExternalLink size={16} />
    </div>
  );
};
