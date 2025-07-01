import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

// 创建实例
const instance: AxiosInstance = axios.create({
  baseURL: '/api', // 可按需修改
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json',
  },
});

function notifyError(message: string) {
  alert(message);
}

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器，提取 data.data 并统一错误处理
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // 统一判断业务 code
    if (res.code !== 200) {
      // 业务错误，提示并拒绝 Promise
      notifyError(res.message || '请求失败');
      return Promise.reject(new Error(res.message || 'Error'));
    }
    // 返回真正业务数据
    return res.data;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          notifyError('未授权，请重新登录');
          break;
        case 403:
          notifyError('无权限访问');
          break;
        case 500:
          notifyError('服务器异常');
          break;
        default:
          notifyError(error.response.data?.message || '请求错误');
      }
    } else if (error.request) {
      notifyError('网络连接失败');
    } else {
      console.error(`请求异常: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// 导出通用方法
const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config);
  },
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return instance.post(url, data, config);
  },
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return instance.put(url, data, config);
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, config);
  },
};

export default http;
