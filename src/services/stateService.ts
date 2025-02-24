import { api } from '@/libs';
import { APIResponse, ITotalCountState } from '@/types';

export const getTotalCounts = async () => {
  const response = await api.get<APIResponse<ITotalCountState>>('/state/total-count');
  return response.data.body;
};
