type Users = {
  userId: number;
  username: string;
  email: string;
  createdAt: string;
};

type Chats = {
  chatId: number;
  chatName: string;
  createdAt: string;
};

type Contacts = {
  contactId: number;
  userId: number;
  contactType: 'user' | 'chat';
  friendId: number;
};

type Messages = {
  messageId: number;
  senderId: number;
  chatId?: number;
  contactType: 'user' | 'chat';
  messageText: string;
  sentAt: string;
  editAt?: string;
};