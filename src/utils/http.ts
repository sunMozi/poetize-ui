import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import toast from 'react-hot-toast';

interface FailedRequest {
  config: AxiosRequestConfig;
  resolver: (value: any) => void;
  rejecter: (reason?: any) => void;
}

class RequestPool {
  private failedQueue: FailedRequest[] = [];

  add(config: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.failedQueue.push({ config, resolver: resolve, rejecter: reject });
    });
  }

  async retryAll(instance: AxiosInstance) {
    if (this.failedQueue.length === 0) return;
    const queue = [...this.failedQueue];
    this.failedQueue = [];

    for (const { config, resolver, rejecter } of queue) {
      try {
        const res = await instance(config);
        resolver(res);
      } catch (err) {
        rejecter(err);
      }
    }
  }
}

const requestPool = new RequestPool();

const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function notifyError(message: string) {
  toast.error(message, {
    position: 'top-right',
    duration: 4000,
  });
}

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

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    const res = response.data;
    if (res.code !== 200) {
      notifyError(res.message || '请求失败');
      return Promise.reject(new Error(res.message || 'Error'));
    }

    // 请求成功，尝试重试池内失败请求
    await requestPool.retryAll(instance);
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
      notifyError('请求异常');
    }

    // 将失败请求放入池中，等待后续成功请求触发重试
    return requestPool.add(error.config);
  }
);

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
