import { apiClient } from '@/app/lib';
import { APIResponse } from '@/shared/types';
import { IHomeClip } from '@/shared/types/clip';

export const getPublicLinkList = async () => {
  const response = await apiClient.get<APIResponse<IHomeClip[]>>('/clip/public-get');
  return response.data.body;
};
