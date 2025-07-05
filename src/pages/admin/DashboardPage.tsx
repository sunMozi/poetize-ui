import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">仪表盘</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* 示例统计卡片 */}
        <div className="p-6 shadow-md card bg-base-100">
          <h2 className="text-lg font-medium">用户数</h2>
          <p className="mt-2 text-3xl font-bold">1,234</p>
        </div>

        <div className="p-6 shadow-md card bg-base-100">
          <h2 className="text-lg font-medium">文章总数</h2>
          <p className="mt-2 text-3xl font-bold">567</p>
        </div>

        <div className="p-6 shadow-md card bg-base-100">
          <h2 className="text-lg font-medium">系统运行时间</h2>
          <p className="mt-2 text-3xl font-bold">99.9%</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
