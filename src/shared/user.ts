export interface SignUpUser {
  hobbies: string[];
  name: string;
  surname: string;
  description: string;
  birthdayDate: string;
  email: string;
  password?: string;
  nick: string;
  photo:
    | {
        data: string;
        type: string;
      }
    | Blob;
}

export interface User extends SignUpUser {
  _id: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface ChatUser {
  nick: string;
  photo: {
    data: string;
    type: string;
  };
  _id: string;
}
