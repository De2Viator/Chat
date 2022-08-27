import { Message } from './message';

export interface User {
  name: string;
  id: string;
  messages?: Message[];
}
