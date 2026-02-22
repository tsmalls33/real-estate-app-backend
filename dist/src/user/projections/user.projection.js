"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_AUTH_SELECT = exports.USER_PUBLIC_SELECT = void 0;
exports.USER_PUBLIC_SELECT = {
    id_user: true,
    email: true,
    fullName: true,
    role: true,
    id_tenant: true
};
exports.USER_AUTH_SELECT = {
    ...exports.USER_PUBLIC_SELECT,
    passwordHash: true,
};
//# sourceMappingURL=user.projection.js.map