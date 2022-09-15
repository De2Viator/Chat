import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserList } from '../UserList/UserList';
import './Chat.scss';
import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSearch } from '../../store/users/userSlice';
import { StoreState } from '../../store/store';
import { ChatList } from '../ChatList/ChatList';

export function Chat() {
  const dispatch = useDispatch();
  const userSearching = useSelector<StoreState>(
    (state) => state.user.userSearching
  ) as string;
  return (
    <>
      <div className="chat-board">
        <div className="chat-list">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '80%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-search"
              label="Search user"
              type="search"
              onChange={(e) => dispatch<any>(setUserSearch(e.target.value))}
            />
          </Box>
          {userSearching ? <UserList /> : <ChatList />}
        </div>
        <div className="message-list">
          <Outlet />
        </div>
      </div>
    </>
  );
}
