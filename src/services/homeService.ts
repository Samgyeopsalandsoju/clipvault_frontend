import { api } from '@/libs/api';
import { APIResponse, IClipResponse, IForkedClipResponse } from '@/types';

export const getHomeClips = async () => {
  const response = await api.get<APIResponse<IClipResponse[]>>(`/clip/public-get`);
  return response.data.body.map((clip) => ({ ...clip, isForked: false }));
};

export const getForkedClips = async () => {
  const response = await api.get<APIResponse<number[]>>('/fork/home-forked-list');
  return response.data.body;
};
