import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse } from '@/shared/data/types';
import { IClip } from '@/shared/data/types/clip';

// 홈 클립 리스트 서비스 레이어
export const getCommunityClips = async () => {
  const res = await apiClient.get<APIResponse<IClip[]>>('/clips/public');
  return res.data.body;
};
