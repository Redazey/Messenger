import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    signIn(signInDto: Record<string, any>): Promise<import("./users.entity").User[]>;
}
