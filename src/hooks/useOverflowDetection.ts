'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseOverflowDetectionProps<T> {
  data: T[];
}

export const useOverflowDetection = <T>({ data }: UseOverflowDetectionProps<T>) => {
  const [needsExpansion, setNeedsExpansion] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 텝의 전체 길이를 계산하고 카테고리 리스트 길이를 계산하고 화면에 보여줄때 어떻게 보여줄지 판단
  const checkOverflew = useCallback((): void => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const actualContentWidth = contentRef.current.scrollWidth;
      const contentWidth = actualContentWidth;
      setNeedsExpansion(containerWidth < contentWidth);
    }
  }, [data]); // data가 변경될 때마다 함수를 새로 생성

  // 데이터가 변경될 때마다 오버플로우 체크
  useEffect(() => {
    checkOverflew();
  }, [checkOverflew, data]);

  // 리사이즈 이벤트 처리
  useEffect(() => {
    window.addEventListener('resize', checkOverflew);
    return () => window.removeEventListener('resize', checkOverflew);
  }, [checkOverflew]);

  return {
    containerRef,
    contentRef,
    needsExpansion,
    isExpanded,
    setIsExpanded,
  };
};
