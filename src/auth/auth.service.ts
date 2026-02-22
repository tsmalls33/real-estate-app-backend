import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignInResponseDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '@RealEstate/types';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;
  private readonly jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
  private readonly jwtExpiresIn = process.env.JWT_EXPIRES_IN;
  private readonly jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;

  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(input: SignInDto): Promise<SignInResponseDto> {
    const { email, password } = input;

    const user = await this.userService.findByEmail(email, true);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.passwordHash) throw new BadRequestException('User has no saved password');

    const isPasswordValid = await this.userService.verifyPassword(
      password,
      user.passwordHash!,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (
      !this.jwtSecret ||
      !this.jwtRefreshSecret ||
      !this.jwtExpiresIn ||
      !this.jwtRefreshExpiresIn
    ) {
      throw new Error('JWT secrets are not configured');
    }

    const payload = { sub: user.id_user, email: user.email, role: user.role };

    const accessToken = await this.generateToken(
      this.jwtSecret,
      payload,
      this.jwtExpiresIn,
    );
    const refreshToken = await this.generateToken(
      this.jwtRefreshSecret,
      payload,
      this.jwtRefreshExpiresIn,
    );

    return {
      user: {
        id_user: user.id_user,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        id_tenant: user.id_tenant,
      },
      accessToken,
      refreshToken,
    };
  }

  async signUp(input: SignUpDto): Promise<UserResponseDto> {
    const { email, password, firstName, lastName, role, id_tenant } = input;

    const newUser = await this.userService.createUser({
      email,
      password,
      firstName,
      lastName,
      role,
      id_tenant,
    });

    return newUser;
  }

  async refreshToken(refreshToken: string) {
    if (
      !this.jwtRefreshSecret ||
      !this.jwtSecret ||
      !this.jwtExpiresIn ||
      !this.jwtRefreshExpiresIn
    ) {
      throw new Error('JWT secrets are not configured');
    }

    const verifiedToken = await this.verifyToken(
      this.jwtRefreshSecret,
      refreshToken,
    );

    if (!verifiedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const currentUser = await this.userService.findOne(verifiedToken.sub);
    const payload = { sub: currentUser.id_user, email: currentUser.email, role: currentUser.role };

    const newAccessToken = await this.generateToken(
      this.jwtSecret,
      payload,
      this.jwtExpiresIn,
    );

    const newRefreshToken = await this.generateToken(
      this.jwtRefreshSecret,
      payload,
      this.jwtRefreshExpiresIn,
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async generateToken(
    secret: string,
    payload: Record<string, any>,
    expiresIn: string,
  ) {
    return await this.jwtService.signAsync(payload, {
      expiresIn,
      secret,
    });
  }

  async verifyToken(secret: string, token: string) {
    return this.jwtService.verifyAsync(token, { secret });
  }
}
