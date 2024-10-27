import { Chat } from './chats.entity';
import { UsersChats } from '../users_chats/users_chats.entity';
export declare class ChatsService {
    private chat;
    private users_chats;
    constructor(chat: typeof Chat, users_chats: typeof UsersChats);
    findAll(user_id: number): Promise<Chat[] | undefined>;
    create(credentials: {
        name: string;
        user_id: number[];
    }): Promise<Chat | undefined>;
}
