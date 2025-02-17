'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useClipQuery } from '@/hooks';
import { ICategoryRequest, ICreateClip, VisibilityType } from '@/types';
import { createClipValidator } from '@/utils';
import { useClipPageStore } from '@/stores/useClipPageStore';

export const useNewClipForm = () => {
  const { setIsOpen: setIsClipPageOpen } = useClipPageStore();
  const validator = createClipValidator();
  const {
    clip: { create },
  } = useClipQuery();
  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateClip>({
    mode: 'onChange',
  });

  useEffect(() => {
    setIsClipPageOpen(true);
    return () => setIsClipPageOpen(false);
  }, [setIsClipPageOpen]);

  //  새카테고리
  const handleCreateCategory = (category: ICategoryRequest): void => {
    setValue('category', category);
  };

  // 카테고리 선택
  const handleCategorySelect = (category: ICategoryRequest): void => {
    setValue('category', category);
  };

  // 공개 범위 선택
  const handleVisibilitySelect = (visibility: VisibilityType): void => {
    setValue('visible', visibility);
  };

  // 링크 생성
  const onSubmit = (data: ICreateClip): void => {
    create(data);
  };

  return {
    register,
    trigger,
    handleSubmit,
    handleCategorySelect,
    handleVisibilitySelect,
    handleCreateCategory,
    onSubmit,
    errors,
  };
};
