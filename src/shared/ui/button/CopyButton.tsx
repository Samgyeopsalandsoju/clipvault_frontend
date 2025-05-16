import { useToast } from '@/shared/core/hooks';
import { copyLink } from '@/shared/core/utils';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export const CopyButton = ({ link }: { link: string }) => {
  const toast = useToast();
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = (e: React.MouseEvent) => {
    copyLink(
      e,
      link,
      () => toast.success('링크가 복사되었습니다.'),
      () => toast.error('링크 복사에 실패하였습니다. 잠시후 시도해주세요.')
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={(e) => copyToClipboard(e)}
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </div>
  );
};
