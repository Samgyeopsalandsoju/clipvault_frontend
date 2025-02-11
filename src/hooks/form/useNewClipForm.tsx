'use client';

import { useSetAtom } from 'jotai';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ClipPageOpenAtom } from '@/atoms';
import { useClipQuery } from '@/hooks';
import { ICategoryResponse, ICreateClip, VisibilityType } from '@/types';
import { createClipValidator, generateUniqueId } from '@/utils';

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

  // 새 카테고리 생성
  const handleCreateCreate = (category: ICategoryResponse): void => {
    const categoryWithId = {
      ...category,
      id: generateUniqueId(),
    };
    setValue('category', categoryWithId);
  };

  // 카테고리 선택
  const handleCategorySelect = (category: ICategoryResponse): void => {
    setValue('category', category);
  };

  // 공개 범위 선택
  const handleVisibilitySelect = (visibility: VisibilityType): void => {
    setValue('visible', visibility);
  };

  // 링크 생성
  const onSubmit: SubmitHandler<ICreateClip> = (data): void => {
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
    handleCreateCreate,
    onSubmit,
    errors,
  };
};
