import type { User, UserLoginRequest } from '../types/user';
import { get, post } from '../utils/http';
export async function login(loginForm: UserLoginRequest): Promise<User> {
  const params = {
    account: 'admin',
    password: 'admin',
    idamdin: true,
  };
  return await post<User>('/user/login', params);
}
