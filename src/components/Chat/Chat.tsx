import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserList } from '../UserList/UserList';
import './Chat.scss';

export function Chat() {
  return (
    <>
      <div className="chat-board">
        <div className="chat-list">
          <UserList />
        </div>
        <div className="message-list">
          <Outlet />
        </div>
      </div>
    </>
  );
}
