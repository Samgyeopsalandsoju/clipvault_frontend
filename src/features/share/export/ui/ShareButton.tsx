'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/shadcn';
import clsx from 'clsx';
import { Share } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { IClip } from '@/shared/data/types';

const ShareModal = dynamic(() => import('./ShareModal').then((mod) => ({ default: mod.ShareModal })), {
  loading: () => null, // 모달이므로 로딩 UI가 필요 없음
});

export const ShareButton = ({ list }: { list: IClip[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={clsx(
                // 'fixed bottom-20 right-20 rounded-full border w-8 h-8',
                // 'flex items-center justify-center text-gray-400',
                'bg-transparent text-gray-400 flex items-center justify-center',
                'hover:text-gray-700 cursor-pointer active:scale-[0.97]'
              )}
              onClick={() => setIsOpen(true)}
            >
              <Share size={15} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>share your list</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ShareModal isOpen={isOpen} onClose={() => setIsOpen(false)} list={list} />
    </>
  );
};
