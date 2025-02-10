import axios from 'axios';

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
