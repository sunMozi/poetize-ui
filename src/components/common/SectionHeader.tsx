import React from 'react';

interface SectionHeaderProps {
  icon: string;
  title: string;
  onMoreClick?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  onMoreClick,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3 text-xl font-bold">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-2xl">{title}</h2>
      </div>
      <button
        onClick={onMoreClick}
        className="flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-full bg-base-200 hover:bg-primary hover:text-white group"
      >
        查看更多
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default SectionHeader;
