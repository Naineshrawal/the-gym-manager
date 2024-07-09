// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useUser();

  if (!user) {
    console.log('navigating to home');
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log('navigating to home 2');
    
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
