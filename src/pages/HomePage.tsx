import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  { id: 1, title: '第一篇文章', summary: '这是第一篇文章的摘要。' },
  { id: 2, title: '第二篇文章', summary: '这是第二篇文章的摘要。' },
];

const HomePage: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4">首页</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Link
          to={`/post/${post.id}`}
          key={post.id}
          className="block p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600 text-7xl">{post.summary}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default HomePage;
