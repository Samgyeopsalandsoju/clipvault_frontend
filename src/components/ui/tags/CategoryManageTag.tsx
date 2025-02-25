'use client';

import classNames from 'classnames';
import { PencilLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { withHideOnPaths } from '@/hoc/withHideOnPaths';

export const CategoryManageTag = withHideOnPaths(['/share'])(() => {
  const router = useRouter();

  return (
    <div
      className={classNames(
        'dark:bg-background-secondary-dark dark:text-text-placeholder-dark',
        'hover:dark:bg-border-secondary-dark active:scale-[0.97]',
        'border-solid border-[1px] dark:border-border-divider-dark',
        'px-[0.75rem] py-[0.25rem] rounded-[0.5rem] cursor-pointer select-none',
        'whitespace-nowrap'
      )}
      onClick={() => {
        router.push('/category');
      }}
    >
      <PencilLine size={20} />
    </div>
  );
});
