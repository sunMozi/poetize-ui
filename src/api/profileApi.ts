import type { UserProfile } from '../types/user';
import http from '../utils/http';

export async function fetchUserProfile(): Promise<UserProfile> {
  const data = await http.get<UserProfile>('/webInfo/profile');
  return {
    ...data,
    articlesCount: data.articlesCount ?? 0,
    categoriesCount: data.categoriesCount ?? 0,
    views: data.views ?? 0,
  };
}
