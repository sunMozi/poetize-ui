export interface Article {
  articleId: number | null; // 后端可能返回 null，前端需容错
  title: string;
  slug: string; // 添加 slug 属性
  summary: string;
  coverImage?: string | null;
  views: number;
  likes: number;
  commentsCount: number;
  createTime?: string | null;
  authorId: number;
  authorName: string;
  authorAvatar?: string | null;
  authorSourceType: number;
}

// types/article.ts
export interface ArticleListVO {
  articleId: number;
  title: string;
  slug: string;
  summary: string;
  coverImage?: string;
  views: number;
  likes: number;
  commentsCount: number;
  createTime: string; // ISO 时间字符串
  updateTime?: string;
  categoryName?: string;
  tagNames?: string[];
  status: number; // 1=发布，0=草稿，-1=删除
  authorId?: number;
  authorName?: string;
  authorAvatar?: string;
}

export interface ArticleDetailVO {
  id: number;
  categoryId: number;
  authorId: number;
  title: string;
  slug?: string;
  summary?: string;
  coverImage?: string;
  content: string;
  views: number;
  likes?: number;
  commentsCount?: number;
  status?: number;
  sortOrder?: number;
  createTime: string; // ISO 时间字符串
  updateTime: string; // ISO 时间字符串

  authorNickname?: string;
  authorRealName?: string;
  authorAvatar?: string;
  authorBio?: string;
  authorEmail?: string;
  authorWebsite?: string;
  authorStatus?: number;
  authorCreateTime?: string; // ISO 时间字符串
  authorUpdateTime?: string; // ISO 时间字符串
}

export interface CreateArticleParams {
  title: string;
  slug?: string;
  summary?: string;
  coverImage?: string;
  categoryId: number;
  content: string;
  status: number;
  sortOrder?: number;
  authorId: number;
}
