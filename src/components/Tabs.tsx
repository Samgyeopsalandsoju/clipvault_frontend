'use client';

import { useControlTabs } from '@/hooks/useControlTabs';
import classNames from 'classnames';
import Link from 'next/link';

const ClipTabs = () => {
  const { isActive, protectedTabs } = useControlTabs();

  return (
    <nav className="border-b dark:border-border-primary-dark">
      <div className="flex flex-row items-center px-4">
        {protectedTabs.map((item, index) => {
          return (
            <button
              className={classNames('px-4 py-[0.75rem] font-medium border-b-2', {
                'text-gray-100 border-white': isActive(item.path),
                'text-gray-400 border-transparent': !isActive(item.path),
              })}
              value={item.name}
              key={index}
            >
              <Link href={item.path}>{item.name}</Link>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ClipTabs;
