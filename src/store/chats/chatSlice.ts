import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { getChats as getChatsServer } from '../../api/api';
import { Chat } from '../../shared/chat';
import { Message } from '../../shared/message';

export interface ChatState {
  chats: Chat[];
  chatId: string;
}

export const getChats = createAsyncThunk('CHAT_GET', async (userId: string) => {
  const chats = await getChatsServer(userId);
  return chats;
});

export const deleteChat = createAsyncThunk('CHAT_DELETE', async () => {
  //
});

export const chatSlice: Slice<ChatState> = createSlice({
  name: 'CHAT',
  initialState: {
    chats: [] as Chat[],
    chatId: '',
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChat.fulfilled, () => {
      console.log('chat deleted');
    });
    builder.addCase(getChats.fulfilled, (state: ChatState, payload) => {
      state.chats = payload.payload.data;
    });
  },
  reducers: {
    setChatId(state, payload: { payload: string; type: string }) {
      state.chatId = payload.payload;
    },
    setLastMessage(
      state,
      payload: {
        payload: { chatId: string; lastMessage: string; timeStamp: string };
        type: string;
      }
    ) {
      for (const chat of state.chats) {
        if (chat._id === payload.payload.chatId) {
          chat.lastMessage = payload.payload.lastMessage;
          chat.messageDate = payload.payload.timeStamp;
        }
      }
    },
  },
});
export const { setChatId, setLastMessage } = chatSlice.actions;
export default chatSlice.reducer;
