import { UserRoles } from '@RealEstate/types';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: UserRoles[]) => import("@nestjs/common").CustomDecorator<string>;
