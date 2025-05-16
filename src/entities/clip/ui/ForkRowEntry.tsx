import { useToast } from '@/shared/core/hooks';
import { IFork } from '@/shared/data/types/fork';
import { DeleteForkButton } from '@/features/clip-fork';
import { CopyButton } from '@/shared/ui/button/CopyButton';
import { ExternalLinkButton } from '@/shared/ui/button/ExternalLinkButton';

export const ForkRowEntry = ({ categoryColor, categoryName, clipLink, clipTitle, id, clipId }: IFork) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer">
      <div className="flex items-center p-4">
        <div
          className="rounded-xl text-sm font-semibold p-1 w-[70px] text-center"
          style={{
            backgroundColor: categoryColor,
            color: '#fff',
          }}
        >
          {categoryName}
        </div>
        {/* 제목 */}
        <div className="ml-4 flex-grow">
          <p className="text-xs md:text-sm font-semibold text-gray-700 truncate w-[120px] lg:w-fit">{clipTitle}</p>
          <p className="text-xs text-gray-500 flex-1 min-w-0 mt-1 truncate w-[100px] md:w-[100px] lg:w-[300px]">
            {clipLink}
          </p>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex space-x-1 ml-2">
          {/* 복사 버튼 */}
          <CopyButton link={clipLink} />
          {/* 바로가기 버튼 */}
          <ExternalLinkButton link={clipLink} />
          {/* 포크 삭제 */}
          <DeleteForkButton clipId={clipId} forkId={id} />
        </div>
      </div>
    </div>
  );
};
