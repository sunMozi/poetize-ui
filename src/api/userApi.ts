import type { User, UserLoginRequest } from '../types/user';
import { post } from '../utils/http';
export async function login(loginForm: UserLoginRequest): Promise<User> {
  return await post<User>('/user/login', loginForm);
}
