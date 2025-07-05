import type { Article } from '../types/article';
import type { Category } from '../types/category';
import http from '../utils/http';

export async function fetchPopularCategories(): Promise<Category[]> {
  return await http.get<Category[]>('/category/popular');
}

export async function fetchArticlesByCategory(
  categoryId: number
): Promise<Article[]> {
  const res = await http.get<{ rows: Article[] }>('/article/list', {
    params: { categoryId, pageNum: 1, pageSize: 3 },
  });
  return res.rows ?? [];
}
