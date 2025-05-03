import { apiClient } from '@/shared/lib/axios';

export const deleteCategory = async (categoryId: string) => {
  const { data } = await apiClient.delete(`/category/delete/${categoryId}`);
  return data;
};
