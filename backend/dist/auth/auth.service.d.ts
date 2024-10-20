import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    signIn(credentials: {
        email: string;
        password: string;
    }): Promise<{
        jwtToken: string;
    }>;
    register(credentials: {
        email: string;
        password: string;
    }): Promise<{
        jwtToken: string;
    }>;
}
