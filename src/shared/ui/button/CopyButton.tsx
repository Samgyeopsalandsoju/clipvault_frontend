import { useToast } from '@/shared/core/hooks';
import { copyLink } from '@/shared/core/utils';
import { Copy } from 'lucide-react';

export const CopyButton = ({ link }: { link: string }) => {
  const toast = useToast();
  return (
    <div
      className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={(e) =>
        copyLink(
          e,
          link,
          () => toast.success('링크가 복사되었습니다.'),
          () => toast.error('링크 복사에 실패하였습니다. 잠시후 시도해주세요.')
        )
      }
    >
      <Copy size={16} />
    </div>
  );
};
