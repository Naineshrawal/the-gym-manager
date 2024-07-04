// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useUser();

  if (!user) {
    
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
