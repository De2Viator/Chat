import React, { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import './ChatList.scss';

import { Chat } from '../../shared/chat';
import { User } from '../../shared/user';
import {
  getChats,
  setChatId,
  setLastMessage,
} from '../../store/chats/chatSlice';
import { StoreState } from '../../store/store';
import { Message } from '../../shared/message';
import { socket } from '../../api/api';
import { addMessage } from '../../store/messages/messagesSlice';
export const ChatList: FC = () => {
  const chats = useSelector<StoreState>((state) => state.chat.chats) as Chat[];
  const user = useSelector<StoreState>((state) => state.user.user) as User;
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const dispatch = useDispatch();
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  useEffect(() => {
    console.log('load');
    dispatch<any>(getChats(user._id));
    socket.on('get-message', (data: Message) => {
      console.log(data);
      if (data.userId === user._id || data.partnerId === user._id) {
        dispatch(addMessage(data));
        dispatch(
          setLastMessage({
            chatId: data.chatId,
            lastMessage: data.message,
            messageDate: data.timeStamp,
          })
        );
      }
    });
  }, []);
  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {chats.map((chat) => (
          <Link
            onClick={() => dispatch<any>(setChatId(chat._id))}
            to={
              chat.user.userId === user._id
                ? chat.user.userId
                : chat.partner.userId
            }
            key={chat._id}
            className="link"
          >
            <ListItemButton
              key={chat._id}
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: '60px',
                      height: '60px',
                      marginRight: '20px',
                    }}
                    alt={
                      chat.user.userId === user._id
                        ? chat.user.name
                        : chat.partner.name
                    }
                    src={`data:image${
                      chat.user.userId === user._id
                        ? chat.user.photo.contentType
                        : chat.partner.photo.contentType
                    };base64,${
                      chat.user.userId === user._id
                        ? chat.user.photo.data
                        : chat.partner.photo.data
                    }`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={chat.lastMessage}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {chat.user.userId === user._id
                          ? chat.user.name
                          : chat.partner.name}
                      </Typography>
                      {new Date(chat.messageDate).toLocaleString()}
                    </React.Fragment>
                  }
                />
                <Divider variant="inset" component="li" />
              </ListItem>
            </ListItemButton>
          </Link>
        ))}
      </List>
    </>
  );
};
