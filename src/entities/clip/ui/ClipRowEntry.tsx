import { Bookmark, ExternalLink, Copy, Star } from 'lucide-react';
import { IClipEntry } from '../model/type';
import { useToast } from '@/shared/core/hooks';
import { copyLink, openInNewTab } from '@/shared/core/utils';

export const ClipRowEntry = ({ forkedCount, link, title, onClick }: IClipEntry) => {
  const toast = useToast();
  return (
    <div
      className="bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      {/* 북마크 아이콘과 숫자 */}
      <div className="flex items-center p-4">
        {/* 제목 */}
        <div className="ml-4 flex-grow">
          <p className="text-xs md:text-sm font-semibold text-gray-700 truncate w-[120px] lg:w-fit">{title}</p>
          <p className="text-xs text-gray-500 flex-1 min-w-0 mt-1 truncate w-[100px] md:w-[100px] lg:w-[300px]">
            {link}
          </p>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex space-x-1 ml-2">
          {/* 포크 카운터 - 다른 사용자들이 몇 번 포크했는지 표시 */}
          <div className="flex items-center px-2 py-1 bg-gray-100 rounded-md">
            <Star size={14} className="text-gray-500 mr-1.5" fill="currentColor" />
            <span className="text-xs font-medium text-gray-700">{forkedCount}</span>
          </div>
          {/* 복사 버튼 */}
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
          {/* 바로가기 버튼 */}
          <div
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={(e) => openInNewTab(link)}
          >
            <ExternalLink size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
