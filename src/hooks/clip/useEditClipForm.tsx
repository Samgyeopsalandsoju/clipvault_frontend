'use client';

import { useSetAtom } from 'jotai';
import { ClipPageOpenAtom, clipPopupTypeAtom } from '../../atoms/clip.atom';
import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICategoryResponse, ICreateClip, VisibilityType } from '@/types/clip';

export const useEditClipForm = () => {
  const setIsOpen = useSetAtom(ClipPageOpenAtom);
  const setClipPopupType = useSetAtom(clipPopupTypeAtom);
  const hiddenButtonRef = useRef<HTMLButtonElement>(null);
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

  // 카테고리 선택
  const handleCategorySelect = (category: ICategoryResponse) => {
    console.log('Selected category:', category);
    setValue('category', category);
  };
  // 공개 범위 선택
  const handleVisibilitySelect = (visibility: VisibilityType) => {
    console.log('Selected Visibility:', visibility);
    setValue('visible', visibility);
  };

  // 숨겨진 버튼 클릭 트리거
  const handleOutsideClick = () => {
    if (hiddenButtonRef.current) {
      hiddenButtonRef.current.click();
    }
  };

  const onSubmit: SubmitHandler<ICreateClip> = (data) => {
    console.log('전체 데이터', data);
  };

  const handleBack = () => {
    setClipPopupType('detail');
  };

  return {
    errors,
    register,
    setValue,
    trigger,
    handleSubmit,
    handleBack,
    onSubmit,
    handleVisibilitySelect,
    handleOutsideClick,
    handleCategorySelect,
    hiddenButtonRef,
  };
};
