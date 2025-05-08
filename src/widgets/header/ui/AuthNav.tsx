'use client';

import { useAuthModalStore } from '@/features/auth/login/model/store';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LogoutButton } from '@/features/auth/logout/ui/LogoutButton';
import { useBreakpoint } from '@/shared/core/hooks';
import { useEffect, useState } from 'react';

export const AuthNav = () => {
  const { data: _, status } = useSession();
  const breakpoint = useBreakpoint();
  const pathname = usePathname();
  // 로그인 모달 오픈
  const handleLoginModalOpen = useAuthModalStore((state) => state.onLoginModalOpen);

  // 클라이언트 마운트 상태 관리
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드 마운트 감지
  useEffect(() => {
    setMounted(true);
  }, []);
  // 로딩 중이거나 마운트되지 않았을 때 빈 공간 유지
  if (status === 'loading' || !mounted) {
    return (
      <div className="items-center gap-4 flex invisible">
        <div className="text-sm">login</div>
        <div className="text-sm">register</div>
      </div>
    );
  }

  const isLoggedIn = status === 'authenticated';
  const isRegisterPage = pathname.includes('/register');
  const isMobile = breakpoint === 'mobile';

  // 회원가입 페이지에서는 로그인 버튼을 보여주지 않음
  if (isRegisterPage) return null;
  // 로그인 상태에서는 로그아웃 버튼 렌더링
  if (isLoggedIn) return <LogoutButton />;
  // 모바일에서는 로그인 버튼을 보여주지 않음
  if (isMobile) return null;

  return (
    <nav className="items-center gap-4 flex">
      <motion.div className="cursor-pointer text-sm" onClick={() => handleLoginModalOpen()}>
        login
      </motion.div>
      <Link href="/register" className="cursor-pointer text-sm">
        register
      </Link>
    </nav>
  );
};
