import { api } from '@/libs';
import { APIResponse, IClipResponse, ICreateClip, IModifyClip } from '@/types';
import axios from 'axios';

export const getClips = async () => {
  const response = await axios.get<IClipResponse[]>('http://localhost:3001/clips');
  return response.data;
};

export const postClip = async (data: ICreateClip) => {
  const response = await api.post<APIResponse<string>>('/clip/post', data);
  console.log('postClip method return check : ', response.data);
  return response.data;
};

export const getClip = async (id: string) => {
  const response = await axios.get<IModifyClip>(`http://localhost:3001/clips/${id}`);
  return response.data;
};

export const modifyClip = async (data: IModifyClip) => {
  const response = await axios.put<IModifyClip>(`http://localhost:3001/clips/${data.id}`, data);
  return response.data;
};

export const deleteClip = async (id: string) => {
  const response = await axios.delete(`http://localhost:3001/clips/${id}`);
  return response.data;
};
