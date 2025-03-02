import { api } from '@/libs/api';
import { APIResponse, ICategoryRequest, ICategoryResponse } from '@/types';

export const getCategories = async () => {
  console.log('getCategories....called');
  const response = await api.get<APIResponse<ICategoryResponse[]>>('/category/list');
  console.log('response.data.body', response.data.body);
  return response.data.body;
};

export const postCategories = async (data: ICategoryRequest[]) => {
  const response = await api.post<APIResponse<string>>('/category/post', data);
  return response.data.status;
};

export const deleteCategory = async (data: { categoryId: string }) => {
  const response = await api.delete<APIResponse<string>>(`/category/delete/${data.categoryId}`);
  return response.data.body;
};
