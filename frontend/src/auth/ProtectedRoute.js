import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const isAuth = isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';

  console.log("Authenticated State: ", isAuth);

  if (!isAuth) {
      return <Navigate to="/signin" replace />;
  }

  return children;
};


export default ProtectedRoute;
