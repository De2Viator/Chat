import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

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

const rootReducer = combineReducers({
  auth: profileSlice,
  chat: chatSlice,
  home: homeSlice,
  user: userSlice,
  message: messageSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
export const persistor = persistStore(store);
