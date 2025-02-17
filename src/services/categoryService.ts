import { api } from '@/libs';

export const getCategories = async () => {
  const response = await api.get('/category/list');
  return response.data.body;
};
