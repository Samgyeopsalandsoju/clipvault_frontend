'use client';

import classNames from 'classnames';
import { TabTag } from './Tag';
import { PencilLine } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const CategoryManageTag = () => {
  const router = useRouter();

  return (
    <TabTag
      className={classNames(
        'dark:bg-background-secondary-dark dark:text-text-placeholder-dark',
        'hover:dark:bg-border-secondary-dark active:scale-[0.97]',
        'border-solid border-[1px] dark:border-border-divider-dark'
      )}
      onClick={() => {
        router.push('/category');
      }}
    >
      <PencilLine size={20} />
    </TabTag>
  );
};
