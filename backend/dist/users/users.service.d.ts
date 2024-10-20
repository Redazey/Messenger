import { User } from './users.entity';
export declare class UsersService {
    private users;
    constructor(users: typeof User);
    findOne(username: string): Promise<User | undefined>;
}
