export interface Notice {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isActive: boolean;
  startTime: string;
  endTime: string | null;
}
