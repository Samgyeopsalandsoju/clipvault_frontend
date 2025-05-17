import { Paperclip } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetTrigger, Button } from '@/shared/ui/shadcn';
import { Menu } from 'lucide-react';
import { NavSheet } from './NavSheet';
import clsx from 'clsx';
import { AuthNav } from './AuthNav';
import { MainNav } from './MainNav';
import { Suspense } from 'react';

// 헤더
export const Header = () => {
  return (
    <header className={clsx('sticky top-0 w-full bg-white z-20', 'lg:px-[200px] border-b border-dotted')}>
      <section className="flex items-center justify-between border-l border-r border-dotted px-5 py-4">
        <div className="flex gap-10">
          <Link className="flex items-center gap-1 cursor-pointer" href="/">
            <Paperclip strokeWidth={2.4} className="w-5 h-5 text-primary" />
            <h1 className="text-xl text-primary tracking-tighter font-bold">clipValut</h1>
          </Link>
          {/* 메인 네비게이션 */}
          <Suspense fallback={<div></div>}>
            <MainNav />
          </Suspense>
        </div>

        <div>
          {/* 데스크톱에서만 보이는 AuthNav */}
          <AuthNav />
          {/* 모바일에서만 보이는 메뉴 버튼 */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden flex-1 flex justify-end">
                <Menu />
              </Button>
            </SheetTrigger>
            <NavSheet />
          </Sheet>
        </div>
      </section>
    </header>
  );
};
