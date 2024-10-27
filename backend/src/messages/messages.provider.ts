import { Message } from './messages.entity';
export const messageProviders = [
  {
    provide: 'MESSAGE_REPOSITORY',
    useValue: Message,
  },
];
