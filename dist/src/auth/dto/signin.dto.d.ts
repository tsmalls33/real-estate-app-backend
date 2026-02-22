import { UserResponseDto } from '@RealEstate/types';
export declare class SignInDto {
    email: string;
    password: string;
}
export declare class SignInResponseDto {
    user: UserResponseDto;
    accessToken: string;
    refreshToken: string;
}
