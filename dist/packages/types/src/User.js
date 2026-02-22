"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = exports.PrivateUserResponseDto = exports.UserResponseDto = exports.UserRoles = void 0;
exports.UserRoles = {
    CLIENT: 'CLIENT',
    ADMIN: 'ADMIN',
    SUPERADMIN: 'SUPERADMIN',
    EMPLOYEE: 'EMPLOYEE'
};
class UserResponseDto {
    id_user;
    email;
    fullName;
    role;
    id_tenant;
}
exports.UserResponseDto = UserResponseDto;
class PrivateUserResponseDto extends UserResponseDto {
    passwordHash;
}
exports.PrivateUserResponseDto = PrivateUserResponseDto;
class CreateUserDto {
    email;
    password;
    fullName;
    role;
    id_tenant;
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=User.js.map