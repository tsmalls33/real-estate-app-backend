import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(input: CreateUserDto): Promise<import("./dto/user-response.dto").UserResponseDto>;
    findAll(): Promise<import("./dto/user-response.dto").UserResponseDto[]>;
    findOne(id_user: string): Promise<import("./dto/user-response.dto").UserResponseDto>;
    update(id_user: string, input: UpdateUserDto): Promise<import("./dto/user-response.dto").UserResponseDto>;
    remove(id_user: string): Promise<import("./dto/user-response.dto").UserResponseDto>;
}
