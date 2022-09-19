import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { ChatUser, User } from '../../shared/user';
import { getUsers as getUsersServer } from '../../api/api';
import { searchUsers as searchUsersServer } from '../../api/api';

export interface UserState {
  users: ChatUser[];
  user: User;
  userSearching: string;
}

export const getUsers = createAsyncThunk('GET_USERS', async () => {
  const response = await getUsersServer();
  return response;
});

export const searchUsers = createAsyncThunk(
  'SEARCH_USERS',
  async (name: string) => {
    const response = await searchUsersServer(name);
    return response;
  }
);

export const userSlice: Slice<UserState> = createSlice({
  name: 'USERS',
  initialState: {
    users: [] as ChatUser[],
    user: {
      photo: {
        data: '',
        type: '',
      },
      name: '',
    } as User,
    userSearching: '',
  },
  reducers: {
    setUserSearch(state, payload) {
      state.userSearching = payload.payload;
    },
    registerUser(state, payload) {
      state.user = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, payload) => {
      state.users = [...payload.payload.data];
    });
    builder.addCase(searchUsers.fulfilled, (state, payload) => {
      state.users = [...payload.payload.data];
    });
  },
});
export const { setUserSearch, registerUser } = userSlice.actions;
export default userSlice.reducer;
