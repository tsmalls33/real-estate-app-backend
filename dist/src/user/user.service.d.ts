import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';
import { UserResponseDto, PrivateUserResponseDto } from './dto/user-response.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly configService;
    private readonly saltOrRounds;
    constructor(userRepository: UserRepository, configService: ConfigService);
    createUser(input: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    findOne(id_user: string): Promise<UserResponseDto>;
    findByEmail(email: string, includePrivate?: boolean): Promise<PrivateUserResponseDto>;
    update(id_user: string, input: UpdateUserDto): Promise<UserResponseDto>;
    remove(id_user: string): Promise<UserResponseDto>;
    hashPassword(password: string): Promise<string>;
    verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
