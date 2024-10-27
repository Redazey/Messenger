import { UsersChats } from './users_chats.entity';

export const users_chatsProviders = [
  {
    provide: 'USERS_CHATS_REPOSITORY',
    useValue: UsersChats,
  },
];
