import { ForkButton } from '@/features/fork';
import { IClipEntry } from '../model/type';
import { CopyButton } from '@/shared/ui/button/CopyButton';
import { ExternalLinkButton } from '@/shared/ui/button/ExternalLinkButton';

// 퍼블릭 링크 엔트리
export const ClipCardEntry = ({ category, title, link, forkedCount, id, isForked }: IClipEntry) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-blue-200 flex flex-col h-full">
      <div className="p-4 flex-grow">
        {/** 카드 헤더 */}
        <div className="flex items-center justify-between mb-3">
          {/* 카테고리 배지 */}
          <div
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              color: '#fff',
              backgroundColor: category.color,
            }}
          >
            {category.name}
          </div>

          {/* 액션 버튼 그룹 */}
          <div className="flex items-center space-x-2">
            {/* 복사 버튼 */}
            <CopyButton link={link} />

            {/* 새 창에서 열기 버튼 */}
            <ExternalLinkButton link={link} />
          </div>
        </div>
        {/** 제목 */}
        <h3 className="font-medium text-lg text-gray-900 mb-2 line-clamp-2">{title}</h3>
        {/** 링크 미리보기 */}
        <p className="text-sm text-gray-500 truncate mb-2 select-none">{link}</p>
      </div>
      {/* 카드 푸터 영역 */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        {/* 즐겨찾기 버튼 */}
        <ForkButton forkedCount={forkedCount} clipId={id} isForked={isForked} />

        {/* 도메인 표시 */}
        <div className="text-xs text-gray-400">{new URL(link).hostname.replace('www.', '')}</div>
      </div>
    </div>
  );
};
