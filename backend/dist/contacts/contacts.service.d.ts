import { Contact } from './contacts.entity';
export declare class ContactsService {
    private contacts;
    constructor(contacts: typeof Contact);
    findAll(user_id: number): Promise<Contact[] | undefined>;
    create(credentials: {
        user_id: number;
        contact_id: number;
    }): Promise<Contact | undefined>;
}
