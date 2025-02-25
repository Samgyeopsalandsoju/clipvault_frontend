import { Link2 } from 'lucide-react';
import Link from 'next/link';
import { NavigationDrawer } from './NavigationDrawer';

export const HeaderServer = () => {
  return (
    <header className="py-2 px-4 flex items-center justify-between border-b dark:border-border-primary-dark">
      <div className="flex items-center gap-2 dark:text-text-primary-dark">
        <Link2 size={20} />
        <Link href={'/'}>
          <h1 className="text-[1.125rem] font-medium">clipVault</h1>
        </Link>
      </div>
      <NavigationDrawer />
    </header>
  );
};
