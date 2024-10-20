import { UsersChats } from './users_chats.entity';

export const chatProviders = [
  {
    provide: 'USERS_CHATS_REPOSITORY',
    useValue: UsersChats,
  },
];
