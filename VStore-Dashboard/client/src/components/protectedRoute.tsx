import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  redirectTo,
}: ProtectedRouteProps) {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  if (!userInfo) {
    return <Navigate to={redirectTo || '/'} replace />;
  }

  return children;
}
