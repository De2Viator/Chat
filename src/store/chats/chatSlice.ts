import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { getChats as getChatsServer } from '../../api/api';
import { Chat } from '../../shared/chat';

export interface ChatState {
  chats: Chat[];
}

export const getChats = createAsyncThunk('CHAT_GET', async (userId: string) => {
  const chats = await getChatsServer(userId);
  return chats;
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
    chats: [] as Chat[],
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
    builder.addCase(getChats.fulfilled, (state: ChatState) => {
      console.log(state);
    });
  },
  reducers: {},
});
export default chatSlice.reducer;
