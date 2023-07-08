import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { SignInUser, SignUpUser } from '../../shared/user';
import { signIn as signInServer } from '../../api/api';
import { signUp as signUpServer } from '../../api/api';

export interface AuthState {
  isAuth: boolean;
  error: string;
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
  return false;
});

export const profileSlice: Slice<AuthState> = createSlice({
  name: 'PROFILE',
  initialState: {
    isAuth: false as boolean,
    error: '',
  },
  reducers: {
    setAuthError(state, payload: { payload: string; type: string }) {
      state.error = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state) => {
      state.isAuth = true;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.isAuth = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.isAuth = false;
    });
  },
});

export const { setAuthError } = profileSlice.actions;
export default profileSlice.reducer;
