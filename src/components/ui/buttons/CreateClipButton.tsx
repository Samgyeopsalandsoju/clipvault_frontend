'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';

export const CreateClipButton = () => {
  const router = useRouter();

  const handleNewClick = () => {
    router.push('/clips/new');
  };

  return (
    <button
      className={classNames(
        'border-t border-0 border-solid rounded-br-[18px] rounded-bl-[18px] absolute capitalize max-w-[480px]',
        'bottom-0 left-0 right-0 h-[60px] m-auto font-semibold text-[15px] z-[2]',
        'dark:bg-background-primary-dark dark:border-border-focus-dark',
        'dark:text-text-primary-dark'
      )}
      onClick={handleNewClick}
    >
      Create Clip!
    </button>
  );
};
