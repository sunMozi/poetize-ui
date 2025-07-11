import React, { useEffect, useState } from 'react';
import { FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fetchActiveCategories } from '../../api/categoryApi';
import { navItems } from './navItems';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface CategoryMenuItem {
  label: string;
  path: string;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose }) => {
  const [categories, setCategories] = useState<CategoryMenuItem[]>([]);

  useEffect(() => {
    if (!open) return;

    fetchActiveCategories()
      .then((data) => {
        const cats = data.map((item) => ({
          label: item.sortName,
          path: `/sort?sortId=${item.id}`,
        }));
        setCategories(cats);
      })
      .catch((err) => console.error('加载分类失败', err));
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-opacity-40" onClick={onClose}>
      <div
        className="h-full shadow-xl w-72 bg-base-200 text-base-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center py-6">
            <div className="w-20 h-20 mb-2 rounded-full bg-neutral-focus" />
            <p className="text-lg font-bold">欢迎回来！</p>
          </div>

          <ul className="p-2 menu">
            <li>
              <details open className="group">
                <summary className="flex items-center gap-2">
                  <FaBook className="w-5 h-5" /> 分类
                </summary>
                <ul>
                  {categories.map((cat) => (
                    <li key={cat.label}>
                      <Link to={cat.path} onClick={onClose} className="text-sm">
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
                  onClick={onClose}
                  className="flex items-center gap-2"
                >
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="p-4 mt-auto text-xs text-center text-base-content opacity-60">
            更多内容即将上线，敬请期待！
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
