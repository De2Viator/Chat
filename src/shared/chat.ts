interface ChatUser {
  name: string;
  photo: {
    contentType: string;
    data: string;
  };
  userId: string;
}

export interface Chat {
  lastMessage: string;
  date: Date;
  name: string;
  _id: string;
  user: ChatUser;
  partner: ChatUser;
  messageDate: string;
}
