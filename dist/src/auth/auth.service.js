"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userService;
    prismaService;
    jwtService;
    jwtSecret = process.env.JWT_SECRET;
    jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
    jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;
    constructor(userService, prismaService, jwtService) {
        this.userService = userService;
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async signIn(input) {
        const { email, password } = input;
        const user = await this.userService.findByEmail(email, true);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!user.passwordHash)
            throw new common_1.BadRequestException('User has no saved password');
        const isPasswordValid = await this.userService.verifyPassword(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!this.jwtSecret ||
            !this.jwtRefreshSecret ||
            !this.jwtExpiresIn ||
            !this.jwtRefreshExpiresIn) {
            throw new Error('JWT secrets are not configured');
        }
        const payload = { sub: user.id_user, email: user.email, role: user.role };
        const accessToken = await this.generateToken(this.jwtSecret, payload, this.jwtExpiresIn);
        const refreshToken = await this.generateToken(this.jwtRefreshSecret, payload, this.jwtRefreshExpiresIn);
        return {
            user: {
                id_user: user.id_user,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                id_tenant: user.id_tenant,
            },
            accessToken,
            refreshToken,
        };
    }
    async signUp(input) {
        const { email, password, fullName, role, id_tenant } = input;
        const newUser = await this.userService.createUser({
            email,
            password,
            fullName,
            role,
            id_tenant,
        });
        return newUser;
    }
    async refreshToken(refreshToken) {
        if (!this.jwtRefreshSecret ||
            !this.jwtSecret ||
            !this.jwtExpiresIn ||
            !this.jwtRefreshExpiresIn) {
            throw new Error('JWT secrets are not configured');
        }
        const verifiedToken = await this.verifyToken(this.jwtRefreshSecret, refreshToken);
        if (!verifiedToken) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const currentUser = await this.userService.findOne(verifiedToken.sub);
        const payload = { sub: currentUser.id_user, email: currentUser.email, role: currentUser.role };
        const newAccessToken = await this.generateToken(this.jwtSecret, payload, this.jwtExpiresIn);
        const newRefreshToken = await this.generateToken(this.jwtRefreshSecret, payload, this.jwtRefreshExpiresIn);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
    async generateToken(secret, payload, expiresIn) {
        return await this.jwtService.signAsync(payload, {
            expiresIn,
            secret,
        });
    }
    async verifyToken(secret, token) {
        return this.jwtService.verifyAsync(token, { secret });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map