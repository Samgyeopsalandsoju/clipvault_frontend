'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { NAV_ITEMS, PROTECTED_NAV_PATH } from '../model/constants';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const MainNav = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  // 로그인 상태에 따른 메뉴 필터링
  const menuItems = NAV_ITEMS.filter((item) => {
    const isProtected = PROTECTED_NAV_PATH.some((path) => item.href.startsWith(path));
    if (isProtected) return session?.user;
    return true;
  });

  // 클라이언트 사이드 마운트 상태 추적
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 로딩 상태일 때 공간을 차지할 요소
  if (status === 'loading' || !mounted) {
    return (
      <nav className="items-center gap-6 hidden md:flex md:flex-1">
        <div className="invisible font-extralight px-2 py-1 relative"></div>
      </nav>
    );
  }

  return (
    <nav className="items-center gap-6 hidden md:flex md:flex-1">
      {menuItems.map((item, index) => (
        <Link className="cursor-pointer font-extralight px-2 py-1 relative" href={item.href} key={index}>
          {item.label}
          {/** 현재 페이지에 맞는 라인 표시 */}
          {isActive(item.isShowing) && (
            <motion.div layoutId="border" className="border-b border-black absolute bottom-0 left-0 w-full" />
          )}
        </Link>
      ))}
    </nav>
  );
};
