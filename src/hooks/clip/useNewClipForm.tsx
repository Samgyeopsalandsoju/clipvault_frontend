'use client';

import { useSetAtom } from 'jotai';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ClipPageOpenAtom } from '@/atoms/clip.atom';
import { VisibilityType, ICreateClip, ICategoryResponse, ICategory } from '@/types/clip';
import { useClip } from './clip/useClip';
import { generateUniqueId } from '@/utils/utils';

export const useNewClipForm = () => {
  const setIsOpen = useSetAtom(ClipPageOpenAtom);
  const {
    clip: { create },
  } = useClip();
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
    console.log('new category register');
    const categoryWithId = {
      ...category,
      id: generateUniqueId(),
    };
    setValue('category', categoryWithId);
  };

  // 카테고리 선택
  const handleCategorySelect = (category: ICategoryResponse) => {
    console.log('prev category select');
    setValue('category', category);
  };

  // 공개 범위 선택
  const handleVisibilitySelect = (visibility: VisibilityType) => {
    setValue('visible', visibility);
  };

  // 링크 생성
  const onSubmit: SubmitHandler<ICreateClip> = (data) => {
    console.log('저장할 데이터 : ', data);
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
