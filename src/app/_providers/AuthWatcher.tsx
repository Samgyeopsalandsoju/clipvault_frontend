'use client';

import { useToast } from '@/shared/core/hooks';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function AuthWatcher({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const toast = useToast();
  const router = useRouter();
  const loggedInRef = useRef<boolean>(false);
  const expiryTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 최초 로그인 성공 시 플래그 설정
  useEffect(() => {
    // 이전 타이머 정리
    if (expiryTimerRef.current) {
      clearTimeout(expiryTimerRef.current);
      expiryTimerRef.current = null;
    }
    console.log('세션 상태:', status, '세션:', session);
    if (status === 'authenticated' && session) {
      loggedInRef.current = true;

      // 세션 만료 시간 계산
      if (session.expires) {
        const expiryTime = new Date(session.expires).getTime();
        const currentTime = Date.now();
        const timeUntilExpiry = expiryTime - currentTime;

        console.log('세션 만료 시간:', new Date(expiryTime).toLocaleTimeString());
        console.log('남은 시간(초):', Math.floor(timeUntilExpiry / 1000));

        // 만료 시간에 맞춰 타이머 설정 (1초 일찍 설정)
        if (timeUntilExpiry > 1000) {
          expiryTimerRef.current = setTimeout(() => {
            console.log('세션 만료 타이머 실행!');
            // 로그아웃 처리
            signOut({ redirect: false }).then(() => {
              router.replace('/home');
              toast.error('세션이 만료되었습니다.');
            });
          }, timeUntilExpiry - 1000);

          console.log(`세션 만료 타이머 설정됨: ${Math.floor((timeUntilExpiry - 1000) / 1000)}초 후 실행`);
        }
      }
    }
    // 로그인했었는데 로그아웃 상태로 변경된 경우
    else if (loggedInRef.current && status === 'unauthenticated') {
      router.replace('/home');
      toast.error('세션이 만료되었습니다.');
    }

    // 클린업
    return () => {
      if (expiryTimerRef.current) {
        clearTimeout(expiryTimerRef.current);
        expiryTimerRef.current = null;
      }
    };
  }, [session, status, router, toast]);

  // // 세션 상태 변화 감지
  // useEffect(() => {
  //   console.log('status', status);
  //   if (loggedInRef.current && status === 'unauthenticated') {
  //     router.replace('/home');
  //     toast.error('세션이 만료되었습니다.');
  //   }
  // }, [status, router]);

  return <>{children}</>;
}
