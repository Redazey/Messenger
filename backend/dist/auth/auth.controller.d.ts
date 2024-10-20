import { AuthService } from 'src/auth/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        jwtToken: string;
    }>;
}
