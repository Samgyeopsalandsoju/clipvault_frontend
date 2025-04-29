import { apiClient } from '@/app/lib';
import { APIResponse } from '@/shared/types';
import { IPersonalClip } from '@/shared/types/clip';

export const getUserClips = async () => {
  const res = await apiClient<APIResponse<IPersonalClip[]>>('/api/personal-link');
  return res.data.body;
};
