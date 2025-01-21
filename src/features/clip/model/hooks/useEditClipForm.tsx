import { useSetAtom } from 'jotai';
import { ClipPageOpenAtom } from '../clip.atom';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Category, ClipType, VisibilityType } from '../clip.type';
import { SubmitHandler, useForm } from 'react-hook-form';

export const useEditClipForm = () => {
  const setIsOpen = useSetAtom(ClipPageOpenAtom);
  const router = useRouter();
  const hiddenButtonRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClipType>({
    mode: 'onChange',
  });

  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, [setIsOpen]);

  // 카테고리 선택
  const handleCategorySelect = (category: Category) => {
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

  const onSubmit: SubmitHandler<ClipType> = (data) => {
    console.log('전체 데이터', data);
  };

  const handleBack = () => {
    router.back();
  };

  return {
    errors,
    register,
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
