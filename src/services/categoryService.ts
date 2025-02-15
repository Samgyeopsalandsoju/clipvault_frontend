import { api } from '@/libs';

export const getCategories = async () => {
  console.log('getCategories method called');
  const response = await api.get('/category/list');
  console.log('getCategories result data : ', response.data);
  return response.data.body;
};
