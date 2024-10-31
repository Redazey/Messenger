import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './registration.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(res: Response, signInDto: Record<string, any>): Promise<void>;
    register(createUserDto: CreateUserDto): Promise<{
        jwtToken: string;
    }>;
    getProfile(req: any): Promise<{
        user: import("../users/users.entity").User;
    }>;
}
