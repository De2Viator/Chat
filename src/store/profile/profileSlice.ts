import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { SignInUser, SignUpUser } from '../../shared/user';
import { signIn as signInServer } from '../../api/api';
import { signUp as signUpServer } from '../../api/api';

export interface AuthState {
  isAuth: boolean;
}

export const signUp = createAsyncThunk(
  'SIGN_UP_USER',
  async (payload: SignUpUser) => {
    const response = await signUpServer(payload);
    return response;
  }
);

export const signIn = createAsyncThunk(
  'SIGN_IN_USER',
  async (payload: SignInUser) => {
    const response = await signInServer(payload);
    return response;
  }
);

export const signOut = createAsyncThunk('SIGN_OUT_USER', async () => {
  console.log('signOut');
});

export const profileSlice: Slice<AuthState> = createSlice({
  name: 'PROFILE',
  initialState: {
    isAuth: false as boolean,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state) => {
      state.isAuth = true;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.isAuth = true;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.isAuth = false;
    });
  },
});

export const { changeCheck } = profileSlice.actions;
export default profileSlice.reducer;
