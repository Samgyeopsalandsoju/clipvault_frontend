import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse } from '@/shared/data/types';
import { IShareLink } from './model/type';

export const shareService = {
  getShareLinks: async () => {
    const res = await apiClient.get<APIResponse<IShareLink[]>>('/shares');
    return res.data.body;
  },

  deleteShareLink: async (id: string) => {
    const response = await apiClient.delete<APIResponse<string>>(`/shares/${id}`);
    return response;
  },
};
