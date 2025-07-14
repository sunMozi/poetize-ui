import React, { useEffect, useRef, useState } from 'react';
import type { ArticleDetailVO } from '../types/article';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MarkdownRenderer from '../components/common/article/MarkdownRenderer';
import {
  FiCalendar,
  FiUser,
  FiGlobe,
  FiBookmark,
  FiHeart,
  FiShare2,
} from 'react-icons/fi';
import TocMenu from '../components/common/article/TocMenu';
import { fetchArticleDetailWithToc } from '../api/articleApi';
import type { TocItem } from '../utils/extractToc';
import { useParams } from 'react-router-dom';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleDetailVO | null>(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<TocItem[]>([]);

  // 用来控制右侧栏是否固定到底部

  // 引用文章内容和右侧栏DOM
  const articleRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchArticleDetailWithToc(slug)
        .then(({ article, toc }) => {
          setArticle(article);
          setToc(toc);
        })
        .catch((err) => {
          // 这里可以加弹窗或错误 UI
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

  if (loading) {
    return <LoadingSpinner message="加载文章中..." />;
  }

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
      <div className="relative mb-12 overflow-hidden rounded-lg shadow-2xl card bg-base-100">
        <img
          src={article.coverImage || '/bg.jpg'}
          alt={article.title}
          className="object-cover w-full h-64 transition-transform duration-500 ease-in-out md:h-80 lg:h-96 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute text-white bottom-6 left-6 right-6">
          <h1 className="text-3xl font-extrabold md:text-4xl lg:text-5xl drop-shadow-lg">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm md:text-base">
            <div className="flex items-center gap-2 badge badge-outline badge-accent">
              <FiUser className="text-sm" />
              <span>{article.authorNickname}</span>
            </div>
            <div className="flex items-center gap-2 badge badge-outline">
              <FiCalendar className="text-sm" />
              <span>{formatDateTime(article.createTime)}</span>
            </div>
          </div>
        </div>

        {/* 文章操作按钮 */}
        <div className="absolute flex gap-2 top-4 right-4">
          {[FiBookmark, FiHeart, FiShare2].map((Icon, idx) => (
            <button
              key={idx}
              className="text-white transition btn btn-circle btn-ghost hover:bg-white/20"
              aria-label="操作按钮"
              type="button"
            >
              <Icon className="text-xl" />
            </button>
          ))}
        </div>
      </div>

      {/* 主体内容区域 */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* 文章内容区 */}
        <div
          className="lg:col-span-8"
          ref={articleRef}
          style={{
            height: 'calc(125vh)',
            overflowY: 'auto',
          }}
        >
          <div className="transition-shadow rounded-lg shadow-lg card bg-base-100 hover:shadow-xl">
            <div className="card-body">
              <MarkdownRenderer content={article.content} />
            </div>
          </div>

          {/* 文章底部信息 */}
          <div className="mt-10 rounded-lg shadow-lg card bg-base-100">
            <div className="card-body">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-12 overflow-hidden rounded-full shadow">
                      <img
                        src={article.authorAvatar || '/default-avatar.png'}
                        alt={article.authorNickname}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      {article.authorNickname}
                    </h3>
                    {article.authorBio && (
                      <p className="max-w-xs text-sm text-gray-500 line-clamp-2">
                        {article.authorBio}
                      </p>
                    )}
                  </div>
                </div>
                <button className="btn btn-outline btn-primary whitespace-nowrap">
                  关注作者
                </button>
              </div>

              <div className="my-6 divider"></div>

              <div className="flex justify-center gap-8">
                <button className="flex items-center gap-2 px-6 transition btn btn-outline btn-accent hover:bg-accent hover:text-white">
                  <FiHeart /> 点赞
                </button>
                <button className="flex items-center gap-2 px-6 transition btn btn-outline btn-secondary hover:bg-secondary hover:text-white">
                  <FiBookmark /> 收藏
                </button>
                <button className="flex items-center gap-2 px-6 transition btn btn-outline hover:bg-base-300">
                  <FiShare2 /> 分享
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧栏 */}
        <div
          ref={sidebarRef}
          className="space-y-8 transition-all duration-300 lg:col-span-4"
        >
          {/* 作者信息卡片 */}
          <div className="transition rounded-lg shadow-lg card card-compact lg:card-normal bg-base-100 hover:shadow-xl">
            <div className="card-body">
              <h2 className="flex items-center gap-2 card-title text-primary">
                <FiUser />
                作者信息
              </h2>
              <div className="flex items-center gap-4 mt-4">
                <div className="avatar">
                  <div className="w-16 overflow-hidden rounded-full shadow">
                    <img
                      src={article.authorAvatar || '/default-avatar.png'}
                      alt={article.authorNickname}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold">
                    {article.authorNickname}
                  </div>
                  {article.authorBio && (
                    <div className="max-w-xs mt-1 text-sm text-gray-500 line-clamp-2">
                      {article.authorBio}
                    </div>
                  )}
                  {article.authorWebsite && (
                    <a
                      href={article.authorWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-sm link link-primary hover:underline"
                    >
                      <FiGlobe /> 作者主页
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 目录卡片 */}
          {toc.length > 0 && (
            <div className="transition rounded-lg shadow-lg card card-compact lg:card-normal bg-base-100 hover:shadow-xl">
              <div className="card-body">
                <h2 className="flex items-center gap-2 card-title text-secondary">
                  <FiBookmark />
                  文章目录
                </h2>
                <div className="mt-3 max-h-[60vh] overflow-y-auto pr-2">
                  <TocMenu toc={toc} />
                </div>
              </div>
            </div>
          )}

          {/* 推荐文章卡片 */}
          <div className="transition rounded-lg shadow-lg card card-compact lg:card-normal bg-base-100 hover:shadow-xl">
            <div className="card-body">
              <h2 className="card-title">推荐阅读</h2>
              <div className="mt-4 space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 p-3 transition rounded-lg cursor-pointer group hover:bg-base-200"
                  >
                    <div className="avatar">
                      <div className="w-16 overflow-hidden rounded shadow">
                        <img
                          src="/placeholder.jpg"
                          alt="推荐文章"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 transition group-hover:text-primary">
                        如何构建高性能的React应用
                      </h3>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>技术文章</span>
                        <span className="mx-2">•</span>
                        <span>2023-05-12</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
