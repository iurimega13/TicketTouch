import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: React.ReactElement;
  isAuthenticated: boolean;
  allowedRoles: string[]; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAuthenticated, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');

  // Se o usuário não estiver autenticado, redirecione para login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Se o usuário não tiver o papel correto, redirecione para home
  if (!allowedRoles.includes(userRole!)) {
    return <Navigate to="/home" />;
  }

  // Se o usuário tiver permissão, renderiza o componente
  return element;
};

export default PrivateRoute;
