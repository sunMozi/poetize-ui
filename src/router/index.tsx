import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // 引入 Toaster 组件

import MainLayout from '../layout/MainLayout';
import NotFoundPage from '../pages/NotFoundPage';
import GlobalLoader from '../components/common/GlobalLoader';
import AdminLayout from '../layout/AdminLayout';
import DashboardPage from '../pages/admin/DashboardPage';
import SettingsPage from '../pages/admin/SettingsPage';
import UserListPage from '../pages/admin/UserListPage';
import RequireAuth from '../components/admin/RequireAuth';
import AuthPage from '../pages/AuthPage';
import ArticleList from '../pages/admin/ArticleList';
import ArticleCreatePage from '../pages/admin/article/ArticleCreatePage';
import ArticleEditPage from '../pages/admin/article/ArticleEditPage';

// 懒加载页面组件
const HomePage = lazy(() => import('../pages/HomePage'));
const PostDetailPage = lazy(() => import('../pages/PostDetailPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));

const AppRouter: React.FC = () => (
  <Router>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          fontSize: '14px',
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
        success: {
          duration: 3000,
          icon: '✅',
        },
        error: {
          duration: 5000,
          icon: '❌',
        },
      }}
    />

    <Suspense
      fallback={
        <div className="p-4 text-center">
          <GlobalLoader />
        </div>
      }
    >
      <Routes>
        {/* 前台路由 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="post/:slug" element={<PostDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* 后台管理路由 */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UserListPage />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/create" element={<ArticleCreatePage />} />
          <Route path="articles/:slug/edit" element={<ArticleEditPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* 登录页面 */}
        <Route path="/login" element={<AuthPage />} />

        {/* 捕获顶层非法路径 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRouter;
