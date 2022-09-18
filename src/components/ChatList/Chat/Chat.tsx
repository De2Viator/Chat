import ListItem from '@mui/material/ListItem/ListItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Chat as ChatType } from '../../../shared/chat';
import { setChatId } from '../../../store/chats/chatSlice';

export const Chat: FC<{ chat: ChatType }> = ({ chat }) => {
  return (
    <Link
      className="user-link"
      onClick={() => setChatId(chat._id)}
      to={`/chats/${chat._id}`}
    >
      <ListItem disablePadding data-testid="message">
        <ListItemButton>
          <img
            className="user-image"
            src={`data:image${chat.photo.type};base64,${chat.photo.data}`}
            alt="user image"
          />
          <ListItemText>{chat.name}</ListItemText>
        </ListItemButton>
      </ListItem>
    </Link>
  );
};
