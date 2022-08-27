import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, push, ref, remove, set } from 'firebase/database';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { Message } from '../components/shared/message';
import { User } from '../components/shared/user';

const firebaseConfig = {
  apiKey: 'AIzaSyAaEE3hpdTNAdmpjvLYSMpFELd1XEbWHUU',
  authDomain: 'react-chat-7c1e5.firebaseapp.com',
  projectId: 'react-chat-7c1e5',
  storageBucket: 'react-chat-7c1e5.appspot.com',
  messagingSenderId: '312006029673',
  appId: '1:312006029673:web:0d435af9dbef71d3d60df8',
  measurementId: 'G-D4RH6MTY9X',
};

export interface AuthUser {
  email: string;
  password: string;
}

interface UserChat {
  name: string;
  id: string;
  messages: Message[];
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
const analytics = getAnalytics(app);

export const createUserFirebase = (user: AuthUser) => {
  return createUserWithEmailAndPassword(auth, user.email, user.password);
};

export const signInFirebase = (user: AuthUser) => {
  return signInWithEmailAndPassword(auth, user.email, user.password);
};

export const signOutFirebase = () => {
  return signOut(auth);
};

export const addChatFirebase = async (user: UserChat) => {
  try {
    set(ref(db, 'users/' + user.id), {
      name: user.name,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteChatFirebase = async (id: string) => {
  remove(ref(db, 'users/' + id));
};

export const addMessagesFirebase = (data: { user: User; message: Message }) => {
  try {
    set(push(ref(db, 'users/' + data.user.id + '/messages')), {
      message: data.message.message,
      name: data.message.name,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const userRef = ref(db, 'users/');
