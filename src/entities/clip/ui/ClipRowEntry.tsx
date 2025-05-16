import { IClipEntry } from '../model/type';
import { useToast } from '@/shared/core/hooks';
import { ForkBadge } from '@/shared/ui/ForkBadge';
import { ExternalLinkButton } from '@/shared/ui/button/ExternalLinkButton';
import { CopyButton } from '@/shared/ui/button/CopyButton';

export const ClipRowEntry = ({ forkedCount, link, title, onClick }: IClipEntry) => {
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
          <ForkBadge forkedCount={forkedCount} isForked={true} />
          {/* 복사 버튼 */}
          <CopyButton link={link} />
          {/* 바로가기 버튼 */}
          <ExternalLinkButton link={link} />
        </div>
      </div>
    </div>
  );
};
