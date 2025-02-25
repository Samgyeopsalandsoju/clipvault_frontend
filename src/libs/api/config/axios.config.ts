import axios, { InternalAxiosRequestConfig } from 'axios';
import { getSessionToken } from '../auth/getSessionToken';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const privateAPI = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
});

export const publicAPI = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
});

privateAPI.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    const token = await getSessionToken(authOptions);
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
