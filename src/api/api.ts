import axios, { AxiosResponse } from 'axios';
import { Chat } from '../shared/chat';
import { ChatUser, SignInUser } from '../shared/user';
import { SignUpUser } from '../shared/user';
export const url =
  'https://www.reddit.com/r/Wallstreetbets/top.json?limit=10&t=year';

const SERVER = 'http://localhost:3030';

export const signIn = async (
  user: SignInUser
): Promise<AxiosResponse<SignInUser, { withCredentials: boolean }>> => {
  const response = await axios.post(`${SERVER}/auth/signIn`, user, {
    withCredentials: true,
  });
  return response;
};

export const signUp = async (
  user: SignUpUser
): Promise<AxiosResponse<SignUpUser, { withCredentials: boolean }>> => {
  const formData = new FormData();
  formData.append('photo', user.photo);
  formData.append('name', user.name);
  formData.append('surname', user.surname);
  formData.append('description', user.description);
  formData.append('nick', user.nick);
  formData.append('email', user.email);
  formData.append('password', user.password as string);
  formData.append('hobbies', JSON.stringify(user.hobbies));
  formData.append('birthdayDate', user.birthdayDate);
  const response = await axios.post(`${SERVER}/auth/signUp`, formData, {
    withCredentials: true,
  });
  return response;
};

export const getUsers = async (): Promise<
  AxiosResponse<ChatUser[], { withCredentials: boolean }>
> => {
  const response = await axios.get(`${SERVER}/users/`, {
    withCredentials: true,
  });
  return response;
};

export const searchUsers = async (
  nick: string
): Promise<AxiosResponse<ChatUser[], { withCredentials: boolean }>> => {
  const response = await axios.get(`${SERVER}/users/search?nick=${nick}`, {
    withCredentials: true,
  });
  return response;
};

export const getChats = async (
  userId: string
): Promise<AxiosResponse<Chat[], { withCredentials: boolean }>> => {
  const response = await axios.get(`${SERVER}/chats/${userId}`, {
    withCredentials: true,
  });
  return response;
};
