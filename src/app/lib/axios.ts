import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const publicApiClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
});
