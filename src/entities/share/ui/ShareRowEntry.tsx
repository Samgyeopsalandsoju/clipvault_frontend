import { Ban, Copy, ExternalLink } from 'lucide-react';
import { IShareRowEntry } from '../model/type';
import { useToast } from '@/shared/core/hooks';
import { copyLink, openInNewTab } from '@/shared/core/utils';
import { CountDownTimer } from '@/shared/ui/CountDownTimer';

export const ShareRowEntry = ({ title, link, due, onDelete, id }: IShareRowEntry) => {
  const toast = useToast();

  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 py-2 px-3 border cursor-pointer">
      {/* 북마크 아이콘과 숫자 */}
      <div className="flex items-center space-x-1 w-14">
        <button
          className="flex items-center space-x-2 text-red-700 hover:text-red-500 active:scale-[0.97]"
          onClick={() => onDelete({ id, link })}
        >
          <Ban />
        </button>
      </div>

      {/* 제목 */}
      <div className="flex-1 min-w-0 flex items-center justify-start">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{title}</h3>
      </div>

      {/* 링크 URL */}
      <div className="flex items-center text-xs text-gray-500 flex-1 min-w-0">
        <CountDownTimer targetDate={due} />
      </div>
      {/* 버튼 섹션 */}
      <div className="flex items-center gap-2">
        {/* 복사 버튼 */}
        <div
          className="flex items-center justify-center p-1.5 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
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
        {/* 바로가기 버튼 */}
        <div
          className="flex items-center justify-center p-1.5 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
          onClick={(e) => openInNewTab(link)}
        >
          <ExternalLink size={16} />
        </div>
      </div>
    </div>
  );
};
