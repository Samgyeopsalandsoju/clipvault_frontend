import { api } from '@/libs';

export const getCategories = async () => {
  console.log('getCategories called ');
  const response = await api.get('/category/list');
  return response.data.body;
};
