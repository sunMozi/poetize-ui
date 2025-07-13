import type { ArticleDetailVO, ArticleListVO } from '../types/article';
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
