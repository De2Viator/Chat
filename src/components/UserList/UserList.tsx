import React, { FC, useEffect } from 'react';
import List from '@mui/material/List';
import { ChatUser } from '../../shared/user';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { searchUsers } from '../../store/users/userSlice';
import { User } from './User/User';
import { setChatId } from '../../store/chats/chatSlice';
import { Chat } from '../../shared/chat';

export const UserList: FC = () => {
  const users = useSelector<StoreState>(
    (state) => state.user.users
  ) as ChatUser[];
  const chats = useSelector<StoreState>((state) => state.chat.chats) as Chat[];
  const userSearching = useSelector<StoreState>(
    (state) => state.user.userSearching
  ) as string;
  const dispatch = useDispatch();
  const userId = useSelector<StoreState>(
    (state) => state.user.user._id
  ) as string;
  useEffect(() => {
    if (userSearching) {
      dispatch<any>(
        searchUsers({
          name: userSearching,
          userId,
        })
      );
    }
  }, [userSearching]);
  return (
    <>
      <List>
        {users.map((user: ChatUser) => {
          return (
            !chats.find(
              (chat: Chat) =>
                chat.partner.userId === user._id ||
                chat.user.userId === user._id
            ) && (
              <User
                onClick={() => dispatch(setChatId(''))}
                key={user._id ?? 0}
                user={user}
              />
            )
          );
        })}
      </List>
    </>
  );
};
