import React, { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// 这里用一个假函数模拟登录状态，你实际接入真实鉴权逻辑
const useAuth = () => {
  // 例如：从本地存储或全局状态读取
  const user = localStorage.getItem('user');
  return { isAuthenticated: !!user };
};

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // 重定向到登录页，state 传递当前路径用于登录后跳回
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
