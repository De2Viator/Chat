export interface Chat {
  photo: {
    type: string;
    data: string;
  };
  lastMessage: string;
  date: Date;
  name: string;
  _id: string;
}
