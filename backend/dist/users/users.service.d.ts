import { User } from './users.entity';
export declare class UsersService {
    private users;
    constructor(users: typeof User);
    findOne(email: string): Promise<User | undefined>;
    findByName(username: string): Promise<User[] | undefined>;
    create(credentials: {
        username: string;
        email: string;
        password: string;
    }): Promise<User | undefined>;
}
