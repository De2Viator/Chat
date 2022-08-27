import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';

export interface ProfileState {
  check: boolean;
  auth: Auth;
}

export interface Auth {
  isAuth: boolean;
  login: string;
  password: string;
}

export interface AuthPayload {
  payload: {
    email: string;
    password: string;
  };
}
export interface ProfileAction {
  changeCheck: () => void;
}

export const createUser = createAsyncThunk('CREATE_USER_FIREBASE', async () => {
  //
});

export const signIn = createAsyncThunk('SIGN_IN_USER', async () => {
  //
});

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
    builder.addCase(createUser.fulfilled, (state, action) => {
      console.log('User created');
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      //
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.auth.isAuth = false;
    });
  },
});

export const { changeCheck } = profileSlice.actions;
export default profileSlice.reducer;
