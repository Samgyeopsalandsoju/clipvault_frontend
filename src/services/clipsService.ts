import { api } from '@/libs/api';
import { APIResponse, IClipResponse, ICreateClip, IModifyClip } from '@/types';

export const getClips = async () => {
  const response = await api.get<APIResponse<IClipResponse[]>>('/clip/list');
  return response.data.body;
};

export const postClip = async (data: ICreateClip) => {
  const response = await api.post<APIResponse<{ code: string }>>('/clip/post', data);
  return response.data;
};

export const getClip = async (id: string) => {
  const response = await api.get<APIResponse<IClipResponse>>(`/clip/${id}`);
  return response.data.body;
};

export const modifyClip = async (data: IModifyClip) => {
  const response = await api.patch<APIResponse<string>>(`/clip/modify`, data);
  return response.data.body;
};

export const deleteClip = async (id: string) => {
  const response = await api.delete(`/clip/delete/${id}`);
  return response.data;
};
