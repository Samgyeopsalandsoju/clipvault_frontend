'use client';

import { useSetAtom } from 'jotai';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ClipPageOpenAtom } from '@/atoms/clip.atom';
import { VisibilityType, ICreateClip, ICategoryResponse } from '@/types/clip';
import { generateUniqueId, createValidator } from '@/utils/utils';
import { useClipQuery } from '../clip/useClipQuery';

export const useNewClipForm = () => {
  const setIsOpen = useSetAtom(ClipPageOpenAtom);
  const validator = createValidator();
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
    setIsOpen(true);
    return () => setIsOpen(false);
  }, [setIsOpen]);

  // 새 카테고리 생성
  const handleCreateCreate = (category: ICategoryResponse) => {
    const categoryWithId = {
      ...category,
      id: generateUniqueId(),
    };
    setValue('category', categoryWithId);
  };

  // 카테고리 선택
  const handleCategorySelect = (category: ICategoryResponse) => {
    setValue('category', category);
  };

  // 공개 범위 선택
  const handleVisibilitySelect = (visibility: VisibilityType) => {
    setValue('visible', visibility);
  };

  // 링크 생성
  const onSubmit: SubmitHandler<ICreateClip> = (data) => {
    const result = validator.validateForm(data);
    if (!result) return false;
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
