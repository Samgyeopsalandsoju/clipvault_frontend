import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse, APIResult, IFork } from '@/shared/data/types';

export const deleteFork = async ({ forkId, clipId }: { forkId: string; clipId: string }) => {
  const res = await apiClient.delete<APIResponse<string>>(`/forks/${forkId}/clip/${clipId}`);
  return res.data.body;
};

export const createFork = async (id: number) => {
  const res = await apiClient.post<APIResult<string>>('/forks/post', { clipId: id });
  return res.data;
};
