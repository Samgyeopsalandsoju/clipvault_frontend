'use client';

import { useSetAtom } from 'jotai';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ClipPageOpenAtom } from '@/atoms';
import { useClipQuery } from '@/hooks';
import { ICategoryRequest, ICreateClip, VisibilityType } from '@/types';
import { createClipValidator } from '@/utils';

export const useNewClipForm = () => {
  const setIsClipPageOpen = useSetAtom(ClipPageOpenAtom);
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
  const onSubmit: SubmitHandler<ICreateClip> = (data): void => {
    console.log('클립 생성 : ', data);
    const result = validator.validateForm(data);
    if (!result) return;
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
