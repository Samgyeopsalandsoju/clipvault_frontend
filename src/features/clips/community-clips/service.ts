import { apiClient } from '@/shared/lib/axios';
import { APIResponse } from '@/shared/types';
import { IHomeClip } from '@/shared/types/clip';

// 홈 클립 리스트 서비스 레이어
export const getCommunityClips = async () => {
  const res = await apiClient.get<APIResponse<IHomeClip[]>>('/clip/public-get');
  return res.data.body;
};
