import { api } from '@/libs/api';
import { APIResponse, ICategoryResponse } from '@/types';

export const getCategories = async () => {
  const response = await api.get<APIResponse<ICategoryResponse[]>>('/category/list');
  return response.data.body;
};
