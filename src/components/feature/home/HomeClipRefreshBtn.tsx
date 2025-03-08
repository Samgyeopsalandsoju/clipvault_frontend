'use client';

import { useHomeClipQuery } from '@/hooks';
import classNames from 'classnames';
import { RefreshCw } from 'lucide-react';
import { RefObject, useEffect, useRef, useState } from 'react';

interface ScrollToTopProps {
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
}

export const HomeClipRefreshBtn = ({ scrollAreaRef }: ScrollToTopProps) => {
  const MAX_REFRESH_COUNT = 5;
  const WAIT_SECONDS = 30;
  const [clickCount, setClickCount] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timerRef = useRef<number | null>(null);
  const {
    home: { refresh },
  } = useHomeClipQuery();

  useEffect(() => {
    // disabled 일 경우
    if (isDisabled) {
      // 시간 설정
      setTimeLeft(WAIT_SECONDS);
      // 타임 카운트 다운
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          // 타임이 1보다 작거나 클 경우
          if (prev <= 1) {
            if (timerRef.current !== null) {
              window.clearInterval(timerRef.current);
            }
            setIsDisabled(false);
            setClickCount(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isDisabled]);

  const handleRefresh = () => {
    if (isDisabled) return;

    // 카운트 업
    setClickCount((prev) => prev + 1);
    // 리스트 리프레시
    refresh();

    // 스크롤 업
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    // 카운트 소진 시 disabled
    if (clickCount >= MAX_REFRESH_COUNT - 1) {
      setIsDisabled(true);
    }
  };

  return (
    <div
      className={classNames(
        'group border-2 border-dashed dark:border-border-focus-dark rounded-xl flex py-2 mt-5 justify-center gap-3',
        'dark:text-text-placeholder-dark !cursor-pointer active:scale-[0.97] select-none items-center',
        'hover:dark:text-text-primary-dark hover:dark:border-border-divider-dark'
      )}
      onClick={handleRefresh}
    >
      <RefreshCw size={20} className="group-active:rotate-180 transition-transform duration-300" />
      <div className="">
        {isDisabled
          ? `Try again in ${timeLeft} seconds`
          : `refresh list! ( ${MAX_REFRESH_COUNT - clickCount} times left )`}
      </div>
    </div>
  );
};
