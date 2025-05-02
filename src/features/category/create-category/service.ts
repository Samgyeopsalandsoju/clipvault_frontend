import { apiClient } from '@/shared/lib/axios';
import { APIResponse } from '@/shared/types';
import { ICategoryForm } from './model/type';

// 카테고리 생성
export const postCategory = async (category: ICategoryForm) => {
  const jsonData = { ...category, id: '' };
  const res = await apiClient.post<APIResponse<string>>('/category/create', jsonData);
  return res.data.body;
};
