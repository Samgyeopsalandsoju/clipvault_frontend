'use client';
import { useEffect, useRef } from 'react';

export const CountDownTimer = ({ targetDate }: { targetDate: string }) => {
  const timeDisplayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    let animationFrameId: number;

    // 시간을 포맷팅하는 함수
    const formatTime = (milliseconds: number) => {
      // 음수 시간 처리
      if (milliseconds < 0) return '00:00:00';

      const seconds = Math.floor((milliseconds / 1000) % 60);
      const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
      const hours = Math.floor(milliseconds / (1000 * 60 * 60));
      const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
      // 1일 이상인 경우 'N일' 형식으로 반환
      if (days >= 1) {
        return `${days} days left`;
      }

      // 1일 미만인 경우 'HH:MM:SS' 형식으로 반환
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
      )} left`;
    };
    // 애니메이션 업데이트 함수
    const updateDisplay = () => {
      const now = Date.now();
      const remaining = target - now;

      if (timeDisplayRef.current) {
        // 시간 텍스트 업데이트
        timeDisplayRef.current.textContent = formatTime(remaining);
      }

      if (remaining <= 0) {
        // 타이머 완료 처리
        cancelAnimationFrame(animationFrameId);
        return;
      }
      // 다음 프레임 요청
      animationFrameId = requestAnimationFrame(updateDisplay);
    };

    // 초기 실행
    animationFrameId = requestAnimationFrame(updateDisplay);

    // 클린업
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetDate]);

  return <span ref={timeDisplayRef} />;
};
