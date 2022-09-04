import React, { FC, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ChatUser } from '../../shared/user';
import { Link } from 'react-router-dom';
import './userList.scss';
import { ListItemButton, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { getUsers } from '../../store/users/userSlice';

export const UserList: FC = () => {
  const users = useSelector<StoreState>(
    (state) => state.user.users
  ) as ChatUser[];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getUsers());
  }, []);
  return (
    <>
      <List>
        {users.map((user: ChatUser) => (
          <Link
            className="user-link"
            key={user._id}
            to={`/messages/${user._id}`}
          >
            <ListItem disablePadding data-testid="message">
              <ListItemButton>
                <img
                  className="user-image"
                  src={`data:image${user.photo.type};base64,${user.photo.data}`}
                  alt="user image"
                />
                <ListItemText>{user.nick}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};
