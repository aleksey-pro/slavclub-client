import axios from 'axios';
import { getToken } from './token';

const API_URL = {
  production: 'http://www.xn--80aaf8admgsd3i.xn--p1acf/api/v1',
  development: 'http://localhost:3055/api/v1',
  staging: 'http://www.xn--80aaf8admgsd3i.xn--p1acf/api/v1',
};

const TARGET = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

export const api = axios.create({
  baseURL: API_URL[TARGET],
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
