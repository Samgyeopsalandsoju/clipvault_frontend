import { api } from '@/libs';
import { IDoForkRequest } from '@/types';

export const postFork = async (data: IDoForkRequest) => {
  console.log('postFork data : ', data);
  const response = await api.post('/fork/post', data);
  return response.data.body;
};

export const getForkedList = async () => {
  console.log('getForkedList called');
  const response = await api.get('/fork/list');
  return response.data.body;
};

export const deleteForkedClip = async (data: IDoForkRequest) => {
  console.log(data);
  const response = await api.delete('/fork/delete', { data });
  return response.data.body;
};
