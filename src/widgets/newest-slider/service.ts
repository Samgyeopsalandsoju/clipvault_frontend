import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse } from '@/shared/data/types/api';
import { IClip } from '@/shared/data/types/clip';

export const getNewestList = async () => {
  const response = await apiClient<APIResponse<IClip[]>>('/clip/public-get');
  return response.data.body;
};
