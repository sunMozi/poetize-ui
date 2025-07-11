import type { Notice } from '../types/notice';
import { get } from '../utils/http';

export async function fetchValidNotices(): Promise<Notice[]> {
  return get<Notice[]>('/siteNotice/latest');
}
