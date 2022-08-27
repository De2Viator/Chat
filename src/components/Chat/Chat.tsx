import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { MessageList } from '../MessageList/MessageList';
import { User } from '../shared/user';
import { UserList } from '../UserList/UserList';
import createTheme from '@material-ui/core/styles/createTheme';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useParams } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import {
  addChat,
  initialUsers,
  deleteChat,
  addMessage,
  botAnswer,
} from '../../store/chats/chatSlice';

const theme = createTheme({
  palette: {
    background: {
      default: '#6f5eb8',
    },
  },
});

export function Chat() {
  const [message, setMessage] = useState<string>('');
  const { id } = useParams<string>();
  const [userFinded, setUserFinded] = useState<User>({
    name: '',
    messages: [],
    id: nanoid(),
  });
  const [userAdded, setUserAdded] = useState<string>('');
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const chat = useSelector((state: StoreState) => state.chat.users);

  useEffect(() => {
    dispatch<any>(initialUsers());
  }, []);

  useEffect(() => {
    users.forEach((user: User) => {
      if (user.id === id) {
        const userMessages = [];
        for (const key in user.messages) {
          userMessages.push({ ...user.messages[key], id: key });
        }
        setUserFinded({ ...user, messages: userMessages });
      }
    });
  }, [id, users]);

  function addСhatToStore(): void {
    dispatch<any>(addChat(userAdded));
  }

  function deleteUserToStore(user: User) {
    dispatch<any>(deleteChat(user.id));
    setUserFinded({ name: '', messages: [], id: nanoid() });
  }

  function addMessageToStore() {
    const payload = {
      user: { ...userFinded },
      message: {
        name: 'I',
        message,
      },
    };
    dispatch<any>(addMessage(payload));
    dispatch<any>(botAnswer(userFinded));
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="board">
          <div className="board__item-chats">
            <UserList
              deleteUser={deleteUserToStore}
              moveUser={setUsers}
              userList={chat}
            />
            <Input setField={setUserAdded} />)
            <Button disabled={userAdded.length === 0} addField={addСhatToStore}>
              Add User
            </Button>
          </div>
          {userFinded.name && (
            <div className="board__item-messages">
              <MessageList messageList={userFinded.messages} />
              <label>
                <form action="#">
                  <Input setField={setMessage} />
                  <Button
                    disabled={message.length === 0}
                    addField={addMessageToStore}
                  >
                    Add Message
                  </Button>
                </form>
              </label>
            </div>
          )}
        </div>
      </ThemeProvider>
    </>
  );
}
