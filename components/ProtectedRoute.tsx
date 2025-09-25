
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { Role } from '../types';

interface ProtectedRouteProps {
  children: ReactNode;
  roles: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
     return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p>Please log in to view this page.</p>
      </div>
    );
  }

  if (roles.length > 0 && (!user || !roles.includes(user.role))) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Permission Denied</h2>
        <p>You do not have the necessary permissions to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
