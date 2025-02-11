import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { MENU } from '@/constants/common.constants';
import { useEffect, useState } from 'react';

export const useControlTabs = () => {
  const params = usePathname();
  const { data: _, status } = useSession();
  const protectedMenu = ['clips', 'forks', 'shared'];
  const [protectedTabs, setProtectedTabs] = useState<
    {
      path: string;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      const tabs = MENU.filter((v) => !protectedMenu.includes(v.name));

      setProtectedTabs(tabs);
    } else if (status === 'authenticated') {
      setProtectedTabs(MENU);
    }
  }, [status]);

  const isActive = (path: string) => {
    const currentPath = params.split('/')[1];
    const menuPath = path.split('/')[1];
    return currentPath === menuPath;
  };
  return {
    protectedTabs,
    isActive,
  };
};
