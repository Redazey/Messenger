import { ChatsService } from 'src/chats/chats.service';
import { ContactsService } from './contacts.service';
import { NewContactDto } from './newcontact.dto';
export declare class ContactsController {
    private chatsService;
    private contactsService;
    constructor(chatsService: ChatsService, contactsService: ContactsService);
    signIn(newContactDto: NewContactDto): Promise<import("../chats/chats.entity").Chat>;
}
