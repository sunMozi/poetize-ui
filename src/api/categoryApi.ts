import type { Article } from '../types/article';
import type { Category } from '../types/category';
import { get } from '../utils/http';

export async function fetchPopularCategories(): Promise<Category[]> {
  return await get<Category[]>('/category/popular');
}

interface ArticleListData {
  rows: Article[];
  total: number;
  pageNum: number;
  pageSize: number;
}

// 加载分类文章
export async function fetchArticlesByCategory(
  categoryId: number,
  pageNum = 1,
  pageSize = 3
): Promise<ArticleListData> {
  return get<ArticleListData>('/article/list', {
    categoryId,
    pageNum,
    pageSize,
  });
}

export async function fetchActiveCategories(): Promise<Category[]> {
  return get<Category[]>('/category/active');
}
