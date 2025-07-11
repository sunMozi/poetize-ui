import type { ArticleDetail } from '../types/article';
import { type TocItem, extractToc } from '../utils/extractToc';
import { get } from '../utils/http';

/**
 * 获取文章详情并生成目录
 */
export async function fetchArticleDetailWithToc(slug: string): Promise<{
  article: ArticleDetail;
  toc: TocItem[];
}> {
  try {
    const article = await get<ArticleDetail>(`/article/detail/${slug}`);
    const toc = extractToc(article.content);
    return { article, toc };
  } catch (err) {
    console.error('加载文章失败', err);
    throw err;
  }
}
