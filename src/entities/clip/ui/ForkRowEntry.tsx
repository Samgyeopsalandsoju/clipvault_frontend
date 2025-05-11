import { ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/shared/core/hooks';
import { copyLink, openInNewTab } from '@/shared/core/utils';
import { IFork } from '@/shared/data/types/fork';
import { generateModernTagColors } from '@/shared/core/utils/color';

export const ForkRowEntry = ({ categoryColor, categoryName, clipLink, clipTitle }: IFork) => {
  const { background, text } = generateModernTagColors(categoryColor);
  const toast = useToast();
  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 py-2 px-3 border cursor-pointer">
      {/* 북마크 아이콘과 숫자 */}
      <div className="flex items-center mr-3">
        <span
          className="text-xs font-medium px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: background, color: text }}
        >
          {categoryName}
        </span>
      </div>

      {/* 제목 */}
      <div className="flex-1 min-w-0 flex items-center justify-start">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{clipTitle}</h3>
      </div>

      {/* 링크 URL */}
      <div className="flex items-center text-xs text-gray-500 flex-1 min-w-0">
        <span className="w-2 h-3 mr-1 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14.828 14.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </span>
        <p className="truncate">{clipLink}</p>
      </div>
      {/* 버튼 섹션 */}
      <div className="flex items-center gap-2">
        {/* 복사 버튼 */}
        <div
          className="flex items-center justify-center p-1.5 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
          onClick={(e) =>
            copyLink(
              e,
              clipLink,
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
          onClick={(e) => openInNewTab(clipLink)}
        >
          <ExternalLink size={16} />
        </div>
      </div>
    </div>
  );
};
