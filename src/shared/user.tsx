import { Message } from './message';

export interface User {
  name: string;
  id: string;
  messages?: Message[];
}

export interface SignUpUser {
  hobbies: string[];
  name: string;
  surname: string;
  description: string;
  birthdayDate: string;
  email: string;
  password: string;
  nick: string;
  photo: File;
}

export interface SignInUser {
  email: string;
  password: string;
}
