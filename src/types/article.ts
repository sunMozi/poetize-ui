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

export interface ArticleListVO {
  articleId: number; // 文章ID
  title: string; // 文章标题
  slug?: string; // URL 别名（可选）
  summary?: string; // 文章摘要（可选）
  coverImage?: string; // 封面图 URL（可选）
  views: number; // 浏览次数
  likes?: number; // 点赞数（可选）
  commentsCount?: number; // 评论数（可选）
  createTime: string; // 创建时间，ISO 格式字符串
  authorId?: number; // 作者ID（可选）
  authorName?: string; // 作者名称（可选）
  authorAvatar?: string; // 作者头像 URL（可选）
  authorSourceType?: number; // 作者来源类型：0=内部，1=外部，2=采集（可选）
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
