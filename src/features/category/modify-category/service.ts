import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse, ICategory } from '@/shared/data/types';

export const modifyCategory = async (data: ICategory) => {
  const res = await apiClient.patch<APIResponse<string>>(`/category/modify`, data);
  return res.data.body;
};

export const deleteCategory = async (id: string) => {
  const res = await apiClient.delete<APIResponse<string>>(`/category/delete/${id}`);
  return res.data.body;
};
