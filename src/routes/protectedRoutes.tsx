import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { StoreState } from '../store/store';
export const ProtectedRoute = () => {
  const isAuth = useSelector<StoreState>((state) => state.auth.isAuth);
  console.log(isAuth)
  if (!isAuth) {
    return <Navigate to={'/auth'} />;
  }
  return <Outlet />;
};
