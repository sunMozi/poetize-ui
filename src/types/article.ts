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
export interface ArticleDetail {
  [x: string]: boolean;
  // 文章字段
  id: number;
  categoryId: number;
  authorId: number;
  title: string;
  slug?: string;
  summary?: string;
  coverImage?: string;
  content: string;
  views: number;
  likes: number;
  commentsCount: number;
  status: number;
  sortOrder: number;
  createTime: string; // ISO日期字符串
  updateTime: string;

  // 作者字段
  authorNickname: string;
  authorRealName?: string;
  authorAvatar?: string;
  authorBio?: string;
  authorEmail?: string;
  authorWebsite?: string;
  authorStatus: number;
  authorCreateTime: string;
  authorUpdateTime: string;
}
