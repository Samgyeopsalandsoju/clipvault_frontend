'use client';

import { MENU } from '@/constants/common.constants';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ClipTabs = () => {
  const params = usePathname();

  const isActive = (path: string) => {
    const currentPath = params.split('/')[1];
    const menuPath = path.split('/')[1];
    return currentPath === menuPath;
  };

  return (
    <nav className="border-b dark:border-border-primary-dark">
      <div className="flex flex-row items-center px-4">
        {MENU.map((item, index) => {
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
