import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './registration.dto';
import { User } from 'src/users/users.entity';
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
    register(credentials: CreateUserDto): Promise<{
        jwtToken: string;
    }>;
    getProfile(req: any): Promise<{
        user: User;
    }>;
}
