import { UserResponseDto as SharedUserResponseDto } from "@RealEstate/types";
export declare class UserResponseDto implements SharedUserResponseDto {
    id_user: string;
    email: string;
    fullName?: string | null;
    role: SharedUserResponseDto["role"];
    id_tenant?: string | null;
}
export declare class PrivateUserResponseDto extends UserResponseDto {
    passwordHash?: string;
}
