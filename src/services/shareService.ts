import { api } from '@/libs/api';
import { APIResponse, IShareLinkRequest, IShareLinkResponse } from '@/types';
import axios, { AxiosError } from 'axios';

export const fetchShareFileData = async ({ url }: { url: string }) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const uploadShareLink = async (data: IShareLinkRequest) => {
  const response = await api.post('/share-link/post', data);
  return response.data.body;
};

export const fetchSharedLinkList = async () => {
  const response = await api.get<APIResponse<IShareLinkResponse[]>>('/share-link/list');
  return response.data.body;
};

export const deleteShareLink = async (id: string) => {
  const response = await api.delete<APIResponse<string>>(`/share-link/delete/${id}`);
  return response;
};
