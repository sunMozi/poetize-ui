import React, { useState, useEffect } from 'react';
import type { RegisterRequest, UserLoginRequest } from '../types/user';
import { login } from '../api/userApi';
// import { sendEmailCode } from '../api/userApi';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState<UserLoginRequest>({
    account: '',
    password: '',
    isAdmin: false,
  });
  const [registerForm, setRegisterForm] = useState<RegisterRequest>({
    account: '',
    password: '',
    code: '',
    phoneNumber: '',
    email: '',
  });

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm);
      alert('登录成功');
    } catch (err) {
      console.error('登录失败', err);
      alert('登录失败，请检查账号信息');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.phoneNumber && !registerForm.email) {
      alert('手机号和邮箱必须至少填写一个');
      return;
    }
    try {
      // await register(registerForm);
      alert('注册成功');
    } catch (err) {
      console.error('注册失败', err);
      alert('注册失败，请检查信息');
    }
  };

  const sendCode = async () => {
    if (!registerForm.email) {
      alert('请先输入邮箱');
      return;
    }
    try {
      // await sendEmailCode(registerForm.email);
      alert(`验证码已发送至 ${registerForm.email}`);
      setCountdown(60);
    } catch (err) {
      console.error('发送验证码失败', err);
      alert('验证码发送失败，请重试');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-bold ${
              mode === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setMode('login')}
          >
            登录
          </button>
          <button
            className={`ml-6 px-4 py-2 font-bold ${
              mode === 'register'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setMode('register')}
          >
            注册
          </button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block mb-1">账号</label>
              <input
                name="account"
                value={loginForm.account}
                onChange={handleLoginChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 border rounded"
                placeholder="请输入账号"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">密码</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                maxLength={100}
                required
                className="w-full px-3 py-2 border rounded"
                placeholder="请输入密码"
              />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={loginForm.isAdmin}
                  onChange={handleLoginChange}
                />
                <span className="ml-2">管理员登录</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              登录
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <label className="block mb-1">账号</label>
              <input
                name="account"
                value={registerForm.account}
                onChange={handleRegisterChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 border rounded"
                placeholder="请输入账号"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">密码</label>
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                maxLength={100}
                required
                className="w-full px-3 py-2 border rounded"
                placeholder="请输入密码"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">邮箱</label>
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  className="flex-1 px-3 py-2 border rounded-l"
                  placeholder="请输入邮箱"
                />
                <button
                  type="button"
                  onClick={sendCode}
                  disabled={countdown > 0}
                  className={`px-3 py-2 text-white rounded-r ${
                    countdown > 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">验证码</label>
              <input
                name="code"
                value={registerForm.code}
                onChange={handleRegisterChange}
                required
                className="w-full px-3 py-2 border rounded"
                placeholder="请输入验证码"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              注册
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
