import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../../../types/article';

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const key = article.articleId ?? article.slug;
        const formattedDate = article.createTime
          ? article.createTime.slice(0, 10)
          : '未知日期';

        return (
          <div
            key={key}
            className="overflow-hidden transition-all duration-300 border shadow-lg cursor-pointer group rounded-2xl bg-base-100 border-base-300 hover:shadow-xl hover:-translate-y-1"
            onClick={() => navigate(`/post/${article.slug}`)}
          >
            <div className="relative h-48 overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500">
              {article.coverImage ? (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full" />
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
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary">{formattedDate}</span>
                <span className="flex items-center">👁 {article.views}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleGrid;
