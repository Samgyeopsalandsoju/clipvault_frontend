import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { getServerSession } from 'next-auth';

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
    const session = await getServerSession(authOptions);
    try {
      // if no token
      if (!session?.accessToken) {
        throw new Error('No token found');
      }

      const token = session.accessToken;

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
