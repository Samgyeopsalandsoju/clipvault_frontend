import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse } from '@/shared/data/types';
import { ICategoryResponse } from '@/shared/data/types/category';

// 카테고리 목록 조회
export const getCategories = async () => {
  const res = await apiClient.get<APIResponse<ICategoryResponse[]>>('/category/list');
  return res.data.body;
};
