import { useSetAtom } from 'jotai';
import { ClipPageOpenAtom } from '../clip.atom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Category, ClipType, VisibilityType } from '../clip.type';
import { useEffect } from 'react';

const useNewClipForm = () => {
  const setIsOpen = useSetAtom(ClipPageOpenAtom);
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

  const onSubmit: SubmitHandler<ClipType> = (data) => {
    console.log('전체 데이터', data);
  };

  return {
    register,
    trigger,
    handleSubmit,
    handleCategorySelect,
    handleVisibilitySelect,
    onSubmit,
    errors,
  };
};

export default useNewClipForm;
