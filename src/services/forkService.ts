import { api } from '@/libs/api';
import { APIResponse, APIResult, IDoForkRequest, IForkedClipResponse } from '@/types';

export const postFork = async (data: IDoForkRequest) => {
  const response = await api.post<APIResult<string>>('/fork/post', data);
  return response.data;
};

export const getForkedList = async () => {
  const response = await api.get<APIResponse<IForkedClipResponse[]>>('/fork/list');
  return response.data.body;
};

export const deleteForkedClip = async (data: IDoForkRequest) => {
  const response = await api.delete('/fork/delete', { data });
  return response.data.body;
};
