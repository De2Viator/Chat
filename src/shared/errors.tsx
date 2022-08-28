export interface Errors {
  name: string;
  surname: string;
  birthdayDate: string;
  email: string;
  password: string;
  photo: string;
  hobby: string;
  description: string;
  nick: string;
}

export enum ErrorsMessages {
  NAME = 'Name was filled is not correctly',
  SURNAME = 'Surname was filled is not correctly',
  EMAIL = 'Email was filled is not correctly',
  PASSWORD = 'Password was filled is not correctly',
  BIRTHDAY_DATE = 'Birthday date is required',
  PHOTO = 'Photo is required',
  HOBBY = 'Hobbies are required',
  DESCRIPTION = 'Description is required',
  NICK = 'Nick is required',
}
