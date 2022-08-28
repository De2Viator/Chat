import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { User } from '../../shared/user';

export interface ChatState {
  users: User[];
}

export const getChats = createAsyncThunk('CHAT_GET', async () => {
  //
});

export const addChat = createAsyncThunk('CHAT_ADD', () => {
  //
});

export const addMessage = createAsyncThunk('MESSAGE_ADD', async () => {
  //
});

export const deleteChat = createAsyncThunk('CHAT_DELETE', async () => {
  //
});

export const chatSlice: Slice<ChatState> = createSlice({
  name: 'CHAT',
  initialState: {
    users: [] as User[],
  },
  extraReducers: (builder) => {
    builder.addCase(addChat.fulfilled, () => {
      console.log('chat created');
    });
    builder.addCase(deleteChat.fulfilled, () => {
      console.log('chat deleted');
    });
    builder.addCase(addMessage.fulfilled, () => {
      console.log('add message');
    });
    builder.addCase(getChats.fulfilled, () => {
      console.log('get');
    });
  },
  reducers: {},
});

export const { getUsers } = chatSlice.actions;
export default chatSlice.reducer;
