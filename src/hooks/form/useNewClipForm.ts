'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useClipQuery, useSafeBrowsingApiQuery } from '@/hooks';
import { ICategoryRequest, ICreateClip, VisibilityType } from '@/types';
import { useClipPageStore } from '@/stores';
import { checkProtocol, filterXSSInUrl, isValidURLFormat, normalizeUrl } from '@/utils/link';
import { createToast } from '@/libs/toast';

export const useNewClipForm = () => {
  const { setIsOpen: setIsClipPageOpen } = useClipPageStore();
  const {
    clip: { create },
  } = useClipQuery();

  const { validate } = useSafeBrowsingApiQuery();
  const {
    register,
    trigger,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ICreateClip>({
    mode: 'onChange',
  });
  const category = watch('category.name');
  const visible = watch('visible');
  const toast = createToast();

  useEffect(() => {
    setIsClipPageOpen(true);
    return () => setIsClipPageOpen(false);
  }, [setIsClipPageOpen]);

  //  새카테고리
  const handleCreateCategory = (category: ICategoryRequest): void => {
    clearErrors(['category']);
    setValue('category', category);
  };

  // 카테고리 선택
  const handleCategorySelect = (category: ICategoryRequest): void => {
    clearErrors(['category']);
    setValue('category', category);
  };

  // 공개 범위 선택
  const handleVisibilitySelect = (visibility: VisibilityType): void => {
    clearErrors(['visible']);
    setValue('visible', visibility);
  };

  const validateLink = (link: string) => {
    const isValidUrl = isValidURLFormat(link);
    const isValidXSS = filterXSSInUrl(link);
    const isValidProtocol = checkProtocol(link);
    if (!isValidUrl.isValid) {
      return isValidUrl;
    }
    if (!isValidXSS.isValid) {
      return isValidXSS;
    }

    if (!isValidProtocol.isValid) {
      return isValidProtocol;
    }

    return {
      isValid: true,
      message: 'Valid and safe URL',
    };
  };

  // 링크 생성
  const onSubmit = async (data: ICreateClip) => {
    if (!visible) {
      setError('visible', { type: 'manual', message: 'Visibility is required.' });
      return;
    }
    if (!category) {
      setError('category', { type: 'manual', message: 'Category is required.' });
      return;
    }
    const normalizedUrl = normalizeUrl(data.link);
    const { isValid, message } = validateLink(normalizedUrl);

    if (!isValid) {
      toast.error(message);
      return;
    }

    const { matches } = await validate({ url: normalizedUrl });
    if (matches && matches.length > 0) {
      toast.error('Warning: This URL may be harmful');
    } else {
      await create(data);
    }
  };

  return {
    register,
    trigger,
    handleSubmit,
    handleCategorySelect,
    handleVisibilitySelect,
    handleCreateCategory,
    onSubmit,
    watch,
    errors,
  };
};
