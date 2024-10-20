import { Contact } from './contacts.entity';

export const contactProvider = [
  {
    provide: 'CONTACT_REPOSITORY',
    useValue: Contact,
  },
];
