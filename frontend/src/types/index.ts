export type Users = {
  user_id: number;
  username: string;
  email: string;
  createdAt: string;
};

export type Chats = {
  chat_id: number;
  chatName: string;
  createdAt: string;
};

export type Contacts = {
  id: number;
  user_id: number;
  contact_id: number;
};

export type Users_chats = {
  id: number;
  chat_id: number;
  user_id: number;
  entered_at: string;
}

export type Messages = {
  messageId: number;
  user_id: number;
  chat_id?: number;
  messageText: string;
  deleted: boolean;
  sent_at: string;
  edit_at?: string;
};

export type Callback = {
  status: boolean,
  data: any
}