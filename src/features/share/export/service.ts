import { apiClient } from '@/shared/core/lib/axios';
import { APIResult } from '@/shared/data/types';
import { IShareLinkBase } from '@/shared/data/types/share';

export const uploadShareLink = async (data: IShareLinkBase) => {
  const res = await apiClient.post<APIResult<string>>('/shares/post', data);
  return res.data;
};
