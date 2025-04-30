'use client';

import { useAuthModalStore } from '@/features/auth/login/model/store';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export const AuthNav = () => {
  const pathname = usePathname();
  // 로그인 모달 오픈
  const handleLoginModalOpen = useAuthModalStore((state) => state.onLoginModalOpen);

  const isRegisterPage = pathname.includes('/register');

  // 회원가입 페이지에서는 로그인 버튼을 보여주지 않음
  if (isRegisterPage) return null;
  return (
    <nav className="items-center gap-4 hidden md:flex">
      <motion.div className="cursor-pointer text-sm" onClick={() => handleLoginModalOpen()}>
        login
      </motion.div>
      <Link href="/register" className="cursor-pointer text-sm">
        register
      </Link>
    </nav>
  );
};
