"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateUserResponseDto = exports.UserResponseDto = void 0;
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
//# sourceMappingURL=user-response.dto.js.map