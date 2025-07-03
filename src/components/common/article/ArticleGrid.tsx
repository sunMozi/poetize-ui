import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiCalendar } from 'react-icons/fi';
import type { Article } from '../../../types/article';

interface ArticleGridProps {
  articles: Article[];
}

// 时间格式化工具函数
const formatDateTime = (dateStr?: string): string => {
  if (!dateStr) return '未知日期';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '无效日期';
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
};

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const key = article.articleId ?? article.slug;
        const formattedDate = formatDateTime(article.createTime ?? undefined);

        return (
          <div
            key={key}
            className="overflow-hidden transition-all duration-300 border shadow-lg cursor-pointer group rounded-2xl bg-base-100 border-base-300 hover:shadow-xl hover:-translate-y-1"
            onClick={() => navigate(`/post/${article.slug}`)}
            aria-label={`阅读文章: ${article.title}`}
          >
            <div className="relative h-48 overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500">
              {article.coverImage && article.coverImage !== 'error' ? (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <img
                  src="/bg.jpg"
                  alt="默认封面"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-xl font-bold text-white line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </div>
            <div className="p-5">
              <p className="mb-4 text-base-content/80 line-clamp-2">
                {article.summary}
              </p>
              <div className="flex items-center justify-between text-sm text-base-content/70">
                <span className="flex items-center gap-1">
                  <FiCalendar className="inline-block" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <FiEye className="inline-block" />
                  {article.views}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleGrid;
