import { api } from '@/libs';
import { APIResponse, IShareLinkRequest, IShareLinkResponse } from '@/types';
import axios from 'axios';

export const uploadFile = async ({
  id,
  url,
  file,
  fileType,
}: {
  id: string;
  url: string;
  fileType: string;
  file: Blob;
}) => {
  await axios.put(url, file, { headers: { 'Content-Type': fileType } });
  return `localhost:3000/share/${id}`;
};

export const fetchShareFileData = async ({ url }: { url: string }) => {
  const response = await axios.get(url);
  return response.data;
};

export const uploadShareLink = async (data: IShareLinkRequest) => {
  const response = await api.post('/share-link/post', data);
  return response.data.body;
};

export const fetchSharedLinkList = async () => {
  console.log('getSharedList called....');
  const response = await api.get<APIResponse<IShareLinkResponse[]>>('/share-link/list');
  return response.data.body;
};
