import { Ban } from 'lucide-react';
import { IShareRowEntry } from '../model/type';
import { CountDownTimer } from '@/shared/ui/CountDownTimer';
import { ExternalLinkButton } from '@/shared/ui/button/ExternalLinkButton';
import { CopyButton } from '@/shared/ui/button/CopyButton';

export const ShareRowEntry = ({ title, link, due, onDelete, id }: IShareRowEntry) => {
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
        <CopyButton link={link} />
        {/* 바로가기 버튼 */}
        <ExternalLinkButton link={link} />
      </div>
    </div>
  );
};
