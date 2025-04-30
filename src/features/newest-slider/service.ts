import { apiClient } from '@/shared/lib/axios';
import { APIResponse } from '@/shared/types/api';
import { IHomeClip } from '@/shared/types/clip';

export const getNewestList = async () => {
  const response = await apiClient<APIResponse<IHomeClip[]>>('/clip/public-get');
  return response.data.body;
};
