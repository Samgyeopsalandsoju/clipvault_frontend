import { apiClient } from '@/app/lib';
import { APIResponse } from '@/shared/types';
import { IPersonalClip } from '@/shared/types/clip';

// 유저 클립 리스트 서비스 레이어
export const getUserClips = async () => {
  const res = await apiClient<APIResponse<IPersonalClip[]>>('/api/personal-link');
  return res.data.body;
};
