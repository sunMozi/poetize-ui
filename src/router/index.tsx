import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import PostDetailPage from '../pages/PostDetailPage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import ThemeTest from '../pages/ThemeTest';
import HomePage from '../pages/HomePage';

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="post/:id" element={<PostDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="test" element={<ThemeTest />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
