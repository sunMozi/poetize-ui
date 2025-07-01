import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { label: '首页', path: '/', icon: '🏡' },
  {
    label: '记录',
    subItems: [
      { label: '分类1', path: '/sort?sortId=1' },
      { label: '分类2', path: '/sort?sortId=2' },
    ],
    icon: '📒',
  },
  { label: '家', path: '/love', icon: '❤️‍🔥' },
  { label: '百宝箱', path: '/favorite', icon: '🧰' },
  { label: '留言', path: '/message', icon: '📪' },
  { label: '联系我', path: '/contact', icon: '💬' },
  { label: '后台', path: '/admin', icon: '💻️' },
];

const MainLayout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > 50 && currentY > lastScrollY.current) {
        // 向下滚动且超过 100px，隐藏 Navbar
        setShowNavbar(false);
      } else if (currentY < lastScrollY.current) {
        // 向上滚动，显示 Navbar
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
      {/* Navbar */}
      <div
        className={`sticky top-0 z-50 shadow-md navbar bg-base-200 transform transition-transform duration-300 ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex-1 px-4">
          <Link to="/" className="text-xl normal-case btn btn-ghost">
            My Blog
          </Link>
        </div>

        <div className="flex-none lg:hidden">
          {/* Mobile hamburger */}
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setDrawerOpen(!drawerOpen)}
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
          {navItems.map((item) =>
            item.subItems ? (
              <div className="dropdown dropdown-hover" key={item.label}>
                <label tabIndex={0} className="gap-1 normal-case btn btn-ghost">
                  <span>{item.icon}</span> {item.label}
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
                  aria-label={`${item.label} submenu`}
                >
                  {item.subItems.map((sub) => (
                    <li key={sub.label}>
                      <Link to={sub.path}>{sub.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                to={item.path!}
                key={item.label}
                className={`btn btn-ghost normal-case ${
                  location.pathname === item.path ? 'font-bold' : ''
                }`}
              >
                <span className="mr-1">{item.icon}</span> {item.label}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-opacity-50 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <nav
            className="h-full px-6 py-8 text-white shadow-xl bg-neutral w-72"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            {/* Additional content at the top of the drawer */}
            <div className="mb-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-full">
                {/* Placeholder for user avatar */}
              </div>
              <p className="text-xl font-bold">欢迎回来！</p>
            </div>

            <ul className="space-y-6">
              {navItems.map((item) =>
                item.subItems ? (
                  <li key={item.label} tabIndex={0}>
                    <details className="group">
                      <summary className="flex items-center gap-3 text-lg font-medium cursor-pointer group-hover:text-primary">
                        <span>{item.icon}</span> {item.label}
                      </summary>
                      <ul className="pl-4 mt-3 space-y-3 border-l border-gray-600">
                        {item.subItems.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              to={sub.path}
                              className="block text-sm text-gray-300 hover:text-primary"
                              onClick={() => setDrawerOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      to={item.path!}
                      className="flex items-center gap-3 text-lg font-medium text-gray-300 hover:text-primary"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <span>{item.icon}</span> {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* Additional content below the menu */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                更多内容即将上线，敬请期待！
              </p>
            </div>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow w-full min-h-0">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="p-4 footer footer-center bg-base-200 text-base-content">
        <div>© 2025 My Blog</div>
      </footer>
    </div>
  );
};

export default MainLayout;
