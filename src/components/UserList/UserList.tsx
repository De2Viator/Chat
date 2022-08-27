import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { User } from '../shared/user';
import { Link } from 'react-router-dom';
import './userList.scss';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  userList: User[];
  deleteUser: (user: User) => void;
  moveUser: (userList) => void;
};
export function UserList(props: Props) {
  const [chat, setChat] = useState([]);
  useEffect(() => {
    const chatTemp = [];
    for (const key in props.userList) {
      chatTemp.push({ ...props.userList[key], id: key });
    }
    setChat([...chatTemp]);
    props.moveUser([...chatTemp]);
  }, [props.userList]);
  return (
    <>
      <List>
        {chat.map((user) => (
          <Link className="user-link" key={user.id} to={`/chats/${user.id}`}>
            <ListItem disablePadding data-testid="message">
              <ListItemButton>
                <ListItemIcon
                  data-testid="deleteUser"
                  onClick={() => props.deleteUser(user)}
                >
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>{user.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}
