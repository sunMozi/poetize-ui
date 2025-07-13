import type {
  ArticleDetailVO,
  ArticleListVO,
  CreateArticleParams,
} from '../types/article';
import type { PageResult } from '../types/response';
import { type TocItem, extractToc } from '../utils/extractToc';
import { get } from '../utils/http';

export async function fetchArticleDetailWithToc(slug: string): Promise<{
  article: ArticleDetailVO;
  toc: TocItem[];
}> {
  const article = await get<ArticleDetailVO>(`/article/detail/${slug}`);
  const toc = extractToc(article.content);
  return { article, toc };
}

interface ArticleQueryParams {
  pageNum?: number;
  pageSize?: number;
  categoryId?: number;
  authorId?: number;
  keyword?: string;
  sort?: string;
  order?: string;
}

export async function fetchArticleList(
  params: ArticleQueryParams
): Promise<PageResult<ArticleListVO>> {
  return get<PageResult<ArticleListVO>>(`/article/list`, params);
}

export async function createArticle(data: CreateArticleParams): Promise<void> {
  console.log('📦 模拟提交文章:', data);
  return new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟延迟
}
