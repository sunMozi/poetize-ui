import React from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const mockUsers: User[] = [
  {
    id: 1,
    username: 'zhangsan',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: 'active',
  },
  {
    id: 2,
    username: 'lisi',
    email: 'lisi@example.com',
    role: '编辑',
    status: 'inactive',
  },
  {
    id: 3,
    username: 'wangwu',
    email: 'wangwu@example.com',
    role: '访客',
    status: 'active',
  },
];

const UserListPage: React.FC = () => {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">用户管理</h1>

      <table className="table w-full border border-collapse border-gray-200">
        <thead>
          <tr className="bg-base-300">
            <th className="px-4 py-2 border border-gray-300">ID</th>
            <th className="px-4 py-2 border border-gray-300">用户名</th>
            <th className="px-4 py-2 border border-gray-300">邮箱</th>
            <th className="px-4 py-2 border border-gray-300">角色</th>
            <th className="px-4 py-2 border border-gray-300">状态</th>
            <th className="px-4 py-2 border border-gray-300">操作</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id} className="hover:bg-base-200">
              <td className="px-4 py-2 border border-gray-300">{user.id}</td>
              <td className="px-4 py-2 border border-gray-300">
                {user.username}
              </td>
              <td className="px-4 py-2 border border-gray-300">{user.email}</td>
              <td className="px-4 py-2 border border-gray-300">{user.role}</td>
              <td className="px-4 py-2 border border-gray-300">
                <span
                  className={`badge ${
                    user.status === 'active' ? 'badge-success' : 'badge-warning'
                  }`}
                >
                  {user.status === 'active' ? '激活' : '未激活'}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2 border border-gray-300">
                <button className="btn btn-xs btn-primary">编辑</button>
                <button className="btn btn-xs btn-error">删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
