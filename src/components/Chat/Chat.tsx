import React from 'react';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { MessageList } from '../MessageList/MessageList';
import { Message } from '../shared/message';
import { User } from '../shared/user';
import { UserList } from '../UserList/UserList';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import {
  addMessageSlice,
  addUserSlice,
  botAnswer,
  deleteUserSlice,
} from '../../store/chats/chatSlice';

export function Chat() {
  const [message, setMessage] = useState<string>('');
  const { id } = useParams<string>();
  const [userFinded, setUserFinded] = useState<User>({
    name: '',
    messages: [],
    id: nanoid(),
  });
  const [userAdded, setUserAdded] = useState<string>('');

  const dispatch = useDispatch();
  const chat = useSelector((state: StoreState) => state.chat.users);
  useEffect(() => {
    chat.find((user) => {
      if (user.id === id) {
        setUserFinded(user);
      }
    });
  }, [id, chat]);

  function addMessage(): void {
    const newMessage: Message = { name: 'user', message, id: nanoid() };
    updateUser(newMessage);
    dispatch<any>(botAnswer(userFinded));
  }

  function addUser(): void {
    const payload = {
      userName: userAdded,
    };
    dispatch(addUserSlice(payload));
  }

  function updateUser(message: Message): void {
    const payload = {
      user: userFinded,
      message,
    };
    dispatch(addMessageSlice(payload));
  }

  function deleteUser(user: User) {
    const payload = {
      user,
    };
    dispatch(deleteUserSlice(payload));
    setUserFinded({ name: '', messages: [], id: nanoid() });
  }

  return (
    <>
      <div className="board">
        <div className="board__item-chats">
          <UserList deleteUser={deleteUser} userList={chat} />
          <Input setField={setUserAdded} />)
          <Button disabled={userAdded.length === 0} addField={addUser}>
            Add User
          </Button>
        </div>
        {userFinded.name && (
          <div className="board__item-messages">
            <MessageList messageList={userFinded.messages} />
            <label>
              <form action="#">
                <Input setField={setMessage} />
                <Button disabled={message.length === 0} addField={addMessage}>
                  Add Message
                </Button>
              </form>
            </label>
          </div>
        )}
      </div>
    </>
  );
}
