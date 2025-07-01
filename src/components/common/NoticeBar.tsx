import React from 'react';

interface NoticeBarProps {
  notices: string[];
}

const NoticeBar: React.FC<NoticeBarProps> = ({ notices }) => {
  return (
    <section className="p-5 mb-8 border shadow rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <div className="flex items-start">
        <div className="mt-1 mr-3 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <div className="text-base-content">
          <h3 className="mb-1 text-lg font-bold">网站公告</h3>
          <ul className="space-y-2 text-sm">
            {notices.map((notice, idx) => (
              <li key={idx} className="flex items-start">
                <span className="inline-block w-2 h-2 mt-2 mr-2 rounded-full bg-primary"></span>
                <span>{notice}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NoticeBar;
