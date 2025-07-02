import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeSwitcher from '../common/ThemeSwitcher';
import CategoryMenu from './CategoryMenu';
import {
  FiHome,
  FiHeart,
  FiTool,
  FiMail,
  FiMessageCircle,
  FiCpu,
} from 'react-icons/fi';

const navItems = [
  { label: '首页', path: '/', icon: <FiHome size={20} /> },
  { label: '家', path: '/love', icon: <FiHeart size={20} /> },
  { label: '百宝箱', path: '/favorite', icon: <FiTool size={20} /> },
  { label: '留言', path: '/message', icon: <FiMail size={20} /> },
  { label: '联系我', path: '/contact', icon: <FiMessageCircle size={20} /> },
  { label: '后台', path: '/admin', icon: <FiCpu size={20} /> },
];

const DesktopNav: React.FC<{ onDrawerToggle: () => void }> = ({
  onDrawerToggle,
}) => {
  const location = useLocation();

  return (
    <>
      <div className="flex-1 px-4">
        <Link to="/" className="text-xl normal-case btn btn-ghost">
          My Blog
        </Link>
      </div>

      <div className="flex-none lg:hidden">
        <button
          className="btn btn-square btn-ghost"
          onClick={onDrawerToggle}
          aria-label="Toggle Menu"
        >
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="hidden lg:flex lg:items-center lg:space-x-6">
        <CategoryMenu />
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.label}
            className={`btn btn-ghost normal-case ${
              location.pathname === item.path ? 'font-bold' : ''
            }`}
          >
            <span className="mr-1">{item.icon}</span> {item.label}
          </Link>
        ))}
        <ThemeSwitcher />
      </div>
    </>
  );
};

export default DesktopNav;
