import { Bookmark, ExternalLink } from 'lucide-react';
import { generateModernTagColors, openInNewTab } from '@/shared/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { IClipEntry } from '../model/type';

// 퍼블릭 링크 엔트리
export const ClipCardEntry = ({ category, title, link, forkedCount }: IClipEntry) => {
  const [isSwipedOut, setIsSwipedOut] = useState(false);
  const { background, text } = generateModernTagColors(+category.color);
  return (
    <div
      className="shadow-md bg-gray-200 rounded-lg relative"
      onMouseEnter={() => setIsSwipedOut(true)}
      onMouseLeave={() => setIsSwipedOut(false)}
    >
      {/* 외부 링크 버튼 */}
      <motion.button
        className="absolute right-0 top-1/2 -translate-y-1/2 pr-2"
        animate={{ opacity: isSwipedOut ? 1 : 0 }}
        transition={{ duration: 0.3, type: 'tween' }}
        onClick={() => openInNewTab(link)}
      >
        <ExternalLink size={24} className="text-gray-500 hover:text-gray-600 cursor-pointer" />
      </motion.button>

      {/* 클립 카드 */}
      <motion.div
        className="bg-white w-full shadow-md hover:shadow-lg rounded-lg"
        animate={{ x: isSwipedOut ? -40 : 0 }}
        transition={{ duration: 0.3, type: 'tween' }}
      >
        <div className="p-4  flex flex-col gap-5">
          {/* 상단 영역: 북마크 아이콘과 횟수 + 카테고리 태그 */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <Bookmark size={20} strokeWidth={1} className="cursor-pointer" />
              <span className="text-sm text-gray-500">{forkedCount}</span>
            </div>
            <div className="flex items-center">
              <span
                className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: background, color: text }}
              >
                {category.name}
              </span>
            </div>
          </div>
          {/* 제목 */}
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{title}</h3>

          {/* 링크 URL */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 flex-shrink-0 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <p className="truncate">{link}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
