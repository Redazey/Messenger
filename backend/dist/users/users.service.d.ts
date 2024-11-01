import { User } from './users.entity';
import { UsersChats } from 'src/users_chats/users_chats.entity';
export declare class UsersService {
    private users;
    private user_chats;
    constructor(users: typeof User, user_chats: typeof UsersChats);
    findOne(email: string): Promise<User | undefined>;
    findByName(username: string): Promise<User[] | undefined>;
    findByChat(chat_id: number): Promise<User[] | undefined>;
    create(credentials: {
        username: string;
        email: string;
        password: string;
    }): Promise<User | undefined>;
}
