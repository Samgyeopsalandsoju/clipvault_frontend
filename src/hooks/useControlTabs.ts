'use client';

import { MENU } from '@/constants';
import { ITabs } from '@/types';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useControlTabs = () => {
  const PROTECTED_TABS: string[] = ['clips', 'forks', 'shared'];
  const params = usePathname();
  const { data: _, status } = useSession();
  const [protectedTabs, setProtectedTabs] = useState<ITabs[]>([]);

  // 텝 필터링
  useEffect(() => {
    if (status === 'unauthenticated') {
      const tabs = MENU.filter((v) => !PROTECTED_TABS.includes(v.name));
      setProtectedTabs(tabs);
    } else if (status === 'authenticated') {
      setProtectedTabs(MENU);
    }
  }, [status]);

  // 현재 텝이 눌러져있느지 확인
  const isActive = (path: string): boolean => {
    const currentPath = params.split('/')[1];
    const menuPath = path.split('/')[1];
    if (currentPath === 'category' && menuPath === 'clips') {
      return true;
    }

    return currentPath === menuPath;
  };
  return {
    protectedTabs,
    isActive,
  };
};
