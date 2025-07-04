import React from 'react';
import { Loader2 } from 'lucide-react'; // 使用 lucide-react 的图标库，你也可以换成自己的 svg

const GlobalLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-base-100 text-base-content">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="w-12 h-12 animate-spin text-primary" />
      <p className="text-lg">页面加载中...</p>
    </div>
  </div>
);

export default GlobalLoader;
