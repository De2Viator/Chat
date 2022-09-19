import React, { useEffect } from 'react';
import { FC } from 'react';
import { StoreState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Chat } from '../../shared/chat';
import { User } from '../../shared/user';
import { Link } from 'react-router-dom';
import { getChats, setChatId } from '../../store/chats/chatSlice';
import { List } from '@mui/material';
export const ChatList: FC = () => {
  const chats = useSelector<StoreState>((state) => state.chat.chats) as Chat[];
  const user = useSelector<StoreState>((state) => state.user.user) as User;
  const dispatch = useDispatch();
  useEffect(() => {
    //TODO LINK TO PARTNER ID
    dispatch<any>(getChats(user._id));
  }, []);
  //<ChatEl key={chat._id} chat={chat} />
  return (
    <>
      <List>
        {chats.map((chat: Chat) => (
          <Link
            onClick={() => dispatch<any>(setChatId(chat._id))}
            to={chat._id}
            key={chat._id}
          >
            {chat._id}
          </Link>
        ))}
      </List>
    </>
  );
};
