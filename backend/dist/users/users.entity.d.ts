import { Model } from 'sequelize-typescript';
import { UsersChats } from '../database/users_chats.entity';
import { Message } from '../messages/messages.entity';
import { Contact } from '../contacts/contacts.entity';
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
