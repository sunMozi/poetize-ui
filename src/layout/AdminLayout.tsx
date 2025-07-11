import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  LayoutDashboard,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  {
    to: '/admin',
    label: '仪表盘',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    to: '/admin/users',
    label: '用户管理',
    icon: <Users className="w-5 h-5" />,
  },
  {
    to: '/admin/settings',
    label: '系统设置',
    icon: <Settings className="w-5 h-5" />,
  },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧菜单栏 */}
      <aside
        className={`flex flex-col bg-white border-r border-gray-200 shadow-lg
          transition-width duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-64'}`}
      >
        {/* Logo 和 折叠按钮 */}
        <div
          className={`flex items-center justify-between px-4 h-16 border-b border-gray-100
            ${collapsed ? 'justify-center' : ''}`}
        >
          {!collapsed && (
            <h1 className="text-lg font-extrabold text-indigo-600 select-none">
              后台管理
            </h1>
          )}
          <button
            aria-label={collapsed ? '展开菜单' : '折叠菜单'}
            className="p-0 text-gray-600 btn btn-ghost btn-square hover:text-indigo-600"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="w-6 h-6" />
            ) : (
              <ChevronLeft className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* 菜单项 */}
        <nav className="flex-1 mt-4 overflow-y-auto">
          <ul className="flex flex-col space-y-1">
            {menuItems.map(({ to, label, icon }) => {
              const active = isActive(to);
              return (
                <li key={to} className="relative">
                  <Link
                    to={to}
                    className={`group flex items-center gap-3 py-2 px-4 mx-2 rounded-md
                      transition-colors duration-200
                      ${
                        active
                          ? 'bg-indigo-100 text-indigo-700 font-semibold'
                          : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                      }`}
                  >
                    <span className="text-gray-400 group-hover:text-indigo-600">
                      {icon}
                    </span>
                    {!collapsed && <span>{label}</span>}
                  </Link>
                  {/* 左侧激活指示条 */}
                  {active && (
                    <span
                      className="absolute top-0 bottom-0 left-0 w-1 bg-indigo-600 rounded-tr-md rounded-br-md"
                      aria-hidden="true"
                    ></span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 底部操作区 */}
        {!collapsed && (
          <div className="px-4 py-4 border-t border-gray-100">
            <button
              className="w-full text-gray-600 btn btn-outline btn-sm hover:text-red-600"
              onClick={() => alert('登出功能待实现')}
            >
              退出登录
            </button>
          </div>
        )}
      </aside>

      {/* 主内容区 */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* 顶栏 */}
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 bg-white shadow-md">
          <button
            className="lg:hidden btn btn-ghost btn-circle"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <h2 className="text-xl font-semibold text-gray-800 select-none">
            {menuItems.find(({ to }) => isActive(to))?.label || '后台管理'}
          </h2>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="搜索..."
              className="hidden w-48 rounded-md sm:block input input-bordered input-sm"
            />
            <div className="transition bg-gray-300 rounded-full cursor-pointer w-9 h-9 hover:ring-2 hover:ring-indigo-500" />
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* 移动端抽屉 */}
      <input
        type="checkbox"
        id="mobile-drawer"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={() => setDrawerOpen(!drawerOpen)}
      />
      <label
        htmlFor="mobile-drawer"
        className={`fixed inset-0 bg-black bg-opacity-40 z-10 transition-opacity lg:hidden ${
          drawerOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      ></label>
      <div
        className={`fixed top-0 left-0 bottom-0 bg-white w-64 shadow-lg z-20 transform transition-transform lg:hidden
        ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <h1 className="text-lg font-extrabold text-indigo-600 select-none">
            后台管理
          </h1>
          <button
            className="p-0 text-gray-600 btn btn-ghost btn-square hover:text-indigo-600"
            onClick={() => setDrawerOpen(false)}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 mt-4 overflow-y-auto">
          <ul className="flex flex-col px-2 space-y-1">
            {menuItems.map(({ to, label, icon }) => {
              const active = isActive(to);
              return (
                <li key={to} className="relative">
                  <Link
                    to={to}
                    className={`group flex items-center gap-3 py-2 px-4 rounded-md
                      transition-colors duration-200
                      ${
                        active
                          ? 'bg-indigo-100 text-indigo-700 font-semibold'
                          : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                      }`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span className="text-gray-400 group-hover:text-indigo-600">
                      {icon}
                    </span>
                    <span>{label}</span>
                  </Link>
                  {active && (
                    <span className="absolute top-0 bottom-0 left-0 w-1 bg-indigo-600 rounded-tr-md rounded-br-md" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminLayout;
