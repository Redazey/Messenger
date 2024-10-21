export interface Users {
  user_id: number;
  password: string;
  username: string;
  email: string;
  created_at: string | null;
}

export interface Chats {
  chat_id: number;
  chatName: string;
  createdAt: string;
};

export interface Contacts {
  id: number;
  user_id: number;
  contact_id: number;
};

export interface Users_chats {
  id: number;
  chat_id: number;
  user_id: number;
  entered_at: string;
}

export interface Messages {
  messageId: number;
  user_id: number;
  chat_id?: number;
  messageText: string;
  deleted: boolean;
  sent_at: string;
  edit_at?: string;
};

export interface Callback {
  status: boolean,
  data: any
}