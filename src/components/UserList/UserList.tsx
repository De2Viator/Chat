import React, { FC, useEffect } from 'react';
import List from '@mui/material/List';
import { ChatUser } from '../../shared/user';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { searchUsers } from '../../store/users/userSlice';
import { User } from './User/User';

export const UserList: FC = () => {
  const users = useSelector<StoreState>(
    (state) => state.user.users
  ) as ChatUser[];
  const userSearching = useSelector<StoreState>(
    (state) => state.user.userSearching
  ) as string;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userSearching) {
      dispatch<any>(searchUsers(userSearching));
    }
  }, [userSearching]);
  return (
    <>
      <List>
        {users.map((user: ChatUser) => (
          <User key={user._id} user={user} />
        ))}
      </List>
    </>
  );
};
