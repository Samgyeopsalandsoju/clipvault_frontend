import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse } from '@/shared/data/types';

export const deleteFork = async ({ forkId, clipId }: { forkId: string; clipId: string }) => {
  const res = await apiClient.delete<APIResponse<string>>(`/forks/${forkId}/clip/${clipId}`);
  return res.data.body;
};
