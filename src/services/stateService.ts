import { api } from '@/libs/api';
import { APIResponse } from '@/types';

export const fetchTotalClipsCount = async () => {
  const response = await api.get<APIResponse<string>>('/state/total-clips');
  return response.data.body;
};
export const fetchTotalShareCount = async () => {
  const response = await api.get<APIResponse<string>>('/state/total-share');
  return response.data.body;
};
