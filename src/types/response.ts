export interface Response<T> {
  code: number;
  message: string;
  data: T;
  currentTimeMillis: number;
}

export interface PageResult<T> {
  totalRows: number;
  totalPages: number;
  pageNum: number;
  pageSize: number;
  size: number;
  rows: T[];
}
