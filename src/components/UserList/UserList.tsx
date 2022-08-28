import React, { FC, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { User } from '../../shared/user';
import { Link } from 'react-router-dom';
import './userList.scss';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { getChats } from '../../store/chats/chatSlice';

export const UserList: FC = () => {
  const users = useSelector<StoreState>((state) => state.chat.users) as User[];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getChats());
  }, []);
  const deleteUser = (user: User) => {
    console.log(user);
    console.log('deleted');
  };
  return (
    <>
      <List>
        {users.map((user: User) => (
          <Link className="user-link" key={user.id} to={`/messages/${user.id}`}>
            <ListItem disablePadding data-testid="message">
              <ListItemButton>
                <ListItemIcon
                  data-testid="deleteUser"
                  onClick={() => deleteUser(user)}
                >
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>{user.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>{' '}
    </>
  );
};
