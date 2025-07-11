import type { User, UserLoginRequest } from '../types/user';
import http from '../utils/http';
export async function login(loginForm: UserLoginRequest): Promise<User> {
  const params = {
    account: 'admin',
    password: 'admin',
    idamdin: true,
  };
  return await http.post<User>('/user/login', params);
}
