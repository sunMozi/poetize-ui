import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../utils/http';
import { FaBook } from 'react-icons/fa';

interface Category {
  label: string;
  path: string;
  icon: string;
}

const CategoryMenu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    http
      .get('/category/active')
      .then((data) => {
        setCategories(
          data.map((item: any) => ({
            label: item.sortName,
            path: `/sort?sortId=${item.id}`,
            icon: item.icon,
          }))
        );
      })
      .catch((err) => console.error('加载分类失败', err));
  }, []);

  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="gap-1 normal-case btn btn-ghost">
        <FaBook />
        分类
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
        aria-label="分类菜单"
      >
        {categories.map((cat) => (
          <li key={cat.label}>
            <Link to={cat.path} className="flex items-center gap-2">
              {cat.icon ? (
                cat.icon.startsWith('http') ? (
                  <img
                    src={cat.icon}
                    alt={cat.label}
                    className="w-4 h-4"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-lg leading-none">{cat.icon}</span>
                )
              ) : null}
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
