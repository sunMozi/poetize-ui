import React from 'react';

interface NotFoundPageProps {
  /**
   * 可选：主标题，例如 404
   */
  title?: string;
  /**
   * 可选：副标题或提示语
   */
  message?: string;
  /**
   * 可选：额外内容（例如返回首页按钮）
   */
  children?: React.ReactNode;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  title = '404',
  message = '正在开发中，敬请期待',
  children,
}) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-100 text-base-content">
    <h1 className="mb-4 text-6xl font-extrabold text-error">{title}</h1>
    <p className="text-lg">{message}</p>
    {children && <div className="mt-6">{children}</div>}
  </div>
);

export default NotFoundPage;
