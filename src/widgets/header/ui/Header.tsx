import { Paperclip } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetTrigger } from '@/shared/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { NavSheet } from './Nav';
import clsx from 'clsx';
function Header() {
  return (
    <header
      className={clsx('sticky top-0 w-full bg-white z-20', 'lg:px-[80px] border-b border-dotted')}
    >
      <section className="flex items-center gap-5 border-l border-r border-dotted px-5 py-4">
        <Link className="flex items-center gap-1 cursor-pointer" href="/">
          <Paperclip strokeWidth={2.4} className="w-5 h-5 text-primary" />
          <h1 className="text-xl text-primary tracking-tighter font-bold">clipValut</h1>
        </Link>
        <nav className="flex flex-1 items-center gap-6">
          <Link className="cursor-pointer font-extralight" href="/">
            Home
          </Link>
          <Link className="cursor-pointer font-extralight" href="/about">
            about
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
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
