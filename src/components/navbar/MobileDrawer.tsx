import React, { useEffect, useState } from 'react';
import {
  FiHome,
  FiHeart,
  FiTool,
  FiMail,
  FiMessageCircle,
  FiCpu,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import http from '../../utils/http';
import { FaBook } from 'react-icons/fa';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { label: '首页', path: '/', icon: <FiHome size={20} /> },
  { label: '家', path: '/love', icon: <FiHeart size={20} /> },
  { label: '百宝箱', path: '/favorite', icon: <FiTool size={20} /> },
  { label: '留言', path: '/message', icon: <FiMail size={20} /> },
  { label: '联系我', path: '/contact', icon: <FiMessageCircle size={20} /> },
  { label: '后台', path: '/admin', icon: <FiCpu size={20} /> },
];
const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose }) => {
  const [categories, setCategories] = useState<
    { label: string; path: string }[]
  >([]);

  useEffect(() => {
    if (open) {
      http
        .get('/category/active')
        .then((data) => {
          const cats = data.map((item: any) => ({
            label: item.sortName,
            path: `/sort?sortId=${item.id}`,
          }));
          setCategories(cats);
        })
        .catch((err) => console.error('加载分类失败', err));
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-opacity-50 "
      onClick={onClose}
    >
      <nav
        className="h-full px-6 py-8 text-white shadow-xl bg-neutral w-72"
        onClick={(e) => e.stopPropagation()}
        aria-label="Mobile navigation"
      >
        <div className="mb-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-full" />
          <p className="text-xl font-bold">欢迎回来！</p>
        </div>

        <ul className="space-y-6">
          <li tabIndex={0}>
            <details className="group">
              <summary className="flex items-center gap-3 text-lg font-medium cursor-pointer group-hover:text-primary">
                <span>
                  <FaBook />
                </span>{' '}
                分类
              </summary>
              <ul className="pl-4 mt-3 space-y-3 border-l border-gray-600">
                {categories.map((cat) => (
                  <li key={cat.label}>
                    <Link
                      to={cat.path}
                      className="block text-sm text-gray-300 hover:text-primary"
                      onClick={onClose}
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>

          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="flex items-center gap-3 text-lg font-medium text-gray-300 hover:text-primary"
                onClick={onClose}
              >
                <span>{item.icon}</span> {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">更多内容即将上线，敬请期待！</p>
        </div>
      </nav>
    </div>
  );
};

export default MobileDrawer;
