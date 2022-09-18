import { Message } from '../../shared/message';
import { Message as MessageEl } from './Message/Message';
import { StoreState } from '../../store/store';
import './MessagesList.scss';

import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../store/messages/messagesSlice';
import { socket } from '../../api/api';

export function MessageList() {
  const [messageList, setMessageList] = useSelector<StoreState>(
    (state) => state.message.messages
  ) as Message[];
  const [message, setMessage] = useState<string>('');
  const userId = useSelector<StoreState>(
    (state) => state.user.user._id
  ) as string;
  const chatId = useSelector<StoreState>(
    (state) => state.chat.chatId
  ) as string;
  const { partnerId } = useParams() as unknown as { partnerId: string };
  const dispatch = useDispatch();
  const sendMessage = (): void => {
    socket.emit('send-message', {
      userId,
      partnerId,
      chatId,
      message,
    });
  };
  useEffect(() => {
    dispatch<any>(getMessages({ userId, partnerId, chatId })).then(() => {
      console.log(messageList);
    });
    socket.on('get-message', (data) => {
      console.log(data);
    });
  }, []);
  //<List sx={{ height: '78vh' }}></List>
  return (
    <>
      <div className="message-sender">
        <TextField
          onChange={(e) => setMessage(e.target.value)}
          sx={{ width: '90%' }}
        />
        <div className="send" onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
        </div>
      </div>
    </>
  );
}
