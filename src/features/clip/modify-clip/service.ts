import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse, IClip } from '@/shared/data/types';
import { ModifyFormProps } from './model/type';

export const modifyClip = async (data: ModifyFormProps) => {
  const response = await apiClient.patch<APIResponse<string>>(`/clips/modify`, data);
  return response.data.body;
};

export const getClip = async (id: string) => {
  const response = await apiClient.get<APIResponse<IClip>>(`/clips/${id}`);
  return response.data.body;
};

export const deleteClip = async (id: string) => {
  const response = await apiClient.delete<APIResponse<string>>(`/clips/${id}`);
  return response.data.body;
};
