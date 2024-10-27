import { Model } from 'sequelize-typescript';
import { Message } from '../messages/messages.entity';
import { Contact } from '../contacts/contacts.entity';
import { UsersChats } from 'src/users_chats/users_chats.entity';
export declare class User extends Model<User> {
    user_id: number;
    password: string;
    username: string;
    email: string;
    created_at: Date;
    chats: UsersChats[];
    messages: Message[];
    contacts: Contact[];
}
