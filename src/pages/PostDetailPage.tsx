import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../utils/http';
import type { ArticleDetail } from '../types/article';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MarkdownRenderer from '../components/common/MarkdownRenderer';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      http
        .get<ArticleDetail>(`/article/detail/${slug}`)
        .then(setArticle)
        .catch((err) => console.error('加载文章失败', err))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return <LoadingSpinner message="加载文章中..." />;
  }

  if (!article) {
    return (
      <div className="mt-12 text-center text-neutral-content">
        文章不存在或已被删除
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto lg:px-8">
      {/* 顶部封面图 + 浮动信息 */}
      <div className="relative mb-12">
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="object-cover w-full rounded-lg shadow-lg h-72"
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-6 rounded-lg bg-gradient-to-t from-black/70 via-black/40 to-transparent">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            {article.title}
          </h1>
          <div className="mt-2 text-sm text-gray-300">
            {article.authorNickname} ·{' '}
            {new Date(article.createTime).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* 主体布局 */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* 主内容 */}
        <div className="lg:col-span-8">
          <div className="shadow card bg-base-100">
            <div className="card-body">
              <MarkdownRenderer content={article.content} />
            </div>
          </div>
        </div>

        {/* 右侧栏 */}
        <div className="space-y-6 lg:col-span-4">
          {/* 作者信息 */}
          <div className="shadow-md card bg-base-200">
            <div className="card-body">
              <h2 className="card-title">作者信息</h2>
              <div className="flex items-center mt-3 space-x-4">
                <img
                  src={article.authorAvatar || '/default-avatar.png'}
                  alt={article.authorNickname}
                  className="rounded-full shadow w-14 h-14"
                />
                <div>
                  <div className="font-semibold">{article.authorNickname}</div>
                  {article.authorBio && (
                    <div className="mt-1 text-sm text-base-content/70">
                      {article.authorBio}
                    </div>
                  )}
                  {article.authorWebsite && (
                    <a
                      href={article.authorWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm link link-primary"
                    >
                      作者主页
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 目录 */}
          <div className="shadow-md card bg-base-200">
            <div className="card-body">
              <h2 className="card-title">文章目录</h2>
              <div className="mt-2 text-sm text-base-content/70">
                <p>（目录生成功能可后续集成或从服务端获取）</p>
              </div>
            </div>
          </div>

          {/* 推荐文章 */}
          <div className="shadow-md card bg-base-200">
            <div className="card-body">
              <h2 className="card-title">推荐阅读</h2>
              <div className="mt-2 text-sm text-base-content/70">
                <p>（推荐文章功能可后续接接口或由推荐算法生成）</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
