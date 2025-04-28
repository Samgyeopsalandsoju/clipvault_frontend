import { apiClient } from '@/app/lib';
import { APIResponse } from '@/shared/types/api';
import { IHomeClip } from '@/shared/types/clip';

export const getNewestList = async () => {
  const response = await apiClient.get<APIResponse<IHomeClip[]>>('/clip/public-get');
  return response.data.body;
};
