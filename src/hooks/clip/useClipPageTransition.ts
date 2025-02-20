'use client';

import { useClipPageStore } from '@/stores';
import { useRouter } from 'next/navigation';

export function useClipPageTransition() {
  const { setIsOpen } = useClipPageStore();

  const router = useRouter();

  // 슬라이드 다운 애니메이션을 실행한 후 페이지를 닫는 함수
  const handleClose = () => {
    // 먼저 슬라이드 다운 애니메이션을 시작
    setIsOpen(false);

    // 애니메이션이 완료된 후 라우팅
    setTimeout(() => {
      router.push('/clips');
    }, 300);
  };

  return { handleClose };
}
