import axios from 'axios';
import { endpoints } from './endpoints';

export const httpClient = axios.create({
  baseURL: endpoints.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token-demo');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
