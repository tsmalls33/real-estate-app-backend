import { SignInDto } from './signin.dto';
import { UserRoles } from "@RealEstate/types";
export declare class SignUpDto extends SignInDto {
    fullName: string;
    role: UserRoles;
    id_tenant: string;
}
