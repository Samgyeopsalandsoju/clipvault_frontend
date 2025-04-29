import { apiClient } from '@/app/lib';
import { APIResponse } from '@/shared/types';
import { IHomeClip } from '@/shared/types/clip';

export const getCommunityClips = async () => {
  const res = await apiClient.get<APIResponse<IHomeClip[]>>('/clip/public-get');
  return res.data.body;
};
