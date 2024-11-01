import { UsersService } from './users.service';
import { Response } from 'express';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    signIn(signInDto: Record<string, any>): Promise<import("./users.entity").User[]>;
    getUsersByChat(chat_id: number): Promise<import("./users.entity").User[]>;
    logout(res: Response): void;
}
