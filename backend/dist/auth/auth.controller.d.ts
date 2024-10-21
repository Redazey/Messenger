import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './registration.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        jwtToken: string;
    }>;
    regoster(createUserDto: CreateUserDto): Promise<{
        jwtToken: string;
        verified: any;
    }>;
}
