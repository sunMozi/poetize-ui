import type { ArticleDetail } from '../types/article';
import { type TocItem, extractToc } from '../utils/extractToc';
import { get } from '../utils/http';

export async function fetchArticleDetailWithToc(slug: string): Promise<{
  article: ArticleDetail;
  toc: TocItem[];
}> {
  const article = await get<ArticleDetail>(`/article/detail/${slug}`);
  const toc = extractToc(article.content);
  return { article, toc };
}
