import { createSlice, Slice } from '@reduxjs/toolkit';
import { RegisteredUser } from '../../components/shared/user';

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
    login: string;
    password: string;
  };
}
export interface ProfileAction {
  changeCheck: () => void;
  authUser: () => void;
  signInUser: () => void;
}

export const profileSlice: Slice<ProfileState> = createSlice({
  name: 'PROFILE',
  initialState: {
    check: true,
    auth: {
      isAuth: true || false,
      login: '',
      password: '',
    },
  },
  reducers: {
    changeCheck(state) {
      state.check = !state.check;
    },
    authUser(state, action: AuthPayload) {
      if (
        action.payload.login === 'gb' &&
        action.payload.password === 'gb' &&
        !state.auth.isAuth
      ) {
        state.auth.isAuth = true;
      } else if (state.auth.isAuth) {
        state.auth.isAuth = false;
      }
    },
  },
});

export const { changeCheck, authUser } = profileSlice.actions;
export default profileSlice.reducer;
