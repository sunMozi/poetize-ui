import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const MainLayout: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);

  // 控制 Navbar 显示隐藏
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 50 && currentY > lastScrollY.current) {
        setShowNavbar(false);
      } else if (currentY < lastScrollY.current) {
        setShowNavbar(true);
      }
      lastScrollY.current = currentY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setShowNavbar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 监听路由变化，控制加载动画显示时长
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar
        show={showNavbar}
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      />

      {/* 全局加载动画遮罩 */}
      {loading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-base-100/80 backdrop-blur-sm">
          <span className="loading loading-ring loading-xl text-primary"></span>
        </div>
      )}

      <main
        className={`flex-grow w-full min-h-0 pt-16 ${
          loading ? 'pointer-events-none select-none' : ''
        }`}
      >
        <Outlet />
      </main>

      <footer className="p-4 footer footer-center bg-base-200 text-base-content">
        <div>© 2025 My Blog</div>
      </footer>
    </div>
  );
};

export default MainLayout;
