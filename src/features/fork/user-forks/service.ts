import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse, IFork } from '@/shared/data/types';

export const forkService = {
  getForks: async () => {
    const res = await apiClient.get<APIResponse<IFork[]>>('/forks/');
    return res.data.body;
  },
};
