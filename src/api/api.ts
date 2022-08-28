import axios from 'axios';
import { SignInUser } from '../components/shared/auth';

export const url =
  'https://www.reddit.com/r/Wallstreetbets/top.json?limit=10&t=year';

const HOST = 'http://localhost:3030';
export const signIn = async (user: SignInUser) => {
  const response = await axios.post(`${HOST}/auth/signIn`, user);
  console.log(response);
};
