'use client';
import { useRef, useState } from 'react';

export const useDragX = () => {
  const tabsRef = useRef<HTMLDivElement | null>(null); // `null` 초기값 설정
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [startX, setStartX] = useState(0); // 드래그 시작 마우스 X 좌표
  const [scrollLeft, setScrollLeft] = useState(0); // 드래그 시작 시 스크롤 위치

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tabsRef.current) return; // `null` 체크 추가
    setIsDragging(true);
    const container = tabsRef.current;
    setStartX(e.pageX - container.offsetLeft); // 클릭한 지점의 X 좌표
    setScrollLeft(container.scrollLeft); // 현재 스크롤 위치 저장
  };

  const handleMouseLeave = () => {
    if (isDragging) setIsDragging(false); // 드래그 상태 종료
  };

  const handleMouseUp = () => {
    setIsDragging(false); // 드래그 상태 종료
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !tabsRef.current) return; // 드래그 중이고 `containerRef`가 유효한 경우만 실행
    e.preventDefault();
    const container = tabsRef.current;
    const x = e.pageX - container.offsetLeft; // 현재 마우스 X 좌표
    const walk = (x - startX) * 1; // 드래그 속도 조절 (2배)
    container.scrollLeft = scrollLeft - walk; // 스크롤 위치 업데이트
  };

  return {
    tabsRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
    isDragging,
  };
};
