import { Inject, Injectable } from '@nestjs/common';
import { Contact } from './contacts.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class ContactsService {
  constructor(
    @Inject('CONTACTS_REPOSITORY') private contacts: typeof Contact,
    @Inject('USERS_REPOSITORY') private users: typeof User
  ) {}

  async findAll(user_id: number): Promise<User[] | undefined> {
    const contacts = await this.contacts.findAll({
      where: { user_id: user_id },
      include: [
        {
          model: User,
          attributes: ['username', 'user_id'],
          as: 'contact',
          required: true,
        },
      ],
    });

    return contacts.map(contact => contact.get('contact') as User);
  }

  async delete(credentials: { user_id: number; contact_id: number }) {
    await this.contacts.truncate({
      where: {
        user_id: credentials.user_id,
        contact_id: credentials.contact_id,
      },
    });
    return await this.contacts.truncate({
      where: {
        user_id: credentials.contact_id,
        contact_id: credentials.user_id,
      },
    });
  }

  async isExists(credentials: {
    user_id: number;
    contact_id: number;
  }): Promise<Contact | undefined> {
    const contact = await this.contacts.findOne({
      where: {
        user_id: credentials.contact_id,
      },
    });
    return contact;
  }

  async create(credentials: {
    user_id: number;
    contact_id: number;
  }): Promise<Contact | undefined> {
    const isExists = await this.isExists(credentials);
    if (isExists != undefined) {
      console.log(isExists);
      return undefined;
    }
    await this.contacts.create({
      user_id: credentials.user_id,
      contact_id: credentials.contact_id,
    });
    return await this.contacts.create({
      user_id: credentials.contact_id,
      contact_id: credentials.user_id,
    });
  }
}
