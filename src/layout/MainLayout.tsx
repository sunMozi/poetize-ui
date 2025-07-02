import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const MainLayout: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar show={showNavbar} />
      <main className="flex-grow w-full min-h-0">
        <Outlet />
      </main>
      <footer className="p-4 footer footer-center bg-base-200 text-base-content">
        <div>© 2025 My Blog</div>
      </footer>
    </div>
  );
};

export default MainLayout;
