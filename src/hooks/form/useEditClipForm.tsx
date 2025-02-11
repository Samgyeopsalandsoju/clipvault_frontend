'use client';

import { useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ICategoryResponse, IModifyClip, VisibilityType } from '@/types';
import { ClipPageOpenAtom } from '@/atoms';
import { useClipQuery } from '@/hooks';

export const useEditClipForm = () => {
  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IModifyClip>({
    mode: 'onChange',
  });
  const setIsClipPageOpen = useSetAtom(ClipPageOpenAtom);
  const hiddenButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const {
    clip: { modify, delete: removeClip },
  } = useClipQuery();

  //
  const initializeForm = (data: {
    title: string;
    link: string;
    id: string;
    visible: string;
    category: ICategoryResponse;
  }) => {
    setValue('title', data.title);
    setValue('link', data.link);
    setValue('id', data.id);
    setValue('category', data.category);
    setValue('visible', data.visible);
  };

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
    errors,
    handleClipClick,
    register,
    trigger,
    handleSubmit,
    handleClose,
    onSubmit,
    onDelete,
    handleVisibilitySelect,
    handleOutsideClick,
    handleCategorySelect,
    hiddenButtonRef,
    initializeForm,
  };
};
