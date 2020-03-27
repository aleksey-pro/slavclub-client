import axios from 'axios';
import { getToken } from './token';

export const api = axios.create({
  baseURL: process.env.API_URL,
});

export const get = (url, params = {}) => api.get(url, {
  headers: {
    'x-user-token': getToken(),
  },
  params,
});
export const post = (url, params = {}) => api.post(url, params, {
  headers: {
    'x-user-token': getToken(),
  },
});
export const update = (url, params = {}) => api.put(url, params, {
  headers: {
    'x-user-token': getToken(),
  },
});
export const remove = (url, params = {}) => api.delete(url, params, {
  headers: {
    'x-user-token': getToken(),
  },
});
