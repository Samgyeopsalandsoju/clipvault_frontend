import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse } from '@/shared/data/types';
import { IClipForm } from './model/type';

export const createClip = async (data: IClipForm) => {
  const response = await apiClient.post<APIResponse<string>>('/clips/post', data);
  return response.data.body;
};
