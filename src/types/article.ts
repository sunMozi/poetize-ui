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
