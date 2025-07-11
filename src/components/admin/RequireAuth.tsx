import React, { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';

const useAuth = () => {
  const isAuthenticated = useUserStore((state) => state.isLoggedIn());
  return { isAuthenticated };
};

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
