import { Paperclip } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetTrigger } from '@/shared/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { NavSheet } from './Nav';
import { NAV_ITEMS } from '../constants';
import clsx from 'clsx';
import AuthNav from './AuthNav';
import MainNav from './MainNav';

// 헤더
async function Header() {
  return (
    <header
      className={clsx('sticky top-0 w-full bg-white z-20', 'lg:px-[80px] border-b border-dotted')}
    >
      <section className="flex items-center gap-10 border-l border-r border-dotted px-5 py-4">
        <Link className="flex items-center gap-1 cursor-pointer" href="/">
          <Paperclip strokeWidth={2.4} className="w-5 h-5 text-primary" />
          <h1 className="text-xl text-primary tracking-tighter font-bold">clipValut</h1>
        </Link>
        {/* 메인 네비게이션 */}
        <MainNav />
        {/* 데스크톱에서만 보이는 AuthNav */}
        <AuthNav />
        {/* 모바일에서만 보이는 메뉴 버튼 */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <NavSheet />
        </Sheet>
      </section>
    </header>
  );
}

export { Header };
