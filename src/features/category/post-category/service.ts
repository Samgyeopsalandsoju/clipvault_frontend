import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse } from '@/shared/data/types';
import { ICategoryForm } from './model/type';

// 카테고리 생성
export const postCategory = async (category: ICategoryForm) => {
  const res = await apiClient.post<APIResponse<string>>('/categories/post', category);
  return res.data.body;
};
