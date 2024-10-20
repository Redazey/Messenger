import { Chat } from './chats.entity';

export const chatProviders = [
  {
    provide: 'CHATS_REPOSITORY',
    useValue: Chat,
  },
];
