import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, LayoutDashboard, Users, Settings } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="drawer lg:drawer-open">
      {/* 侧边栏 */}
      <input
        id="admin-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={() => setDrawerOpen(!drawerOpen)}
      />
      <div className="flex flex-col drawer-content">
        {/* 顶栏 */}
        <div className="w-full border-b shadow-sm navbar bg-base-100">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="admin-drawer"
              className="btn btn-square btn-ghost"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <Menu className="w-5 h-5" />
            </label>
          </div>
          <div className="flex-1 px-2 text-xl font-bold">后台管理</div>
          {/* 顶栏扩展：可放置搜索框、主题切换、用户头像等 */}
        </div>

        {/* 页面内容 */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <aside className="w-64 bg-base-200 text-base-content">
          <div className="p-4 text-xl font-bold">管理菜单</div>
          <ul className="menu">
            <li>
              <Link to="/admin" className={isActive('/admin') ? 'active' : ''}>
                <LayoutDashboard className="w-4 h-4" /> 仪表盘
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={isActive('/admin/users') ? 'active' : ''}
              >
                <Users className="w-4 h-4" /> 用户管理
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className={isActive('/admin/settings') ? 'active' : ''}
              >
                <Settings className="w-4 h-4" /> 系统设置
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default AdminLayout;
