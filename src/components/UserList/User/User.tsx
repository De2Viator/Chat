import React from 'react';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import { ListItemButton, ListItemText } from '@mui/material';
import './User.scss';

export const User = ({ user }) => {
  return (
    <Link className="user-link" key={user._id} to={`/chats/${user._id}`}>
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
  );
};
