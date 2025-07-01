import React from 'react';

const NotFoundPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-100 text-base-content">
    <h1 className="mb-4 text-6xl font-extrabold text-error">404</h1>
    <p className="text-lg">页面不存在</p>
  </div>
);

export default NotFoundPage;
