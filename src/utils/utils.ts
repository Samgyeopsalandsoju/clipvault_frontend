'use client';

import { createToastService } from '@/libs/hot-toast';
import { ICategory, ICategoryResponse, ICreateClip } from '@/types/clip';
import { css, DefaultTheme, useTheme } from 'styled-components';

// 색 생성기
export const generateSoftColor = (): string => {
  // 색상(Hue): 0-360의 모든 범위 허용
  // 빨강(0), 노랑(60), 초록(120), 청록(180), 파랑(240), 보라(300) 등 모든 색상 가능
  const hue = Math.floor(Math.random() * 360);
  // 채도(Saturation): 20-40% 범위로 제한
  const saturation = Math.floor(Math.random() * 20) + 20;
  // 밝기(Lightness): 60-80% 범위로 제한
  const lightness = Math.floor(Math.random() * 20) + 60;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const generateUniqueId = () => {
  // 타임스탬프 + 랜덤 문자열 조합
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createValidator = (theme: DefaultTheme) => {
  const toastService = createToastService(theme);
  const validateString = (field: string, message: string) => {
    if (!field || field.length === 0) {
      toastService.error(message);
      return false;
    }
    return true;
  };

  const validateCategory = (field: ICategoryResponse, message: string) => {
    if (!field || Object.keys(field).length <= 0) {
      toastService.error(message);
      return false;
    }
    return true;
  };

  return {
    validateForm: (data: ICreateClip) => {
      const isVisibilityValid = validateString(data.visible, "Please, set your clip's visibility");
      if (!isVisibilityValid) return false;

      const isCategoryValid = validateCategory(data.category, "Please set your clip's category");
      if (!isCategoryValid) return false;

      return true;
    },
  };
};
