import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CategoryMenu from './CategoryMenu';
import { navItems } from './navItems';
import { Sidebar } from '../common/Sidebar';
import { GiBookshelf } from 'react-icons/gi';
import ThemeSwitcher from '../common/ThemeSwitcher';

const DesktopNav: React.FC<{ onDrawerToggle: () => void }> = ({
  onDrawerToggle,
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

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
        <div>
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="切换主题"
          >
            <GiBookshelf />
          </button>
          <Sidebar
            position="right"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            width={340}
          >
            <ThemeSwitcher />
          </Sidebar>
        </div>
      </div>
    </>
  );
};

export default DesktopNav;
