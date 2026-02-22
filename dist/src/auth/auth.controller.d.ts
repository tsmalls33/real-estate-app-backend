import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(input: SignInDto): Promise<import("./dto/signin.dto").SignInResponseDto>;
    signUp(input: SignUpDto): Promise<import("packages/types/dist").UserResponseDto>;
    getProfile(req: any): any;
    refreshToken(input: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
