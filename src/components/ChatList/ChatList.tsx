import React, { useEffect } from 'react';
import { FC } from 'react';
import { StoreState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Chat } from '../../shared/chat';
import { User } from '../../shared/user';
export const ChatList: FC = () => {
  const chats = useSelector<StoreState>((state) => state.chat.chats) as Chat[];
  const user = useSelector<StoreState>((state) => state.user.user) as User;
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch<any>(getChats(user._id));
  }, []);
  return (
    <>
      {chats.map((chat) => (
        <p key={chat._id}>{chat.name}</p>
      ))}
    </>
  );
};
