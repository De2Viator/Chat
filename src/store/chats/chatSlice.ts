import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { onValue } from 'firebase/database';
import { nanoid } from 'nanoid';
import {
  addChatFirebase,
  addMessagesFirebase,
  deleteChatFirebase,
  userRef,
} from '../../cloudStore/firebase';
import { Message } from '../../components/shared/message';
import { User } from '../../components/shared/user';

export interface ChatState {
  users: User[];
}

export interface ChatActions {
  addMessage: () => void;
  addUser: () => void;
  deleteUser: () => void;
}
export interface ChatPayload {
  payload: {
    user: User;
    userName: string;
    message: Message;
  };
}

export interface BotPayload {
  payload: {
    user: User;
    bot: Message;
  };
}

export const botAnswer = createAsyncThunk('BOT_ANSWER', async (user: User) => {
  const bot: Message = await new Promise((resolve) =>
    setTimeout(() => {
      const newMessage = {
        name: 'bot',
        message: 'Сообщение отправлено!',
        id: nanoid(),
      };
      resolve(newMessage);
    }, 1500)
  );
  const payload = {
    user,
    message: bot,
  };
  await addMessagesFirebase(payload);
});

export const addChat = createAsyncThunk('CHAT_ADD', async (name: string) => {
  const chat = {
    name,
    messages: [],
    id: nanoid(),
  };
  await addChatFirebase(chat);
  const payload = {
    user: chat,
  };
  return payload;
});

export const addMessage = createAsyncThunk(
  'MESSAGE_ADD',
  async (data: { user: User; message: Message }) => {
    await addMessagesFirebase(data);
  }
);

export const initialUsers = createAsyncThunk(
  'INITIAL_USER',
  (data, { dispatch }) => {
    onValue(userRef, (snapshot) => {
      dispatch(getUsers(snapshot.val()));
    });
  }
);

export const deleteChat = createAsyncThunk(
  'CHAT_DELETE',
  async (id: string) => {
    await deleteChatFirebase(id);
  }
);

export const chatSlice: Slice<ChatState> = createSlice({
  name: 'CHAT',
  initialState: {
    users: {},
  },
  reducers: {
    getUsers(state, action) {
      console.log(action.payload);
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(botAnswer.fulfilled, () => {
      console.log('bot answered');
    });
    builder.addCase(addChat.fulfilled, () => {
      console.log('chat created');
    });
    builder.addCase(deleteChat.fulfilled, () => {
      console.log('chat deleted');
    });
    builder.addCase(addMessage.fulfilled, () => {
      console.log('add message');
    });
  },
});

export const { getUsers } = chatSlice.actions;
export default chatSlice.reducer;
