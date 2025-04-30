import { apiClient } from '@/shared/lib/axios';
import { APIResponse } from '@/shared/types';
import { ICategoryResponse } from '@/shared/types/category';

// 카테고리 목록 조회
export const getCategory = async () => {
  const res = await apiClient.get<APIResponse<ICategoryResponse[]>>('/category/list');
  return res.data.body;
};

// 카테고리 생성
export const postCategory = async (categoryName: string) => {
  const res = await apiClient.post<APIResponse<ICategoryResponse>>('/category/create', {
    categoryName,
  });
  return res.data.body;
};
