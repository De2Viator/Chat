import React from 'react';
import { UserList } from '../UserList/UserList';

export function Chat() {
  return (
    <>
      <div className="board">
        <div className="board__item-chats">
          <UserList />
        </div>
      </div>
    </>
  );
}
