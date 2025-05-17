'use client';

import { useAuthModalStore } from '@/features/auth/login/model/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LogoutButton } from '@/features/auth/logout/ui/LogoutButton';
import { useEffect, useState } from 'react';

export const AuthNav = () => {
  const { data: _, status } = useSession();
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

  // 회원가입 페이지에서는 로그인 버튼을 보여주지 않음
  if (isRegisterPage) return null;

  return (
    <nav className="flex hidden md:block">
      {isLoggedIn ? (
        <LogoutButton />
      ) : (
        <div className="items-center gap-4 flex">
          <div className="cursor-pointer text-sm" onClick={() => handleLoginModalOpen()}>
            login
          </div>
          <Link href="/register" className="cursor-pointer text-sm">
            register
          </Link>
        </div>
      )}
    </nav>
  );
};
