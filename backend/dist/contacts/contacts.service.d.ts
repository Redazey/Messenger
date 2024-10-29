import { Contact } from './contacts.entity';
import { User } from 'src/users/users.entity';
export declare class ContactsService {
    private contacts;
    private users;
    constructor(contacts: typeof Contact, users: typeof User);
    findAll(user_id: number): Promise<User[] | undefined>;
    delete(credentials: {
        user_id: number;
        contact_id: number;
    }): Promise<void>;
    isExists(credentials: {
        user_id: number;
        contact_id: number;
    }): Promise<Contact | undefined>;
    create(credentials: {
        user_id: number;
        contact_id: number;
    }): Promise<Contact | undefined>;
}
