import { Model } from 'sequelize-typescript';
import { UsersChats } from './users_chats.entity';
import { Message } from './messages.entity';
export declare class Chat extends Model<Chat> {
    chat_id: number;
    chat_name: string;
    created_at: Date;
    usersChats: UsersChats[];
    messages: Message[];
}
