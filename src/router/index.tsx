import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import NotFoundPage from '../pages/NotFoundPage';
import GlobalLoader from '../components/common/GlobalLoader';

// 懒加载页面组件
const HomePage = lazy(() => import('../pages/HomePage'));
const PostDetailPage = lazy(() => import('../pages/PostDetailPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));

const AppRouter: React.FC = () => (
  <Router>
    <Suspense
      fallback={
        <div className="p-4 text-center">
          <GlobalLoader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="post/:slug" element={<PostDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        {/* 捕获顶层非法路径，例如 /abcde */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRouter;
