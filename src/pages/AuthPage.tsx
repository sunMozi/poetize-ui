import React, { useState } from 'react';
import type { UserLoginRequest } from '../types/user';
import { login } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import toast from 'react-hot-toast';

const AuthPage: React.FC = () => {
  const [form, setForm] = useState<UserLoginRequest>({
    account: '',
    password: '',
  });
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.account || !form.password) {
      toast.error('请输入完整的邮箱和密码');
      return;
    }

    try {
      const user = await login(form);
      setUser(user); // 存入全局状态 + localStorage
      toast.success('登录成功');
      navigate('/admin'); // 登录成功跳转
    } catch (err) {
      console.error('登录失败', err);
      toast.error('登录失败，请检查邮箱和密码');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">
          用户登录
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">邮箱</label>
            <input
              type="email"
              name="account"
              value={form.account}
              onChange={handleChange}
              required
              maxLength={64}
              placeholder="请输入邮箱"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1">密码</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="请输入密码"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white transition-colors duration-200 bg-blue-600 rounded hover:bg-blue-700"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
