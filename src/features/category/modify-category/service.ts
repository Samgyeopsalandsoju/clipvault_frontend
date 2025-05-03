import { apiClient } from '@/shared/lib/axios';
import { APIResponse, ICategory } from '@/shared/types';

export const modifyCategory = async (data: ICategory) => {
  const res = await apiClient.patch<APIResponse<string>>(`/category/modify`, data);
  return res.data.body;
};
