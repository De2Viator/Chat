import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { getMessages as getMessagesServer } from '../../api/api';
import { Message } from '../../shared/message';
export interface MessageState {
  messages: Message[];
}
export const getMessages = createAsyncThunk(
  'GET_MESSAGES',
  async (chatId: string) => {
    const response = await getMessagesServer(chatId);
    return response;
  }
);
export const messageSlice: Slice<MessageState> = createSlice({
  initialState: {
    messages: [] as Message[],
  },
  name: 'MESSAGE',
  reducers: {
    addMessage(state, payload) {
      const message = state.messages.find(
        (message) => message._id === payload.payload._id
      );
      console.log(message);
      if (!message) state.messages.push(payload.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload.data;
    });
  },
});
export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
