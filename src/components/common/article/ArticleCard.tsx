import React from 'react';

interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
  views: number;
  coverGradient?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  date,
  views,
  coverGradient = 'from-blue-400 to-purple-500',
}) => {
  return (
    <div className="overflow-hidden transition-all duration-300 border shadow-lg group rounded-2xl bg-base-100 border-base-300 hover:shadow-xl hover:-translate-y-1">
      <div
        className={`relative h-48 overflow-hidden bg-gradient-to-r ${coverGradient}`}
      >
        <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="mb-4 text-base-content/80 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary">{date}</span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {views}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
