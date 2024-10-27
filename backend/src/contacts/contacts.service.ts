import { Injectable } from '@nestjs/common';
import { Contact } from './contacts.entity';

@Injectable()
export class ContactsService {
  constructor(private contacts: typeof Contact) {}

  async findAll(user_id: number): Promise<Contact[] | undefined> {
    return this.contacts.findAll({
      where: {
        user_id: user_id,
      },
    });
  }

  async create(credentials: {
    user_id: number;
    contact_id: number;
  }): Promise<Contact | undefined> {
    return this.contacts.create(credentials);
  }
}
