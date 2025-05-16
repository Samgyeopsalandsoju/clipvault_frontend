import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse, ICategory } from '@/shared/data/types';

// 카테고리 목록 조회
export const getCategories = async () => {
  const res = await apiClient.get<APIResponse<ICategory[]>>('/categories');
  return res.data.body;
};
