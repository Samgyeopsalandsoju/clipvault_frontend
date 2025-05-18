import { Ban, Trash2 } from 'lucide-react';
import { IShareRowEntry } from '../model/type';
import { CountDownTimer } from '@/shared/ui/CountDownTimer';
import { ExternalLinkButton } from '@/shared/ui/button/ExternalLinkButton';
import { CopyButton } from '@/shared/ui/button/CopyButton';
import clsx from 'clsx';

export const ShareRowEntry = ({ title, link, due, onDelete, id }: IShareRowEntry) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer">
      <div className="flex items-center p-4">
        <div className="mx-5 flex-grow flex justify-between">
          {/* 제목 */}
          <p className="text-xs md:text-sm font-semibold text-gray-700 truncate w-[120px] lg:w-fit">{title}</p>
          {/* 남은 시간 */}
          <div className="flex items-center text-xs text-gray-500 min-w-0">
            <CountDownTimer targetDate={due} />
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex space-x-1 ml-2">
          {/* 복사 버튼 */}
          <CopyButton link={link} />
          {/* 바로가기 버튼 */}
          <ExternalLinkButton link={link} />
          {/* 포크 삭제 */}
          <div
            className={clsx(
              'p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer',
              'duration-500 ease-in-out hover:rotate-[20deg] transition-all text-gray-500 hover:text-red-500'
            )}
            onClick={() => onDelete({ id, link })}
          >
            <Trash2 size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
