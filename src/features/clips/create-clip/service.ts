import { apiClient } from '@/shared/lib/axios';
import { ICreateForm } from './model/type';
import { APIResponse } from '@/shared/types';

export const createClip = async (data: ICreateForm) => {
  const response = await apiClient.post<APIResponse<string>>('/clip/clip-post', data);
  return response.data.body;
};
