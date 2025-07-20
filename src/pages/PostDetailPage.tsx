import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FiCalendar,
  FiUser,
  FiBookmark,
  FiHeart,
  FiShare2,
} from 'react-icons/fi';
import type { ArticleDetailVO } from '../types/article';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MarkdownRenderer from '../components/common/article/MarkdownRenderer';
import { fetchArticleDetailWithToc } from '../api/articleApi';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleDetailVO | null>(null);
  const [loading, setLoading] = useState(true);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchArticleDetailWithToc(slug)
        .then(({ article }) => setArticle(article))
        .catch((err) => {
          console.error('加载文章失败', err);
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const formatDateTime = (dateStr?: string): string => {
    if (!dateStr) return '未知时间';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '无效时间';
    return date
      .toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(/\//g, '-');
  };

  if (loading) return <LoadingSpinner message="加载文章中..." />;
  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="mb-4 text-5xl">📄</div>
          <h2 className="text-xl font-bold text-neutral">
            文章不存在或已被删除
          </h2>
          <button
            className="mt-4 btn btn-primary"
            onClick={() => window.history.back()}
          >
            返回上一页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto lg:px-8">
      {/* 顶部封面图 */}
      <div className="relative mb-12 overflow-hidden shadow-xl rounded-xl">
        <img
          src={article.coverImage || '/bg.jpg'}
          alt={article.title}
          className="object-cover w-full h-64 transition-transform duration-500 ease-in-out md:h-80 lg:h-96 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute text-white bottom-6 left-6 right-6">
          <h1 className="text-3xl font-extrabold md:text-4xl lg:text-5xl drop-shadow-md">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm md:text-base">
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/10">
              <FiUser className="text-sm" />
              <span>{article.authorNickname}</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/10">
              <FiCalendar className="text-sm" />
              <span>{formatDateTime(article.createTime)}</span>
            </div>
          </div>
        </div>
        {/* 顶部操作按钮 */}
        <div className="absolute flex gap-2 top-4 right-4">
          {[FiBookmark, FiHeart, FiShare2].map((Icon, idx) => (
            <button
              key={idx}
              className="text-white transition hover:bg-white/20 btn btn-circle btn-ghost"
              aria-label="操作按钮"
              type="button"
            >
              <Icon className="text-xl" />
            </button>
          ))}
        </div>
      </div>

      {/* 主体内容区域 */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="lg:col-span-8" ref={articleRef}>
          <div className="transition-shadow rounded-lg shadow-md card bg-base-100 hover:shadow-xl">
            <div className="card-body">
              <MarkdownRenderer content={article.content} />
            </div>
          </div>

          {/* 作者信息卡片 */}
          <div className="mt-10 shadow-md rounded-xl card bg-base-100">
            <div className="card-body">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="rounded-full shadow w-14 ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={article.authorAvatar || '/default-avatar.png'}
                        alt={article.authorNickname}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {article.authorNickname}
                    </h3>
                    {article.authorBio && (
                      <p className="max-w-xs text-sm text-gray-500 line-clamp-2">
                        {article.authorBio}
                      </p>
                    )}
                  </div>
                </div>
                <button className="btn btn-outline btn-primary">
                  关注作者
                </button>
              </div>

              <div className="my-6 divider" />

              {/* 操作按钮 */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                <button
                  className="flex items-center gap-2 btn btn-outline btn-accent hover:bg-accent hover:text-white"
                  aria-label="点赞"
                >
                  <FiHeart /> 点赞
                </button>
                <button
                  className="flex items-center gap-2 btn btn-outline btn-secondary hover:bg-secondary hover:text-white"
                  aria-label="收藏"
                >
                  <FiBookmark /> 收藏
                </button>
                <button
                  className="flex items-center gap-2 btn btn-outline hover:bg-base-300"
                  aria-label="分享"
                >
                  <FiShare2 /> 分享
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧预留扩展区，比如 TOC 或推荐文章等 */}
        <div className="hidden lg:block lg:col-span-4">
          {/* 未来可以放 TOC、相关推荐、标签等 */}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
