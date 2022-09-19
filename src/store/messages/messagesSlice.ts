import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { getMessages as getMessagesServer } from '../../api/api';
import { Message, MessageInfo } from '../../shared/message';
export interface MessageState {
  messages: Message[];
}
export const getMessages = createAsyncThunk(
  'GET_MESSAGES',
  async (userData: MessageInfo) => {
    const response = await getMessagesServer(userData);
    return response;
  }
);
export const messageSlice: Slice<MessageState> = createSlice({
  initialState: {
    messages: [] as Message[],
  },
  name: 'MESSAGE',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload.data;
      console.log(state.messages);
    });
  },
});
export default messageSlice.reducer;
