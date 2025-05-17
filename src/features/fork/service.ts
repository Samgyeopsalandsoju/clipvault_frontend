import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse, APIResult, IFork } from '@/shared/data/types';

// 포크 삭제
export const deleteFork = async ({ forkId, clipId }: { forkId: string; clipId: string }) => {
  const res = await apiClient.delete<APIResponse<string>>(`/forks/${forkId}/clip/${clipId}`);
  return res.data.body;
};
// 포크 생성
export const createFork = async (id: number) => {
  const res = await apiClient.post<APIResult<string>>('/forks/post', { clipId: id });
  return res.data;
};

// 포크 리스트 가져오기
export const getForks = async () => {
  const res = await apiClient.get<APIResponse<IFork[]>>('/forks/');
  return res.data.body;
};
