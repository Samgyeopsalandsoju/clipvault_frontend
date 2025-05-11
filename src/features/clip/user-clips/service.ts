import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse } from '@/shared/data/types';
import { IClip } from '@/shared/data/types/clip';

// 유저 클립 리스트 서비스 레이어
export const getUserClips = async () => {
  const res = await apiClient<APIResponse<IClip[]>>('/clips');
  return res.data.body;
};
