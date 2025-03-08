'use client';

import { IClipResponse } from '@/types/clip';
import { Share } from 'lucide-react';
import { useState } from 'react';
import classNames from 'classnames';
import { ShareLinkModal } from '@/components/modals/ShareLinkModal';

interface ShareButtonProps {
  list: IClipResponse[];
}

export const ShareListButton = ({ list }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleShareLink = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div
        className={classNames(
          'flex justify-center items-center absolute bottom-[90px] left-[20px] rounded-[20%] w-[2rem] h-[2rem]',
          'dark:text-text-placeholder-dark border-[1px] border-solid dark:border-border-secondary-dark cursor-pointer',
          'hover:scale-[1.2] hover:dark:text-text-primary hover:dark:bg-background-primary-dark'
        )}
        onClick={handleShareLink}
      >
        <Share size={18} />
      </div>
      {isOpen && <ShareLinkModal isOpen={isOpen} setIsOpen={setIsOpen} list={list} />}
    </>
  );
};
