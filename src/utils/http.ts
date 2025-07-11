import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

export interface Response<T> {
  code: number;
  message: string;
  data: T;
  currentTimeMillis: number;
}

const http = axios.create({
  baseURL: '/api/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});

function notifyError(msg: string) {
  toast.error(msg, { position: 'top-right', duration: 4000 });
}

http.interceptors.response.use(
  <T>(response: AxiosResponse<Response<T>>): T => {
    const res = response.data;
    if (res.code !== 200) {
      notifyError(res.message || '接口异常');
      throw new Error(res.message || '接口异常');
    }
    return res.data;
  },
  (error) => {
    notifyError(error.message || '网络请求失败');
    return Promise.reject(error);
  }
);

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  return http.request<any, T>(config);
}

export function get<T>(
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({ ...config, url, method: 'GET', params });
}

export function post<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({ ...config, url, method: 'POST', data });
}
