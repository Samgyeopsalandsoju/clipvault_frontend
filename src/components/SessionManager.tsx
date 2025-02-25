'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const SessionManager = () => {
  const { data: session, update } = useSession();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialized = useRef<boolean>(false);
  const router = useRouter();
  const THIRTY_MIN = 1000 * 60 * 30;

  useEffect(() => {
    if (!session) return;
    // useRef로 설정된 값을 값이 변경되도 리렌더링이 안되며 다른 요인으로 리렌더링이 일어나도
    // 값이 초기화 되지 않는다.
    const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        signOut();
        router.push('/home');
      }, THIRTY_MIN);
    };

    const extendSession = async () => {
      //세션 체크 후 연장
      if (session) await update();
    };

    const activityHandler = () => {
      resetTimer();
      extendSession();
    };

    if (!initialized.current) {
      // 사용자 활동 감지 이벤트 등록
      window.addEventListener('mousemove', activityHandler);
      window.addEventListener('keydown', activityHandler);
      window.addEventListener('scroll', activityHandler);
      window.addEventListener('click', activityHandler);
      initialized.current = true;
    }

    resetTimer();

    return () => {
      // 이벤트 제거
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('keydown', activityHandler);
      window.removeEventListener('scroll', activityHandler);
      window.removeEventListener('click', activityHandler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [session, update]);

  return null;
};
