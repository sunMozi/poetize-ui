import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold">
          My Blog
        </Link>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </header>

    <main className="flex-1 container mx-auto p-4">
      <Outlet />
    </main>

    <footer className="bg-gray-100 text-center py-4 text-sm">© 2025 My Blog</footer>
  </div>
);

export default MainLayout;
