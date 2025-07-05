import type { Notice } from '../types/notice';
import http from '../utils/http';

export async function fetchValidNotices(): Promise<Notice[]> {
  const notices = await http.get<Notice[]>('/siteNotice/latest');
  const now = new Date();
  return notices.filter(
    (notice) =>
      notice.isActive &&
      new Date(notice.startTime) <= now &&
      (!notice.endTime || new Date(notice.endTime) >= now)
  );
}
