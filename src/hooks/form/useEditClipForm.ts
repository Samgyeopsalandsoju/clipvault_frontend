'use client';

import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ICategoryResponse, IModifyClip, VisibilityType } from '@/types';
import { useClipQuery } from '@/hooks';
import { useClipPageStore } from '@/stores';

export const useEditClipForm = () => {
  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IModifyClip>({
    mode: 'onChange',
  });
  const { setIsOpen: setIsClipPageOpen } = useClipPageStore();
  const hiddenButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const {
    clip: { modify, delete: removeClip },
  } = useClipQuery();

  useEffect(() => {
    setIsClipPageOpen(true);
    return () => setIsClipPageOpen(false);
  }, [setIsClipPageOpen]);

  // 카테고리 선택
  const handleCategorySelect = (category: ICategoryResponse): void => {
    setValue('category', category);
  };
  // 공개 범위 선택
  const handleVisibilitySelect = (visibility: VisibilityType): void => {
    setValue('visible', visibility);
  };

  // 숨겨진 버튼 클릭 트리거
  const handleOutsideClick = (): void => {
    if (hiddenButtonRef.current) {
      hiddenButtonRef.current.click();
    }
  };

  // 클립 삭제
  const onDelete = (id: string): void => {
    removeClip(id);
  };
  // 클립 edit 오픈
  const handleClipClick = (id: string): void => {
    router.push(`/clips/edit/${id}`);
  };

  // edit 페이지 닫기
  const handleClose = (): void => {
    setIsClipPageOpen(false);
  };

  // 서밋
  const onSubmit: SubmitHandler<IModifyClip> = (data): void => {
    modify(data);
  };

  return {
    handleClipClick,
    register,
    trigger,
    handleSubmit,
    reset,
    handleClose,
    onSubmit,
    onDelete,
    handleVisibilitySelect,
    handleOutsideClick,
    handleCategorySelect,
    hiddenButtonRef,
  };
};
