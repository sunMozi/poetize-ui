import type { UserProfile } from '../types/user';
import http from '../utils/http';

export async function fetchUserProfile(): Promise<any> {
  return await http.get<UserProfile>('/webInfo/profile');
}
