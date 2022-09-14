import axios from 'axios';
import { SignInUser } from '../shared/user';
import { SignUpUser } from '../shared/user';
export const url =
  'https://www.reddit.com/r/Wallstreetbets/top.json?limit=10&t=year';

const SERVER = 'http://localhost:3030';

export const signIn = async (user: SignInUser) => {
  const response = await axios.post(`${SERVER}/auth/signIn`, user, {
    withCredentials: true,
  });
  if (response.status === 200) {
    return response;
  } else {
    return Promise.reject(response.data);
  }
};

export const signUp = async (user: SignUpUser) => {
  const formData = new FormData();
  formData.append('photo', user.photo);
  formData.append('name', user.name);
  formData.append('surname', user.surname);
  formData.append('description', user.description);
  formData.append('nick', user.nick);
  formData.append('email', user.email);
  formData.append('password', user.password);
  formData.append('hobbies', JSON.stringify(user.hobbies));
  formData.append('birthdayDate', user.birthdayDate);
  const response = await axios.post(`${SERVER}/auth/signUp`, formData, {
    withCredentials: true,
  });
  return response;
};

export const getUsers = async () => {
  const response = await axios.get(`${SERVER}/users/`, {
    withCredentials: true,
  });
  return response;
};
