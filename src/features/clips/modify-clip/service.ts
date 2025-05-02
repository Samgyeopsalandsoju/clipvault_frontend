import { apiClient } from '@/shared/lib/axios';
import { APIResponse, IUserClip } from '@/shared/types';
import { ModifyFormProps } from './model/type';

export const modifyClip = async (data: ModifyFormProps) => {
  const response = await apiClient.patch<APIResponse<string>>(`/clip/clip-modify`, data);
  return response.data.body;
};

export const getClip = async (id: string) => {
  const response = await apiClient.get<APIResponse<IUserClip>>(`/clip/${id}`, {
    params: { id },
  });
  return response.data.body;
};
