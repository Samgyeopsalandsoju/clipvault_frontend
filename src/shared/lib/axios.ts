import { getSessionToken } from '@/shared/utils/session';
import axios, { InternalAxiosRequestConfig } from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const publicApiClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
});

export const privateApiClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
});

privateApiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    const token = await getSessionToken();
    try {
      // if no token
      if (!token) {
        throw new Error('No token found');
      }
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    // any other error
    console.error('[PRIVATE_REQUEST_ERROR]', error);
    return Promise.reject(error);
  }
);
