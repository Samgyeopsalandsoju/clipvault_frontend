'use client';

import { useClipQuery } from '@/hooks';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

export const CreateClipButton = () => {
  const LIMIT_LIST = 100;
  const {
    clips: { clipList },
  } = useClipQuery();
  const isOver = clipList.length >= LIMIT_LIST;
  const router = useRouter();

  const handleNewClick = () => {
    if (isOver) {
      return;
    } else {
      router.push('/clips/new');
    }
  };

  return (
    <div
      className={classNames(
        'border-t border-0 border-solid rounded-br-[18px] rounded-bl-[18px] absolute capitalize max-w-[480px]',
        'bottom-0 left-0 right-0 h-[60px] m-auto font-semibold text-[15px] z-[2]',
        'dark:bg-background-primary-dark dark:border-border-focus-dark',
        'dark:text-text-primary-dark'
      )}
      onClick={handleNewClick}
    >
      {isOver ? (
        'Maximum Clips Reached (100/100)'
      ) : (
        <div className="relative w-full h-full flex justify-center items-center">
          Create Clip!{' '}
          <span className="dark:text-text-placeholder-dark pl-2 absolute text-xs bottom-2 right-3">
            {' '}
            {clipList.length}/100
          </span>
        </div>
      )}
    </div>
  );
};
