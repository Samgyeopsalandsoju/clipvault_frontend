import { api } from '@/libs/api';
import { APIResponse, IClipResponse } from '@/types';

export const getHomeClips = async () => {
  const response = await api.get<APIResponse<IClipResponse[]>>(`/clip/public-get`);
  return response.data.body;
};
