import React, { useState } from 'react';
import List from '@mui/material/List';
import { Message } from '../../shared/message';
import { Message as MessageEl } from './Message/Message';

export function MessageList() {
  const [messageList, setMessageList] = useState<Message[]>([]);
  return (
    <List>
      {messageList.map((message: Message) => (
        <MessageEl key={message._id} message={message} />
      ))}
    </List>
  );
}
