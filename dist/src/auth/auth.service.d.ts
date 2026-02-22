import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignInResponseDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'packages/types/dist';
export declare class AuthService {
    private readonly userService;
    private readonly prismaService;
    private readonly jwtService;
    private readonly jwtSecret;
    private readonly jwtRefreshSecret;
    private readonly jwtExpiresIn;
    private readonly jwtRefreshExpiresIn;
    constructor(userService: UserService, prismaService: PrismaService, jwtService: JwtService);
    signIn(input: SignInDto): Promise<SignInResponseDto>;
    signUp(input: SignUpDto): Promise<UserResponseDto>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateToken(secret: string, payload: Record<string, any>, expiresIn: string): Promise<string>;
    verifyToken(secret: string, token: string): Promise<any>;
}
