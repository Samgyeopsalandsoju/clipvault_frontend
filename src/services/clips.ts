import { IClipResponse, ICreateClip } from '@/types/clip';
import axios from 'axios';

export const getClips = async () => {
  const response = await axios.get<IClipResponse[]>('http://localhost:3001/clips');
  return response.data;
};

export const postClip = async (data: ICreateClip) => {
  const response = await axios.post<ICreateClip>('http://localhost:3001/clips', {
    title: data.title,
    category: data.category,
    link: data.link,
    visible: data.visible,
    createdBy: new Date() + '',
  });
  return response.data;
};

export const getClip = async (id: string) => {
  const response = await axios.get<ICreateClip>(`http://localhost:3001/clips/${id}`);
  return response.data;
};
