import { Message } from './message';

export interface User {
  name: string;
  id: string;
  messages: Message[];
}

export interface RegisteredUser {
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
