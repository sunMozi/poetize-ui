import toast from 'react-hot-toast';
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8081/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

/**
 * 全局错误通知
 */
function notifyError(message: string) {
  toast.error(message, {
    position: 'top-right',
    duration: 4000,
  });
}

export default http;
