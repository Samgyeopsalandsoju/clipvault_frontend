import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse, ICategory } from '@/shared/data/types';
import { ICategoryForm } from './model/types';

// 카테고리 생성
export const postCategory = async (category: ICategoryForm) => {
  const res = await apiClient.post<APIResponse<string>>('/categories/post', category);
  return res.data.body;
};

// 카테고리 수정
export const modifyCategory = async (data: ICategory) => {
  const res = await apiClient.patch<APIResponse<string>>(`/categories/modify`, data);
  return res.data.body;
};

// 카테고리 삭제
export const deleteCategory = async (id: string) => {
  const res = await apiClient.delete<APIResponse<string>>(`/categories/${id}`);
  return res.data.body;
};

// 카테고리 목록 조회
export const getCategories = async () => {
  const res = await apiClient.get<APIResponse<ICategory[]>>('/categories');
  return res.data.body;
};
