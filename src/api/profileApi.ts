import type { UserProfile } from '../types/user';
import { get } from '../utils/http';

export async function fetchUserProfile(): Promise<any> {
  return await get<UserProfile>('/webInfo/profile');
}
