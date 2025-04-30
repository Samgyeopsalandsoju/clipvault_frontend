'use client';

import Link from 'next/link';
import { NAV_ITEMS } from '../constants';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { motion } from 'framer-motion';

export const MainNav = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="items-center gap-6 hidden md:flex md-flex-1">
      {NAV_ITEMS.map((item, index) => (
        <Link
          className="cursor-pointer font-extralight px-2 py-1 relative"
          href={item.href}
          key={index}
        >
          {item.label}
          {/** 현재 페이지에 맞는 라인 표시 */}
          {isActive(item.href) && (
            <motion.div
              layoutId="border"
              className="border-b border-black absolute bottom-0 left-0 w-full"
            />
          )}
        </Link>
      ))}
    </nav>
  );
};
