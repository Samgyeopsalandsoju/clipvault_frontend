'use client';

import { ICategoryResponse, IClipResponse } from '@/types';
import { useMemo, useState } from 'react';

export const useClipFilter = (data: IClipResponse[]) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // 클립 리스트에서 카테고리 set으로 중복없는 배열 뽑아내기
  const categories = useMemo(() => {
    const seen = new Set<string>();
    return data.reduce((acc, clip) => {
      if (!seen.has(clip.category.id)) {
        seen.add(clip.category.id);
        acc.push(clip.category);
      }
      return acc;
    }, [] as ICategoryResponse[]);
  }, [data]);

  // 카테고리 선택 한번 더 누르면 선택 해제
  const handleCategorySelect = (id: string): void => {
    if (selectedCategoryId === id) {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(id);
    }
  };

  // 필터 된 카테고리
  const filteredClipList = useMemo((): IClipResponse[] => {
    const filteredList = selectedCategoryId ? data.filter((clip) => clip.category.id === selectedCategoryId) : data;
    return filteredList.length > 0 ? filteredList : data;
  }, [data, selectedCategoryId]);

  return { categories, handleCategorySelect, filteredClipList };
};
