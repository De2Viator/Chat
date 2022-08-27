import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { StoreState } from '../store/store';
export const ProtectedRoute = (props) => {
  const isAuth = useSelector((state: StoreState) => state.profile.auth.isAuth);
  if (!isAuth) {
    return <Navigate to={'/signIn'} />;
  }
  return <Outlet />;
};
