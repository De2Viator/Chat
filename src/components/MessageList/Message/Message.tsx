import { ListItem } from '@mui/material';
import React from 'react';

export const Message = ({ message }) => {
  return (
    <ListItem key={message.id}>
      {message.name}:{message.message}
    </ListItem>
  );
};
