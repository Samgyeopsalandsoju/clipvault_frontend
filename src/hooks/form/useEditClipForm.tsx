'use client';

import { useSetAtom } from 'jotai';
import { ClipPageOpenAtom, clipPopupTypeAtom } from '../../atoms/clip.atom';
import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICategoryResponse, IModifyClip, VisibilityType } from '@/types/clip';
import { useRouter } from 'next/navigation';
import { useClipQuery } from '../clip/useClipQuery';

export const useEditClipForm = () => {
  const setIsOpen = useSetAtom(ClipPageOpenAtom);
  const setClipPopupType = useSetAtom(clipPopupTypeAtom);
  const router = useRouter();
  const {
    clip: { modify, delete: removeClip },
  } = useClipQuery();
  const hiddenButtonRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IModifyClip>({
    mode: 'onChange',
  });

  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, [setIsOpen]);

  // 카테고리 선택
  const handleCategorySelect = (category: ICategoryResponse) => {
    setValue('category', category);
  };
  // 공개 범위 선택
  const handleVisibilitySelect = (visibility: VisibilityType) => {
    setValue('visible', visibility);
  };

  // 숨겨진 버튼 클릭 트리거
  const handleOutsideClick = () => {
    if (hiddenButtonRef.current) {
      hiddenButtonRef.current.click();
    }
  };

  const onSubmit: SubmitHandler<IModifyClip> = (data) => {
    modify(data);
  };

  const onDelete = (id: string) => {
    removeClip(id);
  };
  const handleClipClick = (id: string) => {
    router.push(`/clips/edit/${id}`);
  };

  const handleBack = () => {
    setClipPopupType('detail');
  };

  return {
    errors,
    handleClipClick,
    register,
    setValue,
    trigger,
    handleSubmit,
    handleBack,
    onSubmit,
    onDelete,
    handleVisibilitySelect,
    handleOutsideClick,
    handleCategorySelect,
    hiddenButtonRef,
  };
};
