import { Model } from 'sequelize-typescript';
import { Message } from '../messages/messages.entity';
import { UsersChats } from '../users_chats/users_chats.entity';
export declare class Chat extends Model<Chat> {
    chat_id: number;
    chat_name: string;
    created_at: Date;
    usersChats: UsersChats[];
    messages: Message[];
}
