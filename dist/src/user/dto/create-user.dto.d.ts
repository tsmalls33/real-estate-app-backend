import { UserRoles, CreateUserDto as SharedCreateUserDto } from "@RealEstate/types";
export declare class CreateUserDto implements SharedCreateUserDto {
    email: string;
    password: string;
    fullName?: string;
    role?: UserRoles;
    id_tenant?: string;
}
