import { Message } from './messages.entity';
export const chatProviders = [
  {
    provide: 'MESSAGE_REPOSITORY',
    useValue: Message,
  },
];
