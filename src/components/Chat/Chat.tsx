import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserList } from '../UserList/UserList';
import './Chat.scss';

export function Chat() {
  return (
    <>
      <UserList />
      <Outlet />
    </>
  );
}
