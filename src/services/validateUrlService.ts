import { api } from '@/libs';

export const checkSafeBrowsing = async (data: { url: string }) => {
  const response = await api.post('/validate/safe-browsing-api', { url: data.url });
  return response.data.body;
};
