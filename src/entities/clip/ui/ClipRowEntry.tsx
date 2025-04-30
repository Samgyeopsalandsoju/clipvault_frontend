import { IUserClip } from '@/shared/types/clip';
import { generateModernTagColors } from '@/shared/utils';
import { Bookmark, ExternalLink, Copy } from 'lucide-react';

export const ClipRowEntry = ({ category, forkedCount, link, title }: IUserClip) => {
  const { background, border } = generateModernTagColors(+category.color);
  return (
    <div
      className="flex items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-3 border"
      style={{ borderColor: border }}
    >
      {/* 북마크 아이콘과 숫자 */}
      <div className="flex items-center space-x-1 w-14">
        <button className="flex items-center space-x-2">
          <Bookmark size={16} fill={'currentColor'} />
          <span className="text-sm text-gray-500">{forkedCount}</span>
        </button>
      </div>

      {/* 제목 */}
      <div className="flex-1 min-w-0 flex items-center justify-start">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{title}</h3>
      </div>

      {/* 링크 URL */}
      <div className="flex items-center text-xs text-gray-500 flex-1 min-w-0">
        <span className="w-2 h-3 mr-1 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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
        <p className="truncate">{link}</p>
      </div>
      {/* 버튼 섹션 */}
      <div className="flex items-center gap-2">
        {/* 복사 버튼 */}
        <div className="flex items-center justify-center p-1.5 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
          <Copy size={16} />
        </div>
        {/* 바로가기 버튼 */}
        <div className="flex items-center justify-center p-1.5 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
          <ExternalLink size={16} />
        </div>
      </div>
    </div>
  );
};
