import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import chatSlice, { ChatState } from './chats/chatSlice';
import profileSlice, { AuthState } from './profile/profileSlice';
import homeSlice, { HomeState } from './home/home.slice';
import userSlice, { UserState } from './users/userSlice';
import messageSlice, { MessageState } from './messages/messagesSlice';

export interface StoreState {
  auth: AuthState;
  chat: ChatState;
  home: HomeState;
  user: UserState;
  message: MessageState;
}

const persStore = {
  key: 'root',
  storage,
  blacklist: ['chat'],
};

const rootReducer = combineReducers({
  auth: profileSlice,
  chat: chatSlice,
  home: homeSlice,
  user: userSlice,
  message: messageSlice,
});

const persistReducers = persistReducer(persStore, rootReducer);
export const store = configureStore({
  reducer: persistReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
