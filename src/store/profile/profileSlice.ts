import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { SignInUser, SignUpUser } from '../../shared/user';
import { signIn as signInServer } from '../../api/api';
import { signUp as signUpServer } from '../../api/api';

export interface ProfileState {
  check: boolean;
  auth: {
    isAuth: boolean;
    login: string;
    password: string;
  };
}
export interface ProfileAction {
  changeCheck: () => void;
}

export const signUp = createAsyncThunk(
  'SIGN_UP_USER',
  async (payload: SignUpUser) => {
    console.log(payload);
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
  //
});

export const profileSlice: Slice<ProfileState> = createSlice({
  name: 'PROFILE',
  initialState: {
    check: true as boolean,
    auth: {
      isAuth: false as boolean,
      login: '',
      password: '',
    },
  },
  reducers: {
    changeCheck(state) {
      state.check = !state.check;
    },
    signOut() {
      //
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, () => {
      console.log('Sign Up!');
    });
    builder.addCase(signIn.fulfilled, () => {
      console.log('Sign In!');
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.auth.isAuth = false;
    });
  },
});

export const { changeCheck } = profileSlice.actions;
export default profileSlice.reducer;
