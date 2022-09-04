import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { ChatUser } from '../../shared/user';
import { getUsers as getUsersServer } from '../../api/api';

export interface UserState {
  users: ChatUser[];
}

export const getUsers = createAsyncThunk('GET_USERS', async () => {
  const response = await getUsersServer();
  return response;
});

export const userSlice: Slice<UserState> = createSlice({
  name: 'PROFILE',
  initialState: {
    users: [] as ChatUser[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, payload) => {
      state.users = [...payload.payload.data];
    });
  },
});
export default userSlice.reducer;
