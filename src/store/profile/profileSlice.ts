import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import {
  createUserFirebase,
  signInFirebase,
  signOutFirebase,
  User,
} from '../../cloudStore/firebase';

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

export const createUser = createAsyncThunk(
  'CREATE_USER_FIREBASE',
  async (user: User) => {
    let response = {};
    try {
      response = await createUserFirebase(user);
    } catch (err) {
      throw new Error(err);
    }
    const payload = {
      response,
    };
    return payload;
  }
);

export const signIn = createAsyncThunk('SIGN_IN_USER', async (user: User) => {
  let response = {};
  try {
    response = await signInFirebase(user);
  } catch (err) {
    throw new Error(err);
  }
  const payload = {
    response,
  };
  return payload;
});

export const signOut = createAsyncThunk('SIGN_OUT_USER', async () => {
  try {
    await signOutFirebase();
  } catch (err) {
    throw new Error(err);
  }
});

export const profileSlice: Slice<ProfileState> = createSlice({
  name: 'PROFILE',
  initialState: {
    check: true,
    auth: {
      isAuth: false,
      login: '',
      password: '',
    },
  },
  reducers: {
    changeCheck(state) {
      state.check = !state.check;
    },
    signOut() {
      signOutFirebase();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      console.log('User created');
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      if (action.payload.response['user']) {
        state.auth.isAuth = true;
      } else {
        state.auth.isAuth = false;
      }
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.auth.isAuth = false;
    });
  },
});

export const { changeCheck } = profileSlice.actions;
export default profileSlice.reducer;
